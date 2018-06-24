import * as ynab from 'ynab'
import { months } from '../dictionaries'

module.exports = async (db) => {
  const transactions = await db.getDocuments('transactions')
  const netWorthByMonth = {}
  const netWorths = []
  const velocities = {}

  transactions.forEach(transaction => {
    const month = ynab.utils.convertFromISODateString(transaction.date).getMonth()
    if (netWorthByMonth[month]) {
      netWorthByMonth[month] += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
    } else {
      netWorthByMonth[month] = ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
    }
  })

  Object.keys(netWorthByMonth).forEach(key => {
    netWorths.push({key, value: netWorthByMonth[key]})
  })

  for(let i = 0; i < netWorths.length; i++) {
    const netWorth = netWorths[i].value
    const velocity = netWorth
    velocities[months[netWorths[i].key]] = velocity
  }
  console.log(velocities)
  return velocities
}
