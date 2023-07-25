import { Router } from 'express'
import { registerController } from '~/controllers/accounts.controllers'
import { registerValidation } from '~/middlewares/accounts.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const accountsRouter = Router()
accountsRouter.post('/login')

/**
 * DESC    Register a new account
 * Path:   /register
 * Method  POST
 * Body:   {username: string, email: string ,password: string,confirm_password: string}
 * Access  None
 */
accountsRouter.post('/register', registerValidation, wrapRequestHandler(registerController))

export default accountsRouter
