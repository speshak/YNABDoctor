import getAmount from './getAmount'
import { expect } from 'chai'
import 'mocha'

describe('getAmount()', () => {
  const transactions = [
    { amount: 2000 },
    { amount: 1500 }
  ]

  it('should reurn amount of spending/income of transactions', () => {
    const result = getAmount(transactions)
    expect(result).to.equal(3.5)
  })
})
