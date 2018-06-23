import * as ynab from 'ynab'

module.exports = async (db) => {
  const transactions = await db.getDocuments('transactions')
  const result = {}
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  let netWorth = 0

  transactions.forEach(transaction => {
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
    const savingsRate = ((100 * difference) / income).toFixed(2)
    netWorth += difference
    console.log(`${months[i]}: Outcome ${outcome.toFixed(2)}, Income ${income.toFixed(2)}, Difference: ${difference.toFixed(2)}, Savings rate: ${savingsRate}`)
  }

  console.log(`Our networth is: ${netWorth.toFixed(2)}`)
}
