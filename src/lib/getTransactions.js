const ynab = require('ynab')
const ynabAPI = new ynab.API(process.env.accessToken)

module.exports = function getTransactions(budgetId) {
  return ynabAPI.transactions.getTransactions(budgetId)
    .then((result) => {
      return result.data.transactions
    })
}