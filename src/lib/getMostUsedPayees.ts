import * as ynab from 'ynab'

export default function getMostUsedPayees (transactions) {
  const hist = {}
  const result = []

  const payees = transactions.map(t => ({
    name: t.payee_name,
    spent: ynab.utils.convertMilliUnitsToCurrencyAmount(t.amount, 2)
  }))

  payees.forEach((a) => {
    if (a.name in hist) {
      hist[a.name] = {
        frequency: hist[a.name].frequency += 1,
        spent: hist[a.name].spent += a.spent
      }
    } else {
      hist[a.name] = {
        frequency: 1,
        spent: a.spent
      }
    }
  })

  for (let property in hist) {
    result.push({
      key: property,
      frequency: hist[property].frequency,
      spent: hist[property].spent
    })
  }

  result.sort((a, b) => b.frequency - a.frequency)

  return result.slice(0, 10)
}
