require('dotenv').config()

import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'

import { initRoutes } from './routes'

const setup = async () => {
  const app = express()
  // const db = new DB()

  // Start a db connection
  mongoose.connect(`${process.env.mongoUrl}/${process.env.mongoDBName}`)

  const server = http.createServer(app)
  const PORT = process.env.PORT || 8080

  // SetUp JSON formatting
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // SetUp passport authentication
  app.use(passport.initialize())

  // Setup routing
  app.use(cors())
  initRoutes(app)

  // Start the server and listen on the default port
  server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

setup()
