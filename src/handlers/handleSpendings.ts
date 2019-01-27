import * as moment from 'moment'

import getGroupCategorySpendings from '../lib/getGroupCategorySpendings'
import getAmount from '../lib/getAmount'

const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function handleSpendings (db) {
  const budgets = await db.get('budgets')
  const categories = await db.get('categories')

  let date = getFirstMonth(budgets, process.env.budgetName)
  const end = getLastMonth(budgets, process.env.budgetName)

  let i = 0

  let result = {
    averagePercent: '',
    average: 0,
    sumPerMonth: {}
  }

  let percentageSum = 0
  let spendingsSum = 0
  let averagePercent = 0
  let average = 0

  do {
    let startDate = date
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')

    const budgetMonth = await db.getBudgetMonth(date)

    const incomeTransactions = await db.getIncome(startDate, endDate)
    const outcomeTransactions = await db.getSpendings(startDate, endDate)
    const outcome: number = getAmount(outcomeTransactions)
    const income: number = getAmount(incomeTransactions)

    spendingsSum += outcome

    const spendingsPercent = outcome !== 0 ? ((outcome / income) * 100) : 0
    percentageSum += spendingsPercent

    const spendings = getGroupCategorySpendings(budgetMonth, categories, outcome)
    result[date] = spendings

    result.sumPerMonth[date] = Math.round(outcome * -1)

    date = moment(date).add(1, 'M').format('YYYY-MM-DD')
    i = i + 1

    averagePercent = percentageSum / i
    average = spendingsSum / i
  } while (date <= end)

  result.averagePercent = (Math.round((averagePercent * -1) * 100) / 100).toFixed(2) + '%'
  result.average = Math.round((average * -1))

  return result
}
