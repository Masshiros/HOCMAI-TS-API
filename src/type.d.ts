import { Request } from 'express'
import Account from './models/schemas/Account.schemas'
import { TokenPayload } from './models/requests/Account.requests'
declare module 'express' {
  interface Request {
    account?: Account
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
