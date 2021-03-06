const MongoClient = require('mongodb').MongoClient

export class DB {
  client = null
  db = null

  constructor () {
    // empty
  }

  connect () {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve()
      } else {
        MongoClient
          .connect(encodeURI(process.env.mongoUrl))
          .then((client) => {
            this.client = client
            this.db = client.db(process.env.mongoDBName)
            console.log(`Connected to ${process.env.mongoDBName}`)
            resolve()
          }, (err) => {
            console.log('Error connecting: ', err.message)
            reject(err.message)
          })
      }
    })
  }

  close () {
    if (this.client) {
      this.client.close()
        .then(() => {
          console.log('Connection closed')
        }, (err) => {
          console.log('Failed to close DB ', err.message)
        })
    }
  }

  import (collectionName: string, documents) {
    if (collectionName === 'budgetMonths') {
      this.db.collection(collectionName).update({ 'month': documents.month }, documents, { upsert: true })
      return
    }

    return documents.forEach(d => {
      this.db.collection(collectionName).update({ 'id': d.id }, d, { upsert: true })
    })
  }

  async get (collectionName: string) {
    return this.db.collection(collectionName).find().toArray()
  }

  async getCreditCardAccounts () {
    const query = { type: 'creditCard' }
    return this.db.collection('accounts').find(query).toArray()
  }

  async getTransactionsUntil (date: string) {
    const query = { date: { $lte: date } }
    return this.db.collection('transactions').find(query).toArray()
  }

  async getTransactionsExcludeUntil (date: string) {
    const query = { date: { $lt: date } }
    return this.db.collection('transactions').find(query).toArray()
  }

  async getTransactionsFromTo (start: string, end: string) {
    const query = { date: { $gte: start, $lte: end } }
    return this.db.collection('transactions').find(query).toArray()
  }

  async getBudgetMonth (date: string) {
    const query = { month: date }
    return this.db.collection('budgetMonths').find(query).toArray()
  }

  async getSpendings (start: string, end: string) {
    const spendingsQuery = {
      amount: { $lte: 0 },
      category_name: { $ne: null },
      transfer_account_id: { $eq: null },
      date: { $gte: start, $lte: end }
    }

    return this.db.collection('transactions').find(spendingsQuery).toArray()
  }

  async getSmallCaps () {
    const spendingsQuery = {
      amount: { $gte: -20000, $lte: 0 },
      category_name: { $ne: null },
      transfer_account_id: { $eq: null }
    }

    return this.db.collection('transactions').find(spendingsQuery).toArray()
  }

  async getIncome (start: string, end: string) {
    const incomeQuery = {
      $and: [ {
        payee_name: { $ne: 'Starting Balance' },
        amount: { $gte: 0 },
        category_name: { $ne: null },
        transfer_account_id: { $eq: null },
        date: { $gte: start, $lte: end }
      },
        {
          payee_name: { $ne: 'Dividends' },
          amount: { $gte: 0 },
          category_name: { $ne: null },
          transfer_account_id: { $eq: null },
          date: { $gte: start, $lte: end }
        }
      ]
    }

    return this.db.collection('transactions').find(incomeQuery).toArray()
  }

  async getPassiveIncome (start: string, end: string) {
    const passiveIncomeQuery = {
      $or: [ {
        category_name: { $eq: null },
        transfer_account_id: { $eq: null },
        date: { $gte: start, $lte: end }
      },
        {
          payee_name: 'Dividends',
          date: { $gte: start, $lte: end }
        },
        {
          payee_name: 'Starting Balance',
          date: { $gte: start, $lte: end }
        }
      ]
    }
    return this.db.collection('transactions').find(passiveIncomeQuery).toArray()
  }
}
