const MongoClient = require('mongodb').MongoClient;

export class DB {
  client = null
  db = null

  constructor() {}

  connect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve()
      } else {
        MongoClient
          .connect(process.env.mongoUrl)
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

  close() {
    if (this.client) {
      this.client.close()
        .then(() => {
          console.log('Connection closed')
        }, (err) => {
          console.log('Failed to close DB ', err.message)
        })
    }
  }

  insertMany(collectionName: string, documents) {
    return this.db.collection(collectionName).insertMany(documents)
  }

  getDocuments(collectionName: string) {
    return this.db.collection(collectionName).find().toArray()
  }
}
