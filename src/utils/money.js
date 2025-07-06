export function FloatToMoney(float) {
  const decimalPlaces = 2;
  return `R$ ${float.toFixed(decimalPlaces).replace('.', ',')}`
}
