import * as ynab from 'ynab'
import { categoryBlacklist } from '../utils/categoryBlacklist'

export default async function getSubCategorySpendings (db, budget, outcome, income) {
  const creditCardAccountsResponse = await db.getCreditCardAccounts()
  const creditCardAccounts = creditCardAccountsResponse.map(a => a.name)

  return budget[0].categories
    .filter(cg => categoryBlacklist.indexOf(cg.name) < 0 &&
      creditCardAccounts.indexOf(cg.name) < 0 &&
      cg.activity < 0
    )
    .map(c => ({
      name: c.name,
      amount: ynab.utils.convertMilliUnitsToCurrencyAmount(c.activity, 2),
      percentageOfOutcome: ((ynab.utils.convertMilliUnitsToCurrencyAmount(c.activity, 2) / outcome) * 100).toFixed(2) + '%',
      percentageOfIncome: (((ynab.utils.convertMilliUnitsToCurrencyAmount(c.activity, 2) * -1) / income) * 100).toFixed(2) + '%'
    }))
    .sort((a, b) => a.amount - b.amount)
}
