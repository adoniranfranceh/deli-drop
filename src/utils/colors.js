const HEX_R_START = 1;
const HEX_R_END = 3;
const HEX_G_START = 3;
const HEX_G_END = 5;
const HEX_B_START = 5;
const HEX_B_END = 7;

const PERCENT_MAX = 100;
const COLOR_MAX = 255;

export function darkenColor(color, percent) {
  const toRgb = (c) => {
    if (c.startsWith('#')) {
      const r = parseInt(c.slice(HEX_R_START, HEX_R_END), 16);
      const g = parseInt(c.slice(HEX_G_START, HEX_G_END), 16);
      const b = parseInt(c.slice(HEX_B_START, HEX_B_END), 16);
      return [r, g, b];
    }
    return c.match(/\d+/g).map(Number);
  };

  const [r, g, b] = toRgb(color);
  const darken = (c) => Math.max(0, c - Math.round((percent / PERCENT_MAX) * COLOR_MAX));

  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
}

export function getComputedColor(cssVarName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVarName)
    .trim();
}
