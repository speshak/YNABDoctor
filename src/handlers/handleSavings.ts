import * as moment from 'moment'

import getAmount from '../lib/getAmount'

const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function handleSpendings (db) {
  const budgets = await db.get('budgets')

  let date = getFirstMonth(budgets, process.env.budgetName)
  const end = getLastMonth(budgets, process.env.budgetName)

  let result = {
    averagePercent: '',
    average: 0
  }

  let i = 0

  let percentageSum = 0
  let savingsSum = 0
  let averagePercent = 0
  let average = 0

  do {
    let startDate = date
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')

    const incomeTransactions = await db.getIncome(startDate, endDate)
    const outcomeTransactions = await db.getSpendings(startDate, endDate)
    const income: number = getAmount(incomeTransactions)
    const outcome: number = getAmount(outcomeTransactions)

    const savings = income + outcome
    savingsSum += savings
    const savingsPercent = savings > 0 ? ((savings / income) * 100) : 0

    percentageSum += savingsPercent
    const displaySavings = (Math.round(savingsPercent * 100) / 100).toFixed(2) + '%'

    result[date] = {
      savings,
      savingsPercent: displaySavings
    }

    date = moment(date).add(1, 'M').format('YYYY-MM-DD')
    i = i + 1

    averagePercent = percentageSum / i
    average = savingsSum / i

  } while (date <= end)

  result.averagePercent = (Math.round(averagePercent * 100) / 100).toFixed(2) + '%'
  result.average = Math.round(average)

  return result
}
