import getBudgetId from './getBudgetId'
import getTransactions from './getTransactions'

export default async function importTransactions(budgetName, db) {
  const id = await getBudgetId(budgetName)
  const transactions = await getTransactions(id)

  return db.import('transactions', transactions)
}
