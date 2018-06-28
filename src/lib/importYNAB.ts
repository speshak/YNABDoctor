import * as ynab from 'ynab'
import * as moment from 'moment'

const getId = (budgets, budgetName) => budgets.find(b => b.name === budgetName).id
const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function importYNAB (budgetName, db) {
  const ynabAPI = new ynab.API(process.env.accessToken)

  const budgetsResponse = await ynabAPI.budgets.getBudgets()

  let date = getFirstMonth(budgetsResponse.data.budgets, budgetName)
  const end = getLastMonth(budgetsResponse.data.budgets, budgetName)

  const budgetId = getId(budgetsResponse.data.budgets, budgetName)
  const transactionsResponse = await ynabAPI.transactions.getTransactions(budgetId)
  const categoryResponse = await ynabAPI.categories.getCategories(budgetId)

  do {
    let i = 0
    try {
      const budgetMonthResponse = await ynabAPI.months.getBudgetMonth(budgetId, date)
      await db.import('budgetMonths', budgetMonthResponse.data.month)
    } catch (e) {
      console.log(e)
    }

    // Magic to increase the month for every request until we reach the last budgetMonth YNAB gives us
    date = moment([date.slice(0,4)]).month(parseInt(date.slice(5,7), 10) + i).format('YYYY-MM-DD')
    i += 1
  } while (date < end)

  try {
    await db.import('categories', categoryResponse.data.category_groups)
  } catch (e) {
    console.log(e)
  }

  try {
    await db.import('transactions', transactionsResponse.data.transactions)
  } catch (e) {
    console.log(e)
  }

  try {
    await db.import('budgets', budgetsResponse.data.budgets)
  } catch (e) {
    console.log(2)
  }
}
