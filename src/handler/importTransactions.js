const getBudgetId = require('../lib/getBudgetId')
const getTransactions = require('../lib/getTransactions')
const DB = require('../db')

module.exports = async (budgetName) => {
  const db = new DB
  const id = await getBudgetId(budgetName)
  const transactions = await getTransactions(id)
  db.insertMany('transactions', transactions)
}