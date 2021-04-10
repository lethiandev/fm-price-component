function formatCurrency(value: number): string {
  const price = value.toFixed(2)
  return `$${price}`
}

export default formatCurrency
