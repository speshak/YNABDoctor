const ynab = require('ynab')
const ynabAPI = new ynab.API(process.env.accessToken)

module.exports = function listTransactions(budgetId) {
  return ynabAPI.transactions.getTransactions(budgetId)
    .then((result) => {
      result.data.transactions.forEach(transaction => {
        console.log(transaction)
      })
    })
}