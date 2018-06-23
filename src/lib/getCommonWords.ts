import * as ynab from 'ynab'

module.exports = async (db) => {
  const transactions = await db.getDocuments('transactions')
  const memos = []
  const hist = {}
  const result = []

  transactions.forEach(t => {
    if (t.memo) {
      memos.push(t.memo.split(' '))
    }
  })

  const words = [].concat.apply([], memos)

  words.forEach((a) => {
    if (a in hist) {
      hist[a] ++
    } else {
      hist[a] = 1
    }
  })

  for (let property in hist) {
    result.push({key: property, value: hist[property]})
  }

  result.sort((a, b) =>  b.value - a.value)

  console.log(result)
  return result
}
