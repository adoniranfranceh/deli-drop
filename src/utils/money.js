export function FloatToMoney(float) {
  return `R$ ${float.toFixed(2).replace('.', ',')}`
}
