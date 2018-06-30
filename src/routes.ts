import handleNetWorthOverview from './handlers/handleNetWorthOverview'
import handleReports from './handlers/handleReports'
import handleSpendings from './handlers/handleSpendings'
import importYNAB from './lib/importYNAB'

const initRoutes = (app, db) => {
  app.get('/netWorthOverview', async (req, res, next) => {
    res.send(await handleNetWorthOverview(db))
  })

  app.get('/reports', async (req, res, next) => {
    const year = req.query.year
    const month = req.query.month
    const report = await handleReports(db, year, month)

    if (report) {
      res.status(200).send(report)
    } else {
      res.status(404).send('No data available for this time frame')
    }
  })

  app.get('/spendings', async (req, res, next) => {
    const spendings = await handleSpendings(db)

    if (spendings) {
      res.status(200).send(spendings)
    } else {
      res.status(404).send('No data available')
    }
  })

  app.get('/import', (req, res, next) => {
    importYNAB(process.env.budgetName ,db)
    res.status(200).send('sucess')
  })
}

export { initRoutes }
