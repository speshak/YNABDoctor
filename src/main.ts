require('dotenv').config()

const getNetWorthVelocity = require('./lib/getNetWorthVelocity')
import { DB } from './DB'

const db = new DB()
process.on('exit', db.close)

const setup = async () => {
  await db.connect()
  getNetWorthVelocity(db).then(() => {
    process.exit()
  })
}

setup()