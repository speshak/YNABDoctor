require('dotenv').config()

const calculatePercentages = require('./handler/calculatePercentages')
import { DB } from './DB'

const db = new DB()
process.on('exit', db.close)

const setup = async () => {
  await db.connect()
  calculatePercentages(db).then(() => {
    process.exit()
  })
}

setup()