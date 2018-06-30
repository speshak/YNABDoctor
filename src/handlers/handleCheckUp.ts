import * as moment from 'moment'

import getMostUsedWords from '../lib/getMostUsedWords'
import getMostUsedPayees from '../lib/getMostUsedPayees'
import getAmount from '../lib/getAmount'

const getFirstMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).first_month
const getLastMonth = (budgets, budgetName) => budgets.find(b => b.name === budgetName).last_month

export default async function handleCheckUp (db) {
  const smallTransasctions = await db.getSmallCaps()
  const budgets = await db.get('budgets')

  let start = getFirstMonth(budgets, process.env.budgetName)
  const end = getLastMonth(budgets, process.env.budgetName)

  const spendings = await db.getSpendings(start, end)
  const overallSpending = getAmount(spendings)
  const overallSmallCapSpendings = getAmount(smallTransasctions)
  const smallCapInPercent = ((overallSmallCapSpendings / overallSpending) * 100).toFixed(2) + '%'
  const mostUsedSmallCapWords = getMostUsedWords(smallTransasctions)
  const mostUsedSmallCapPayees = getMostUsedPayees(smallTransasctions)

  let i = 0

  let percentageSum = 0
  let averageSavingsPercent = 0

  do {
    let startDate = start
    let endDate = moment(startDate).endOf('month').format('YYYY-MM-DD')

    const incomeTransactions = await db.getIncome(startDate, endDate)
    const outcomeTransactions = await db.getSpendings(startDate, endDate)
    const income: number = getAmount(incomeTransactions)
    const outcome: number = getAmount(outcomeTransactions)

    const savings = income + outcome
    const savingsPercent = ((savings / income) * 100)
    percentageSum += savingsPercent

    start = moment(start).add(1, 'M').format('YYYY-MM-DD')
    i = i + 1

    averageSavingsPercent = percentageSum / i
  } while (start < end)

  return {
    averageSavingsPercent,
    overallSmallCapSpendings,
    smallCapInPercent,
    mostUsedSmallCapPayees,
    mostUsedSmallCapWords
  }
}
