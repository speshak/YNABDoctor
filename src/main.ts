require('dotenv').config()

import * as express from 'express'
import * as http from 'http'

import { DB } from './DB'

const app = express()
const db = new DB()

const setup = async () => {
  await db.connect()
  process.on('exit', db.close)
}

const server = http.createServer(app)

app.get('/', (req, res) => {
  res.send('Hello there!')
})

setup()

server.listen(8080, () => console.log(`Listening on ${server.address()}`))
