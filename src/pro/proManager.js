// DriveMaster PRO Membership Manager & Feature Access Controller

export class ProManager {
  constructor() {
    this.storageKey = 'drivemaster_pro_status';
    this.isPro = localStorage.getItem(this.storageKey) === 'true';
    this.listeners = [];
  }

  getIsPro() {
    return this.isPro;
  }

  setPro(status) {
    this.isPro = !!status;
    localStorage.setItem(this.storageKey, this.isPro ? 'true' : 'false');
    this.notify();
  }

  togglePro() {
    this.setPro(!this.isPro);
    return this.isPro;
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => cb(this.isPro));
  }
}

export const proManager = new ProManager();
