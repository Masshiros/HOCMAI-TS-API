import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { registerReqBody } from '~/models/requests/Account.requests'

import accountService from '~/services/account.services'

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  try {
    const result = await accountService.register(req.body)
    return res.json({
      message: 'Register Successfully',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
