import * as ynab from 'ynab'

export default async function getNetworthPreviousMonth (db, month) {
  const transactions = await db.getTransactionsExcludeGivenMonth(month)
  let netWorth = 0

  transactions.forEach(transaction => {
    netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
  })

  return netWorth
}
