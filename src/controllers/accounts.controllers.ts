import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { registerReqBody } from '~/models/requests/Account.requests'

import accountService from '~/services/account.services'
export const loginController = async (req: Request, res: Response) => {
  const { account }: any = req
  const account_id = account._id
  const result = await accountService.login(account_id)
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
