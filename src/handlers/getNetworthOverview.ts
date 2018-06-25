import getNetWorthVelocity from '../lib/getNetWorthVelocity'

export default async function getNetWorhtOverview(db) {
  return await getNetWorthVelocity(db)
}