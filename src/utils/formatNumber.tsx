interface Abbreviation {
  value: number
  symbol: string
}

const allAbbr: Abbreviation[] = [
  { value: 1e12, symbol: 'T' },
  { value: 1e9, symbol: 'B' },
  { value: 1e6, symbol: 'M' },
  { value: 1e3, symbol: 'K' },
  { value: 1, symbol: '' },
]

function findAbbr(value: number): Abbreviation {
  const lastAbbr = allAbbr[allAbbr.length - 1]
  return allAbbr.find(abbr => value >= abbr.value) || lastAbbr
}

function formatNumber(value: number, digits: number): string {
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/
  const abbr = findAbbr(value)

  const result = (value / abbr.value).toFixed(digits).replace(regex, '$1')
  return `${result}${abbr.symbol}`
}

export default formatNumber
