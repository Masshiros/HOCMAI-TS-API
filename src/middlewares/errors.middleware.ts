import { Request, Response, NextFunction } from 'express'
import { STATUS_CODES } from 'http'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/status'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // error with status
  if (err instanceof ErrorWithStatus) {
    console.log(err)
    return res.status(err.Status).json(omit(err, 'status'))
  }
  // normal error Object
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
