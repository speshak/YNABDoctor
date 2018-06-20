require('dotenv').config()

const importTransactions = require('./handler/importTransactions')
const DB = require('../db')

const db = new DB
importTransactions('embastic', db)