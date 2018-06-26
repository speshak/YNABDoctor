import * as ynab from 'ynab'

import getNetWorthVelocity from '../lib/getNetWorthVelocity'

export default async function getNetWorhtOverview(db) {
  const velocity = await getNetWorthVelocity(db)
  const transactions = await db.getDocuments('transactions')

  let netWorth = transactions.reduce((a, b) => a.amount + b.amount, 0)

  return {
    velocity,
    netWorth
  }
}