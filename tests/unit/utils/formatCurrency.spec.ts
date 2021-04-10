import formatCurrency from '@/utils/formatCurrency'

interface FormatTest {
  price: number
  result: string
}

const formatTests: FormatTest[] = [
  { price: 12.0, result: '$12.00' },
  { price: 16.5, result: '$16.50' },
  { price: 20.05, result: '$20.05' },
  { price: 999.99, result: '$999.99' },
  { price: 1000.0, result: '$1000.00' },
  { price: 2500.001, result: '$2500.00' },
]

describe('utils/formatCurrency.tsx', () => {
  it('should print USD currency with cents', () => {
    for (const test of formatTests) {
      expect(formatCurrency(test.price)).toEqual(test.result)
    }
  })
})
