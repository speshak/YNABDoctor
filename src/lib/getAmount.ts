import * as ynab from 'ynab'

export default function getAmount(transactions): number {
  let amount = 0
  transactions.forEach(t => {
    amount += ynab.utils.convertMilliUnitsToCurrencyAmount(t.amount, 2)
  })

  return amount
}
