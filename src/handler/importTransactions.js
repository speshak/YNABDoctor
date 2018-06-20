const getBudgetId = require('../lib/getBudgetId')
const getTransactions = require('../lib/getTransactions')
const DB = require('../db')

module.exports = async (budgetName) => {
  const database = new DB

  const id = await getBudgetId(budgetName)
  const transactions = await getTransactions(id)

  database.connect().then(async () => {
    const collection = await database.db.collection('transactions');
    await collection.insertMany(transactions)
    await collection.find({}).toArray((err, docs) => {
      console.log(docs)
    });
  })

  database.close()
}