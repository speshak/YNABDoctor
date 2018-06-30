import * as moment from 'moment'

import getAmount from '../lib/getAmount'

const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function handleSpendings (db) {
  const budgets = await db.get('budgets')

  let date = getFirstMonth(budgets, process.env.budgetName)
  const end = getLastMonth(budgets, process.env.budgetName)

  let result = {}

  do {
    let i = 0
    let startDate = date
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')

    const incomeTransactions = await db.getIncome(startDate, endDate)
    const outcomeTransactions = await db.getSpendings(startDate, endDate)
    const income: number = getAmount(incomeTransactions)
    const outcome: number = getAmount(outcomeTransactions)

    const savings = income + outcome
    const savingsPercent = ((savings / income) * 100)
    const displaySavings = (Math.round(savingsPercent * 100) / 100).toFixed(2) + '%'

    result[date] = {
      savings,
      savingsPercent: displaySavings
    }

    // Magic to increase the month for every request until we reach the last budgetMonth YNAB gives us
    date = moment([date.slice(0,4)]).month(parseInt(date.slice(5,7), 10) + i).format('YYYY-MM-DD')
    i += 1
  } while (date < end)

  return result
}
