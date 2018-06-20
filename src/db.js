const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'ynabreporting';

class DB {
  constructor() {
    this.db = null
    this.client = null
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.client) {
        resolve()
      } else {
        MongoClient
          .connect(url)
          .then((client) => {
            this.client = client
            this.db = client.db(dbName)
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
}

module.exports = DB;