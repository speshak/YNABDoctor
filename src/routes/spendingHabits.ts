import * as express from 'express'

const spendingHabits = express.Router()

spendingHabits.use((req, res, next) => {})

spendingHabits.get('/', (req, res, next) => {})
spendingHabits.get('/categories', (req, res, next) => {})
spendingHabits.get('/words', (req, res, next) => {})
spendingHabits.get('/payees', (req, res, next) => {})

export { spendingHabits }
