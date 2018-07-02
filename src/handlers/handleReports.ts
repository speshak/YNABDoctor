import { DateTime } from 'luxon'

import getGroupCategorySpendings from '../lib/getGroupCategorySpendings'
import getMostUsedWords from '../lib/getMostUsedWords'
import getMostUsedPayees from '../lib/getMostUsedPayees'
import getBiggestExpenses from '../lib/getBiggestExpenses'
import getAmount from '../lib/getAmount'
import getSubCategorySpendings from '../lib/getSubCategorySpendings'
import getNetWorth from '../lib/getNetWorth'
import getNetworthPreviousMonth from '../lib/getNetworthPreviousMonth'

/*
Get reports returns information about a certain month (current or last):
{
  income: All positive transactions for this month (not included are transfers between accounts)
  outcome: All negative transactions for this month (not included are transfers between accounts)
  addedNetWorth: Outcome substracted from the income, net savings
  savings: Percentage of money saved (How much percent did I save from my income?)
  passiveIncome: How much passive income generated this month? (transfer_id: null, category: null)
  categories: List all group-categories and:
                - show their expenses in Euro/Dollar
                - show their expenses in percent in relation to the overall outcome of the month
                - show their expenses in percent in relation to the overall income of the month
  topExpenses: Show the top 10 highest expenses of the month
  topWords: Show the top 10 used words of the month
  topPayees: Show the top 10 used payees of the month
  topCategories: Show the top 10 used categories of the month
}
*/
export default async function getReports (db, year, month) {
  const startDate = `${year}-${month}-01`
  const endDate = DateTime.fromISO(startDate).endOf('month').toISODate()

  const budgetMonth = await db.getBudgetMonth(startDate)

  if (budgetMonth.length === 0) {
    return false
  }

  const incomeTransactions = await db.getIncome(startDate, endDate)
  const outcomeTransactions = await db.getSpendings(startDate, endDate)
  const passiveIncomeTransactions = await db.getPassiveIncome(startDate, endDate)

  const categories = await db.get('categories')
  const income: number = getAmount(incomeTransactions)
  const outcome: number = getAmount(outcomeTransactions)

  const passiveIncome: number = getAmount(passiveIncomeTransactions)
  const savings = income + outcome
  const addedNetWorth = income + outcome + passiveIncome
  const currentNetWorth = await getNetWorth(db, endDate)
  const netWorthPreviousMonth = await getNetworthPreviousMonth(db, startDate)

  const savingsPercent = ((savings / income) * 100)
  const displaySavings = (Math.round(savingsPercent * 100) / 100).toFixed(2) + '%'

  const topExpenses = getBiggestExpenses(outcomeTransactions)
  const topWords = getMostUsedWords(outcomeTransactions)
  const topPayees = getMostUsedPayees(outcomeTransactions)
  const categorySpendings = getGroupCategorySpendings(budgetMonth, categories, outcome)
  const subCategorySpendings = getSubCategorySpendings(budgetMonth, outcome, income)

  return {
    income,
    outcome,
    savings,
    savingsPercent: displaySavings,
    passiveIncome,
    netWorthPreviousMonth,
    currentNetWorth,
    addedNetWorth,
    topExpenses,
    topWords,
    topPayees,
    categorySpendings,
    subCategorySpendings
  }
}
