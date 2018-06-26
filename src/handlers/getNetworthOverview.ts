import * as ynab from 'ynab'

import getNetWorthVelocity from '../lib/getNetWorthVelocity'

export default async function getNetWorhtOverview(db) {
  const velocity = await getNetWorthVelocity(db)
  const transactions = await db.getDocuments('transactions')

  let netWorth = 0

  transactions.forEach(t => {
    netWorth += ynab.utils.convertMilliUnitsToCurrencyAmount(t.amount, 2)
  })

  return {
    velocity,
    netWorth
  }
}