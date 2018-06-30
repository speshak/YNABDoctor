import * as ynab from 'ynab'

export default async function getNetWorth (db, endDate) {
  const transactions = await db.getTransactionsUntil(endDate)
  let netWorth = 0

  transactions.forEach(transaction => {
    netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 4)
  })

  return netWorth
}
