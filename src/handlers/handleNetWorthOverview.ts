import * as ynab from 'ynab'

import getNetWorthVelocity from '../lib/getNetWorthVelocity'

export default async function getNetWorhtOverview (db) {
  const transactions = await db.get('transactions')
  const velocity = await getNetWorthVelocity(transactions)

  let netWorth = 0
  transactions.forEach(t => netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(t.amount, 2))
  netWorth = Math.round(netWorth)

  return {
    velocity,
    netWorth
  }
}
