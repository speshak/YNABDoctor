import * as ynab from 'ynab'
import { DateTime } from 'luxon'

export default async function importYNAB(budgetName, db) {
  const ynabAPI = new ynab.API(process.env.accessToken)

  const months = [
    // last month
    DateTime.local(new Date().getFullYear(), new Date().getMonth(), 1).toISODate(),
    // current month
    DateTime.local(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISODate()
  ]
  const YNABPRomises = []

  const budgetsResponse = await ynabAPI.budgets.getBudgets()
  const budgetId = getId(budgetsResponse.data.budgets, budgetName)
  const transactionsResponse = await ynabAPI.transactions.getTransactions(budgetId)
  const categoryResponse = await ynabAPI.categories.getCategories(budgetId)

  months.forEach(async m => {
    console.log(m)
    try {
      const budgetMonthResponse = await ynabAPI.months.getBudgetMonth(budgetId, m)
      await db.import('budgetMonths', budgetMonthResponse.data.month)
    } catch (e) {
      console.log(e)
    }
  })

  try {
    await db.import('categories', categoryResponse.data.category_groups)
  } catch(e) {
    console.log(e)
  }

  try {
    await db.import('transactions', transactionsResponse.data.transactions)
  } catch (e) {
    console.log(e)
  }

  try {
    await db.import('budgets', budgetsResponse.data.budgets)
  } catch(e) {
    console.log(2)
  }
}

const getId = (budgets, budgetName) => {
  for (let budget of budgets) {
    if (budget.name === budgetName) {
      return budget.id
    }
  }
}
