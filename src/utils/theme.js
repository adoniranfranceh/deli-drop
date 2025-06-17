import { darkenColor } from "./colors";

export function resetRestaurantColors() {
  document.documentElement.style.setProperty('--color-restaurant', '#E53935')
  document.documentElement.style.setProperty('--color-restaurant-hover', '#c62828')
}

export function setDefaultStyles(bgColor, darkenColorFn = darkenColor) {
  document.documentElement.style.setProperty('--color-restaurant', bgColor);
  document.documentElement.style.setProperty(
    '--color-restaurant-hover',
    darkenColorFn(bgColor, 20)
  );
}
