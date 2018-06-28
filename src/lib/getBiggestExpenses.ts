import * as ynab from 'ynab'

export default function getBiggestExpenses (transactions) {
  return transactions.sort((a, b) => a.amount - b.amount).slice(0, 5).map(e => {
    return {
      amount: ynab.utils.convertMilliUnitsToCurrencyAmount(e.amount, 2),
      category: e.category_name,
      date: e.date,
      payee: e.payee_name,
      memo: e.memo
    }
  })
}
