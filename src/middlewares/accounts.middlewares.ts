import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import accountService from '~/services/account.services'
import { validate } from '~/utils/validation'

export const registerValidation = validate(
  checkSchema({
    username: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 100
        }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      // check exist email
      custom: {
        options: async (value) => {
          const existedEmail = await accountService.checkExistedEmail(value)
          if (existedEmail) {
            throw new Error('Email Already Exist')
          }
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 25
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password must contain at least 6 characters long and contain at least 1 lowercase, 1 upper case, 1 number, and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password must contain at least 6 characters long and contain at least 1 lowercase, 1 upper case, 1 number, and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Confirmation password should be the same as the given password')
          }
          return true
        }
      }
    }
  })
)
