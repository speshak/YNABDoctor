import * as ynab from 'ynab'

export default async function getNetworthPreviousMonth (db, date) {
  const transactions = await db.getTransactionsUntil(date)
  let netWorth = 0

  transactions.forEach(transaction => {
    netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
  })

  return netWorth
}
