import * as ynab from 'ynab'

module.exports = async (db) => {
  const transactions = await db.getDocuments('transactions')
  const filteredTransactions = transactions.filter(t => t.category_name !== null)
  const result = {}
  const summary = { amount: 0, income: 0, outcome: 0, savingsRage: 0}

  filteredTransactions.forEach(transaction => {
    const month = ynab.utils.convertFromISODateString(transaction.date).getMonth()
    if (result[month]) {
      result[month].push(transaction)
    } else {
      result[month] = [{...transaction}]
    }
  })

  for(let i = 0; i < 12; i++) {
    if(!result[i]) {
      continue
    }

    let income = 0
    let outcome = 0

    result[i].forEach(transaction => {
      if (transaction.amount < 0) {
        outcome += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
      } else {
        income += ynab.utils.convertMilliUnitsToCurrencyAmount(transaction.amount, 2)
      }
    })

    outcome = outcome * -1
    const difference = income - outcome
    const savingsRate = ((100 * difference) / income)

    summary.amount = i
    summary.income += income
    summary.outcome += outcome
    summary.savingsRage += savingsRate

    // console.log(`${months[i]}: Outcome ${outcome.toFixed(2)}, Income ${income.toFixed(2)}, Savings rate: ${savingsRate}`)
  }

  console.log(`
    Average:
    income: ${summary.income / summary.amount}
    outcome: ${summary.outcome / summary.amount}
    savingsRate: ${summary.savingsRage / summary.amount}
    `
  )

}
