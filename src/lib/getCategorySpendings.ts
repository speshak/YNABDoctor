import * as ynab from 'ynab'

export default function getCategorySpendings(budget, categories, outcome) {
  const result = {}

  budget[0].categories.forEach(c => {
    let groupCategoryName = categories.find(cat => cat.id === c.category_group_id).name

    if(groupCategoryName !== 'Internal Master Category' &&
    groupCategoryName !== 'Credit Card Payments') {
      if (result[c.category_group_id]) {
        result[c.category_group_id].amount += ynab.utils.convertMilliUnitsToCurrencyAmount(c.activity, 2)
      } else {
        result[c.category_group_id] = {
          name: groupCategoryName,
          amount: ynab.utils.convertMilliUnitsToCurrencyAmount(c.activity, 2)
        }
      }
    }
  })

  return Object.keys(result).map(key => ({
    name: result[key].name,
    amount: result[key].amount,
    percentageOfOutcome: ((result[key].amount / outcome) * 100).toFixed(2) + '%',
  }))
}
