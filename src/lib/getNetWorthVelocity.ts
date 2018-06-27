import * as ynab from 'ynab'

export default async function getNetWorthVelocity (db) {
  const transactions = await db.getDocuments('transactions')
  const netWorth = {}

  transactions.forEach(transaction => {
    const date = ynab.utils.convertFromISODateString(transaction.date)
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)

    if (netWorth[year]) {
      if (netWorth[year][month]) {
        netWorth[year][month] += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
      } else {
        netWorth[year][month] = ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
      }
    } else {
      netWorth[year] = {}
      netWorth[year][month] = ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
    }
  })

  return netWorth
}
