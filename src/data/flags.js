// Small inline SVG flags (emoji flags do not render on Windows).
const v3 = (a, b, c) => `<rect width="10" height="20" fill="${a}"/><rect x="10" width="10" height="20" fill="${b}"/><rect x="20" width="10" height="20" fill="${c}"/>`;
const h3 = (a, b, c, mid = 1) => `<rect width="30" height="20" fill="${a}"/><rect y="${10 - mid * 5}" width="30" height="${mid * 10}" fill="${b}"/><rect y="${10 + mid * 5}" width="30" height="${10 - mid * 5}" fill="${c}"/>`;

const BODY = {
  IT: v3('#009246', '#ffffff', '#ce2b37'),
  FR: v3('#002654', '#ffffff', '#ce1126'),
  CI: v3('#f77f00', '#ffffff', '#009e60'),
  DE: `<rect width="30" height="7" fill="#000"/><rect y="6.6" width="30" height="7" fill="#dd0000"/><rect y="13.3" width="30" height="6.7" fill="#ffce00"/>`,
  ES: h3('#aa151b', '#f1bf00', '#aa151b'),
  UK: `<rect width="30" height="20" fill="#012169"/><path d="M0,0 30,20 M30,0 0,20" stroke="#fff" stroke-width="4"/><path d="M0,0 30,20 M30,0 0,20" stroke="#c8102e" stroke-width="1.6"/><path d="M15,0 V20 M0,10 H30" stroke="#fff" stroke-width="6"/><path d="M15,0 V20 M0,10 H30" stroke="#c8102e" stroke-width="3.4"/>`
};
const LANG_FLAG = { it: 'IT', fr: 'FR', en: 'UK', es: 'ES', de: 'DE' };

export function flag(code, h = 16) {
  const body = BODY[code] || BODY[LANG_FLAG[code]];
  if (!body) return '';
  return `<svg class="flag" viewBox="0 0 30 20" width="${h * 1.5}" height="${h}" aria-hidden="true">${body}</svg>`;
}
