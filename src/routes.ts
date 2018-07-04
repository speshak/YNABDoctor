import handleNetWorthOverview from './handlers/handleNetWorthOverview'
import handleReports from './handlers/handleReports'
import handleSpendings from './handlers/handleSpendings'
import handleSavings from './handlers/handleSavings'
import handleSpendingHabits from './handlers/handleSpendingHabits'
import handleCheckUp from './handlers/handleCheckUp'
import importYNAB from './lib/importYNAB'

const initRoutes = (app, db) => {
  app.get('/netWorthOverview', async (req, res) => {
    res.send(await handleNetWorthOverview(db))
  })

  app.get('/reports', async (req, res) => {
    const year = req.query.year
    const month = req.query.month
    const report = await handleReports(db, year, month)

    if (report) {
      res.status(200).send(report)
    } else {
      res.status(404).send('No data available for this time frame')
    }
  })

  app.get('/spendings', async (req, res) => {
    res.status(200).send(await handleSpendings(db))
  })

  app.get('/savings', async (req, res) => {
    res.status(200).send(await handleSavings(db))
  })

  app.get('/spendingHabits', async (req, res) => {
    res.status(200).send(await handleSpendingHabits(db))
  })

  app.get('/checkUp', async (req, res) => {
    res.status(200).send(await handleCheckUp(db))
  })

  app.get('/import', async (req, res) => {
    await importYNAB(process.env.budgetName ,db)
    res.status(200).send('Import Complete!')
  })
}

export { initRoutes }
