import { prepositions } from '../utils/dictionaries'

export default function getMostUsedWords (transactions, limit = 10) {
  const memos = []
  const hist = {}
  const result = []

  transactions.forEach(t => {
    if (t.memo) {
      memos.push(t.memo.split(' '))
    }
  })

  const words = [].concat.apply([], memos).filter(w => prepositions.indexOf(w) === -1 && w.length > 0)

  words.forEach((a) => {
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

  return result.slice(0, limit)
}
