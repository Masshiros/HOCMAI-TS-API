import { tokenType } from '~/constants/enums'
import { registerReqBody } from '~/models/requests/Account.requests'
import Account from '~/models/schemas/Account.schemas'
import databaseService from './database.services'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
config()

class AccountService {
  // access-token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: tokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
      }
    })
  }
  // refresh token
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: tokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
      }
    })
  }
  async register(payload: registerReqBody) {
    // insert into db
    const result = await databaseService.accounts.insertOne(
      new Account({ ...payload, password: hashPassword(payload.password) })
    )
    // get userID
    const user_id = result.insertedId.toString()
    // sign tokens
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return { access_token, refresh_token }
  }
  // check email exist
  async checkExistedEmail(email: string) {
    const result = await databaseService.accounts.findOne({
      email
    })
    return Boolean(result)
  }
}
const accountService = new AccountService()
export default accountService
