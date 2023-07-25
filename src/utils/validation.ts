import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/status'
import { ErrorWithStatus, ValidationError } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorObjects = errors.mapped()
    const validationErrors = new ValidationError({ errors: {} })
    // normal error
    for (const key in errorObjects) {
      // normal error
      const { msg } = errorObjects[key]
      if (msg instanceof ErrorWithStatus && msg.Status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      // validation error
      validationErrors.Errors = errorObjects
    }
    next(validationErrors)
  }
}
