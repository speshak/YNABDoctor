const getBudgetId = require('../lib/getBudgetId')
const getTransactions = require('../lib/getTransactions')

module.exports = async (budgetName, db) => {
  const id = await getBudgetId(budgetName)
  const transactions = await getTransactions(id)
  return db.insertMany('transactions', transactions)
}
