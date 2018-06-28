export default function getMostUsedPayees (transactions) {
  const hist = {}
  const result = []

  const payeeNames = transactions.map(t => t.payee_name)

  payeeNames.forEach((a) => {
    if (a in hist) {
      hist[a] ++
    } else {
      hist[a] = 1
    }
  })

  for (let property in hist) {
    result.push({ key: property, value: hist[property] })
  }

  result.sort((a, b) => b.value - a.value)

  return result.slice(0, 10)
}
