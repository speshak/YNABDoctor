import getBiggestExpenses from '../lib/getBiggestExpenses'
import getMostUsedWords from '../lib/getMostUsedWords'
import getMostUsedPayees from '../lib/getMostUsedPayees'

const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function getSpendingHabits (db) {
  const budgets = await db.get('budgets')

  const start = getFirstMonth(budgets, process.env.budgetName)
  const end = getLastMonth(budgets, process.env.budgetName)

  const spendings = await db.getSpendings(start, end)
  const topExpenses = getBiggestExpenses(spendings)
  const topWords = getMostUsedWords(spendings)
  const topPayees = getMostUsedPayees(spendings)

  return {
    topExpenses,
    topWords,
    topPayees
  }
}
