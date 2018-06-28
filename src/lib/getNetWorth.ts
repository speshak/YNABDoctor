import * as ynab from 'ynab'

export default async function getNetWorth (db) {
  const transactions = await db.get('transactions')
  let netWorth = 0

  transactions.forEach(transaction => {
    netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
  })

  return netWorth
}
