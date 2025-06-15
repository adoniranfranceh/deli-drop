export function darkenColor(color, percent) {
  const toRgb = (c) => {
    if (c.startsWith('#')) {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return [r, g, b];
    }
    return c.match(/\d+/g).map(Number);
  };

  const [r, g, b] = toRgb(color);
  const darken = (c) => Math.max(0, c - Math.round((percent / 100) * 255));

  return `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`;
}

export function getComputedColor(cssVarName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(cssVarName)
    .trim();
}
