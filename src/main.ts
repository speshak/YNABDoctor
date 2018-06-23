require('dotenv').config()

const getCommonWords = require('./lib/getCommonWords')
import { DB } from './DB'

const db = new DB()
process.on('exit', db.close)

const setup = async () => {
  await db.connect()
  getCommonWords(db).then(() => {
    process.exit()
  })
}

setup()