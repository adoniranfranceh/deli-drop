export function FloatToMoney(float) {
  return float.toFixed(2).replace('.', ',')
}
