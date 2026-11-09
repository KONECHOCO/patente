// Builds the official Italian ministerial question bank used by the app.
//
// Source: MIT "Patente AB" (conseguimento) listing published on the Portale dell'Automobilista
// https://www.ilportaledellautomobilista.it/web/portale-automobilista/-/quiz-per-le-patenti-am-b-superiori-e-cqc
// Input: a folder with `questions.json` (statements extracted from the official PDF: id, quesito_id,
// argomento_id, testo, risposta, figura) and `figures/<hash>.jpg` (figures as embedded in the PDF).
//
// usage: node scripts/build-ministeriale.mjs <source-folder>
// output: public/ministeriale/listato.json + public/ministeriale/fig/<hash>.webp
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const src = process.argv[2];
if (!src) { console.error('usage: node scripts/build-ministeriale.mjs <source-folder>'); process.exit(1); }
const data = JSON.parse(fs.readFileSync(path.join(src, 'questions.json'), 'utf8'));
const out = path.resolve('public/ministeriale');
fs.mkdirSync(path.join(out, 'fig'), { recursive: true });
// empty the output (files only: the folders may be open in an editor or a shell on Windows)
for (const f of fs.readdirSync(path.join(out, 'fig'))) fs.rmSync(path.join(out, 'fig', f));
fs.rmSync(path.join(out, 'listato.json'), { force: true });

// sanity checks on the source
const qs = data.domande;
const bad = qs.filter(q => !q.testo || typeof q.risposta !== 'boolean' || !q.argomento_id);
if (bad.length) { console.error('invalid statements:', bad.length); process.exit(1); }
const ids = new Set(qs.map(q => q.id));
if (ids.size !== qs.length) { console.error('duplicate ids'); process.exit(1); }

const figs = [...new Set(qs.map(q => q.figura).filter(Boolean))].sort();
const figIndex = new Map(figs.map((f, i) => [f, i]));
for (const f of figs) {
  const from = path.join(src, f);
  const buf = fs.readFileSync(from);
  if (buf[0] !== 0xff || buf[1] !== 0xd8) { console.error('not a JPEG:', f); process.exit(1); }
  fs.writeFileSync(path.join(out, 'fig', path.basename(f)), buf);
}
// WebP is about 60% smaller than the PDF's JPEGs at the same visual quality (keeps the Android bundle small)
const py = `from PIL import Image\nimport glob, os\nfor f in glob.glob(r'${path.join(out, 'fig').replace(/\\/g, '/')}/*.jpg'):\n    Image.open(f).convert('RGB').save(f[:-4] + '.webp', 'WEBP', quality=80, method=6)\n    os.remove(f)\n`;
execFileSync('python', ['-I', '-c', py], { stdio: 'inherit' });
const webp = f => path.basename(f).replace(/\.jpg$/, '.webp');

const listing = {
  meta: {
    source: data.meta.fonte,
    url: data.meta.url,
    file: data.meta.file,
    version: data.meta.versione_listato,
    total: qs.length
  },
  topics: data.argomenti.map(a => ({ id: a.id, name: a.nome, short: a.breve, quota: a.quota })),
  figs: figs.map(webp),
  // [id, question group, topic id, statement, answer (1 = true), figure index or -1]
  q: qs.map(q => [q.id, q.quesito_id, q.argomento_id, q.testo, q.risposta ? 1 : 0, q.figura ? figIndex.get(q.figura) : -1])
};
fs.writeFileSync(path.join(out, 'listato.json'), JSON.stringify(listing));
const quota = listing.topics.reduce((s, t) => s + t.quota, 0);
console.log(`statements ${qs.length}, topics ${listing.topics.length} (exam quota ${quota}), figures ${figs.length}`);
