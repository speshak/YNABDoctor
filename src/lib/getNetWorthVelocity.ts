import * as ynab from 'ynab'
import {netWorth} from '../routes/netWorth';

export default async function getNetWorthVelocity (db) {
  const transactions = await db.getDocuments('transactions')
  const netWorthByMonth = {}

  transactions.forEach(transaction => {
    const date = ynab.utils.convertFromISODateString(transaction.date)
    const dateString = date.getUTCFullYear() + '-' + date.getMonth()

    if (netWorthByMonth[dateString]) {
      netWorthByMonth[dateString] += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
    } else {
      netWorthByMonth[dateString] = ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
    }
  })

  return netWorthByMonth
}
