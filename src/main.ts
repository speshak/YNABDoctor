require('dotenv').config()

import * as express from 'express'
import * as http from 'http'

import { DB } from './DB'
import { spendingHabits } from './routes/spendingHabits'

const setup = async () => {
  const app = express()
  const db = new DB()
  const server = http.createServer(app)
  const PORT = process.env.PORT || 8080

  // Setup routes and the routHandler
  app.use('/spendingHabits', spendingHabits)

  // Start a db connection and close it when Node exists
  await db.connect()
  process.on('exit', db.close)

  // Start the server and listen on the default port
  server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

setup()
