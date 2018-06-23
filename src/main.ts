require('dotenv').config()

const getMonthlySummaries = require('./handler/getMonthlySummaries')
import { DB } from './DB'

const db = new DB()
process.on('exit', db.close)

const setup = async () => {
  await db.connect()
  getMonthlySummaries(db).then(() => {
    process.exit()
  })
}

setup()