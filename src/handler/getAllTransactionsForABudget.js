const getBudgetId = require('../lib/getBudgetId')
const listTransactions = require('../lib/listTransactions')

module.exports = async (budgetName) => {
  const id = await getBudgetId(budgetName)
  listTransactions(id)
}