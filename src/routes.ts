import getNetWorthOverview from './handlers/getNetWorthOverview'
import getReports from './handlers/getReports'
import importYNAB from './lib/importYNAB'

const initRoutes = (app, db) => {
  app.get('/netWorthOverview', async (req, res, next) => {
    res.send( await getNetWorthOverview(db))
  })

  app.get('/reports', async (req, res, next) => {
    const year = req.query.year
    const month = req.query.month
    const report = await getReports(db, year, month)

    if (report) {
      res.status(200).send(await getReports(db, year, month))
    } else {
      res.status(404).send('No data available for this time frame')
    }
  })

  app.get('/import', (req, res, next) => {
    importYNAB(process.env.budgetName ,db)
    res.status(200).send('sucess')
  })
}

export { initRoutes }