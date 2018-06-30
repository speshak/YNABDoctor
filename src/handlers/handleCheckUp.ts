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
  const overallSmallCapSpendings = Math.round(getAmount(smallTransasctions)) * -1
  const smallCapInPercent = (((overallSmallCapSpendings * -1) / overallSpending) * 100).toFixed(2) + '%'
  const mostUsedSmallCapWords = getMostUsedWords(smallTransasctions)
  const mostUsedSmallCapPayees = getMostUsedPayees(smallTransasctions)

  return {
    overallSmallCapSpendings,
    smallCapInPercent,
    mostUsedSmallCapPayees,
    mostUsedSmallCapWords
  }
}
