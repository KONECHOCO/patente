// Interactive 2D/3D Driving Simulator with Cockpit View, Physics, Mirrors & Scenarios
import { sound } from './audio.js';

export class DrivingSimulator {
  constructor(canvasId, onTelemetryUpdate, onFeedback) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.onTelemetryUpdate = onTelemetryUpdate;
    this.onFeedback = onFeedback;

    // Simulation State
    this.isRunning = false;
    this.scenario = 'parking'; // 'parking', 'intersection', 'emergency', 'highway'
    this.viewMode = 'cockpit'; // 'cockpit' or 'aerial'

    // Car Dynamics
    this.car = {
      x: 350,
      y: 280,
      angle: 0, // radians
      speed: 0,
      maxSpeed: 60,
      acceleration: 0.15,
      friction: 0.96,
      brakeStrength: 0.4,
      steerAngle: 0,
      maxSteer: 0.6, // radians (~35 deg)
      gear: 'D', // 'D', 'R', 'P'
      rpm: 900,
      blinker: null, // 'left', 'right', or null
      blinkerTimer: 0,
      width: 44,
      length: 84
    };

    // Controls input state
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      brake: false
    };

    // Scenario specific elements
    this.scenarioData = {};
    this.animationFrame = null;
    this.lastTime = performance.now();
    this.parkingRadarTimer = 0;

    this.bindEvents();
  }

  init(scenario = 'parking') {
    this.scenario = scenario;
    this.resetCar();
    this.setupScenario(scenario);
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop(performance.now());
      sound.startEngine(this.car.rpm);
    }
  }

  resetCar() {
    if (this.scenario === 'parking') {
      this.car.x = 240;
      this.car.y = 200;
      this.car.angle = 0;
      this.car.speed = 0;
      this.car.gear = 'R';
      this.car.steerAngle = 0;
      this.car.rpm = 900;
    } else if (this.scenario === 'intersection') {
      this.car.x = 380;
      this.car.y = 480;
      this.car.angle = -Math.PI / 2; // facing up
      this.car.speed = 0;
      this.car.gear = 'D';
      this.car.steerAngle = 0;
      this.car.rpm = 900;
    } else if (this.scenario === 'emergency') {
      this.car.x = 80;
      this.car.y = 250;
      this.car.angle = 0;
      this.car.speed = 50; // starts at 50 km/h
      this.car.gear = 'D';
      this.car.steerAngle = 0;
      this.car.rpm = 2200;
    } else if (this.scenario === 'highway') {
      this.car.x = 80;
      this.car.y = 310;
      this.car.angle = 0;
      this.car.speed = 90;
      this.car.gear = 'D';
      this.car.steerAngle = 0;
      this.car.rpm = 2800;
    }
  }

  setupScenario(name) {
    if (name === 'parking') {
      this.scenarioData = {
        curbY: 340,
        frontCar: { x: 380, y: 300, width: 44, length: 82, color: '#dc2626' },
        rearCar: { x: 100, y: 300, width: 44, length: 82, color: '#2563eb' },
        curbDistance: 120,
        frontDistance: 140,
        rearDistance: 140,
        isParkedSuccess: false
      };
    } else if (name === 'intersection') {
      this.scenarioData = {
        otherCar1: { x: 120, y: 230, speed: 2.2, dir: 'right', color: '#16a34a', hasCrossed: false },
        trafficLight: 'yellow-blink', // or red/green
        userCrossed: false,
        yieldedProperly: null
      };
    } else if (name === 'emergency') {
      this.scenarioData = {
        pedestrian: { x: 520, y: 250, appeared: false, crossed: false },
        hazardTriggered: false,
        reactionStartTime: 0,
        reactionDurationMs: 0,
        stoppedDistance: 0,
        testCompleted: false
      };
      // Trigger hazard after 1.8 seconds
      setTimeout(() => {
        if (this.scenario === 'emergency' && !this.scenarioData.hazardTriggered) {
          this.scenarioData.hazardTriggered = true;
          this.scenarioData.reactionStartTime = performance.now();
          if (this.onFeedback) {
            this.onFeedback({ type: 'hazard', message: '⚠️ ATTENZIONE! OSTACOLO SULLA CARREGGIATA: FRENA SUBITO!' });
          }
        }
      }, 1800);
    } else if (name === 'highway') {
      this.scenarioData = {
        slowTruck: { x: 420, y: 310, speed: 70, length: 110, width: 50 },
        fastCarBehind: { x: 10, y: 210, speed: 120, length: 80, width: 44 },
        blindSpotChecked: false,
        overtaken: false
      };
    }
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = true;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = true;
      if (e.code === 'Space') {
        this.keys.brake = true;
        if (this.scenario === 'emergency' && this.scenarioData.hazardTriggered && !this.scenarioData.reactionDurationMs) {
          this.scenarioData.reactionDurationMs = Math.round(performance.now() - this.scenarioData.reactionStartTime);
          sound.playBrakeScreech();
        }
      }
      if (e.code === 'KeyH') sound.playHorn();
      if (e.code === 'KeyQ') this.toggleBlinker('left');
      if (e.code === 'KeyE') this.toggleBlinker('right');
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.keys.down = false;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.keys.right = false;
      if (e.code === 'Space') this.keys.brake = false;
    });
  }

  setGear(gear) {
    this.car.gear = gear;
  }

  toggleBlinker(side) {
    if (this.car.blinker === side) {
      this.car.blinker = null;
    } else {
      this.car.blinker = side;
      sound.playBlinker(true);
    }
  }

  setSteer(steerVal) {
    // steerVal between -1 and 1
    this.car.steerAngle = steerVal * this.car.maxSteer;
  }

  loop(currentTime) {
    if (!this.isRunning) return;
    const dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    this.animationFrame = requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    const car = this.car;

    // Steering input
    if (this.keys.left) {
      car.steerAngle = Math.max(-car.maxSteer, car.steerAngle - 1.4 * dt);
    } else if (this.keys.right) {
      car.steerAngle = Math.min(car.maxSteer, car.steerAngle + 1.4 * dt);
    } else if (!this.keys.left && !this.keys.right && Math.abs(car.steerAngle) > 0.01) {
      car.steerAngle *= 0.85; // auto-center
    }

    // Acceleration & Braking
    const accelInput = this.keys.up;
    const brakeInput = this.keys.down || this.keys.brake;

    if (accelInput) {
      if (car.gear === 'D') {
        car.speed = Math.min(car.maxSpeed, car.speed + car.acceleration);
        car.rpm = Math.min(4500, car.rpm + 120);
      } else if (car.gear === 'R') {
        car.speed = Math.max(-20, car.speed - car.acceleration * 0.7);
        car.rpm = Math.min(2800, car.rpm + 90);
      }
    } else if (brakeInput) {
      if (car.speed > 0) {
        car.speed = Math.max(0, car.speed - car.brakeStrength);
      } else if (car.speed < 0) {
        car.speed = Math.min(0, car.speed + car.brakeStrength);
      }
      car.rpm = Math.max(900, car.rpm - 150);
    } else {
      car.speed *= car.friction;
      if (Math.abs(car.speed) < 0.05) car.speed = 0;
      car.rpm = Math.max(900, car.rpm * 0.95);
    }

    // Sound engine RPM update
    sound.setEngineRPM(car.rpm);

    // Blinker tick-tock timer
    if (car.blinker) {
      car.blinkerTimer += dt;
      if (car.blinkerTimer >= 0.45) {
        car.blinkerTimer = 0;
        sound.playBlinker(false);
      }
    }

    // Update car position & heading
    car.angle += (car.speed / 40) * Math.sin(car.steerAngle);
    car.x += car.speed * Math.cos(car.angle) * 0.4;
    car.y += car.speed * Math.sin(car.angle) * 0.4;

    // Bounds check
    car.x = Math.max(30, Math.min(720, car.x));
    car.y = Math.max(30, Math.min(520, car.y));

    // Scenario specific logic
    this.updateScenario(dt);

    // Telemetry callback
    if (this.onTelemetryUpdate) {
      this.onTelemetryUpdate({
        speed: Math.round(Math.abs(car.speed * 1.5)),
        rpm: Math.round(car.rpm),
        gear: car.gear,
        steerAngleDeg: Math.round((car.steerAngle * 180) / Math.PI),
        blinker: car.blinker,
        scenario: this.scenario,
        scenarioData: this.scenarioData
      });
    }
  }

  updateScenario(dt) {
    if (this.scenario === 'parking') {
      const s = this.scenarioData;
      // Distance calculations
      s.curbDistance = Math.max(5, Math.round(s.curbY - this.car.y - this.car.width / 2));
      s.rearDistance = Math.max(5, Math.round(this.car.x - s.rearCar.x - s.rearCar.length / 2));
      s.frontDistance = Math.max(5, Math.round(s.frontCar.x - this.car.x - this.car.length / 2));

      // Parking radar beeps
      const minDistance = Math.min(s.curbDistance, s.rearDistance);
      this.parkingRadarTimer += dt;
      const beepInterval = Math.max(0.08, minDistance / 160);
      if (this.car.gear === 'R' && minDistance < 150 && this.parkingRadarTimer >= beepInterval) {
        this.parkingRadarTimer = 0;
        sound.playRadarBeep(minDistance);
      }

      // Check success
      if (
        s.curbDistance <= 30 &&
        s.curbDistance >= 10 &&
        s.rearDistance > 20 &&
        s.frontDistance > 20 &&
        Math.abs(this.car.angle) < 0.15 &&
        Math.abs(this.car.speed) < 0.2
      ) {
        if (!s.isParkedSuccess) {
          s.isParkedSuccess = true;
          sound.playSuccess();
          if (this.onFeedback) {
            this.onFeedback({
              type: 'success',
              message: '🎉 PARCHEGGIO PERFETTO! Distanza dal marciapiede: ' + s.curbDistance + ' cm (Regola ministeriale < 30 cm rispettata).'
            });
          }
        }
      }
    } else if (this.scenario === 'intersection') {
      const s = this.scenarioData;
      if (s.otherCar1 && !s.otherCar1.hasCrossed) {
        s.otherCar1.x += s.otherCar1.speed;
        if (s.otherCar1.x > 650) s.otherCar1.hasCrossed = true;
      }
      // Check priority compliance
      if (this.car.y < 320 && !s.userCrossed) {
        s.userCrossed = true;
        if (s.otherCar1 && !s.otherCar1.hasCrossed) {
          // Cut in front of car coming from right!
          sound.playHorn();
          if (this.onFeedback) {
            this.onFeedback({
              type: 'fail',
              message: '❌ MANCATA PRECEDENZA! Hai tagliato la strada al veicolo verde proveniente da destra. Manovra bocciata!'
            });
          }
        } else {
          sound.playSuccess();
          if (this.onFeedback) {
            this.onFeedback({
              type: 'success',
              message: '✓ OTTIMO! Hai atteso che il veicolo alla tua destra liberasse l\'incrocio prima di impegnarlo.'
            });
          }
        }
      }
    } else if (this.scenario === 'emergency') {
      const s = this.scenarioData;
      if (s.hazardTriggered && this.car.speed === 0 && !s.testCompleted) {
        s.testCompleted = true;
        const totalStoppingM = Math.round(14 + (50 * 50) / 160);
        if (this.onFeedback) {
          this.onFeedback({
            type: 'info',
            message: `📊 TEST COMPLETATO! Tempo di Reazione: ${s.reactionDurationMs || 850} ms. Spazio di arresto stimato: ${totalStoppingM} metri.`
          });
        }
      }
    }
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.viewMode === 'aerial') {
      this.renderAerial(ctx);
    } else {
      this.renderCockpit(ctx);
    }
  }

  renderAerial(ctx) {
    // Road & background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw scenario terrain
    if (this.scenario === 'parking') {
      // Sidewalk
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 340, this.canvas.width, 180);
      // Curb line
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, 336, this.canvas.width, 4);

      // Road markings (white dashed parking boxes)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.strokeRect(60, 240, 160, 96);
      ctx.strokeRect(230, 240, 180, 96);
      ctx.strokeRect(420, 240, 160, 96);
      ctx.setLineDash([]);

      // Parked vehicles
      this.drawVehicle(ctx, this.scenarioData.rearCar.x, this.scenarioData.rearCar.y, 0, '#2563eb', 'Auto Dietro');
      this.drawVehicle(ctx, this.scenarioData.frontCar.x, this.scenarioData.frontCar.y, 0, '#dc2626', 'Auto Davanti');
    } else if (this.scenario === 'intersection') {
      // Crossroads
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 180, this.canvas.width, 160);
      ctx.fillRect(300, 0, 160, this.canvas.height);

      // Road markings & Stop line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(300, 340);
      ctx.lineTo(460, 340);
      ctx.stroke();

      // Pedestrian Crosswalks
      ctx.fillStyle = '#f8fafc';
      for (let i = 0; i < 7; i++) {
        ctx.fillRect(310 + i * 20, 350, 12, 35);
        ctx.fillRect(310 + i * 20, 135, 12, 35);
      }

      // Other car
      if (this.scenarioData.otherCar1) {
        this.drawVehicle(ctx, this.scenarioData.otherCar1.x, this.scenarioData.otherCar1.y, 0, this.scenarioData.otherCar1.color, 'Auto Destra');
      }
    } else {
      // Asphalt lane
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 160, this.canvas.width, 220);
      // White divider line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(0, 270);
      ctx.lineTo(this.canvas.width, 270);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw user car
    this.drawVehicle(ctx, this.car.x, this.car.y, this.car.angle, '#38bdf8', 'TU (Allievo)', true);
  }

  renderCockpit(ctx) {
    // 3D Perspective Road View
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
    skyGrad.addColorStop(0, '#0f172a');
    skyGrad.addColorStop(1, '#334155');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.45);

    // Sun / Horizon
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.45, 18, Math.PI, 0);
    ctx.fill();

    // Road Ground Perspective
    const roadGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
    roadGrad.addColorStop(0, '#1e293b');
    roadGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = roadGrad;
    ctx.fillRect(0, h * 0.45, w, h * 0.55);

    // Perspective Road Edges
    const steerOffset = this.car.steerAngle * 120;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(w * 0.48 + steerOffset * 0.2, h * 0.45);
    ctx.lineTo(w * 0.52 + steerOffset * 0.2, h * 0.45);
    ctx.lineTo(w * 0.95 + steerOffset, h * 0.85);
    ctx.lineTo(w * 0.05 + steerOffset, h * 0.85);
    ctx.closePath();
    ctx.fillStyle = '#1e293b';
    ctx.fill();

    // Perspective Lane Markings
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 25]);
    ctx.beginPath();
    ctx.moveTo(w * 0.5 + steerOffset * 0.2, h * 0.45);
    ctx.lineTo(w * 0.5 + steerOffset, h * 0.85);
    ctx.stroke();
    ctx.setLineDash([]);

    // Scenario specific 3D obstacles
    if (this.scenario === 'parking') {
      // Sidewalk on the right
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(w * 0.55, h * 0.45);
      ctx.lineTo(w, h * 0.7);
      ctx.lineTo(w, h * 0.85);
      ctx.lineTo(w * 0.58, h * 0.45);
      ctx.fill();
    } else if (this.scenario === 'emergency' && this.scenarioData.hazardTriggered) {
      // Red hazard alert overlay
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.fillRect(0, 0, w, h * 0.5);
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠️ OSTACOLO IMMINENTE! FRENA! [PREMI SPAZIO]', w * 0.5, h * 0.3);
    }

    // Rearview Mirror Overlay
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(w * 0.35, 12, w * 0.3, 50, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.fillRect(w * 0.36, 16, w * 0.28, 42);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SPECCHIETTO RETROVISORE', w * 0.5, 30);
    // Draw vehicle in mirror if parking
    if (this.scenario === 'parking') {
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(w * 0.48, 34, 25, 16);
    }

    // Dashboard Overlay
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.75);
    ctx.quadraticCurveTo(w * 0.5, h * 0.68, w, h * 0.75);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Speedometer Dial
    this.drawGauge(ctx, w * 0.3, h * 0.86, 50, Math.abs(this.car.speed * 1.5), 180, 'km/h');
    // RPM Dial
    this.drawGauge(ctx, w * 0.7, h * 0.86, 50, this.car.rpm, 6000, 'RPM');

    // Gear indicator & Warning Icons
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`GEAR: [${this.car.gear}]`, w * 0.5, h * 0.82);

    // Blinker Arrows
    if (this.car.blinker === 'left' && this.car.blinkerTimer < 0.25) {
      ctx.fillStyle = '#22c55e';
      ctx.fillText('◄', w * 0.44, h * 0.82);
    }
    if (this.car.blinker === 'right' && this.car.blinkerTimer < 0.25) {
      ctx.fillStyle = '#22c55e';
      ctx.fillText('►', w * 0.56, h * 0.82);
    }

    // Steering Wheel
    this.drawSteeringWheel(ctx, w * 0.5, h * 0.96, 65, this.car.steerAngle);
  }

  drawGauge(ctx, x, y, radius, value, maxVal, unit) {
    ctx.save();
    ctx.translate(x, y);

    // Dial background
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Needle angle (-135 deg to +135 deg)
    const ratio = Math.min(1, Math.max(0, value / maxVal));
    const angle = -Math.PI * 0.75 + ratio * Math.PI * 1.5;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * (radius - 10), Math.sin(angle) * (radius - 10));
    ctx.stroke();

    // Center pin
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    // Text label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(value), 0, radius - 15);
    ctx.fillText(unit, 0, radius - 4);

    ctx.restore();
  }

  drawSteeringWheel(ctx, x, y, radius, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * 2.5);

    // Rim
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Metallic highlight
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Spokes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-radius, 0);
    ctx.lineTo(radius, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, radius);
    ctx.stroke();

    // Center Horn Button
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HORN', 0, 3);

    ctx.restore();
  }

  drawVehicle(ctx, x, y, angle, color, label, isPlayer = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const length = 76;
    const width = 40;

    // Body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-length / 2, -width / 2, length, width, 8);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Windshield & Roof
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-length * 0.2, -width * 0.4, length * 0.4, width * 0.8);

    // Headlights
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(length * 0.4, -width * 0.45, 6, 8);
    ctx.fillRect(length * 0.4, width * 0.25, 6, 8);

    // Taillights
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-length * 0.48, -width * 0.45, 6, 8);
    ctx.fillRect(-length * 0.48, width * 0.25, 6, 8);

    // Wheels
    ctx.fillStyle = '#000000';
    ctx.fillRect(-length * 0.35, -width * 0.58, 16, 6);
    ctx.fillRect(-length * 0.35, width * 0.46, 16, 6);

    // Steered front wheels for player
    ctx.save();
    ctx.translate(length * 0.25, -width * 0.55);
    if (isPlayer) ctx.rotate(this.car.steerAngle);
    ctx.fillRect(-8, -3, 16, 6);
    ctx.restore();

    ctx.save();
    ctx.translate(length * 0.25, width * 0.55);
    if (isPlayer) ctx.rotate(this.car.steerAngle);
    ctx.fillRect(-8, -3, 16, 6);
    ctx.restore();

    // Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, -width * 0.7);

    ctx.restore();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    sound.stopEngine();
  }
}
