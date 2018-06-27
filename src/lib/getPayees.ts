const ynab = require('ynab')
const ynabAPI = new ynab.API(process.env.accessToken)

export default function getPayees(budgetId) {
  return ynabAPI.payees.getPayees(budgetId)
    .then((result) => {
      return result.data.payees
    })
}