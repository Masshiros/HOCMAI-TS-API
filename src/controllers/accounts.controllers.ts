import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { logoutReqBody, registerReqBody } from '~/models/requests/Account.requests'
import Account from '~/models/schemas/Account.schemas'

import accountService from '~/services/account.services'
export const loginController = async (req: Request, res: Response) => {
  const account = req.account as Account
  const account_id = account._id as ObjectId
  const result = await accountService.login(account_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const result = await accountService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, logoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await accountService.logout(refresh_token)
  return res.json(result)
}
