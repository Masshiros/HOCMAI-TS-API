import express from 'express'
import accountsRouter from './routes/accounts.routes'
import databaseService from './services/database.services'
import { defaultErrHandler } from './middlewares/errors.middleware'
const app = express()
const port = 4949
databaseService.connect().catch(console.dir)

app.use(express.json())
// USER - router
app.use('/accounts', accountsRouter)
// error handler
app.use(defaultErrHandler)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
