import formatNumber from '@/utils/formatNumber'

interface FormatTest {
  value: number
  digits: number
  result: string
}

const formatTests: FormatTest[] = [
  { value: 100, digits: 0, result: '100' },
  { value: 100, digits: 2, result: '100' },
  { value: 1100, digits: 2, result: '1.1K' },
  { value: 5250, digits: 2, result: '5.25K' },
  { value: 8252, digits: 2, result: '8.25K' },
  { value: 8252, digits: 0, result: '8K' },
  { value: 85e4, digits: 0, result: '850K' },
  { value: 25e6, digits: 2, result: '25M' },
  { value: 255e5, digits: 2, result: '25.5M' },
  { value: 520e9, digits: 2, result: '520B' },
]

describe('utils/formatNumber.tsx', () => {
  it('should generate proper abbreviations', () => {
    for (const test of formatTests) {
      expect(formatNumber(test.value, test.digits)).toEqual(test.result)
    }
  })
})
