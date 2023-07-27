import { tokenType } from '~/constants/enums'
import { registerReqBody } from '~/models/requests/Account.requests'
import Account from '~/models/schemas/Account.schemas'
import RefreshToken from '~/models/schemas/RefreshToken.schemas'
import databaseService from './database.services'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
config()

class AccountService {
  // access-token
  private signAccessToken(account_id: string) {
    return signToken({
      payload: {
        account_id,
        token_type: tokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
      }
    })
  }
  // refresh token
  private signRefreshToken(account_id: string) {
    return signToken({
      payload: {
        account_id,
        token_type: tokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
      }
    })
  }
  // sign access token and refresh token
  private signAccessAndRefreshToken(account_id: string) {
    return Promise.all([this.signAccessToken(account_id), this.signRefreshToken(account_id)])
  }
  async register(payload: registerReqBody) {
    // insert into db
    const result = await databaseService.accounts.insertOne(
      new Account({ ...payload, password: hashPassword(payload.password) })
    )
    // get userID
    const account_id = result.insertedId.toString()
    // sign tokens
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(account_id)
    // save refresh tokens
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ token: refresh_token, account_id: new ObjectId(account_id) })
    )
    return { access_token, refresh_token }
  }
  // check email exist
  async checkExistedEmail(email: string) {
    const result = await databaseService.accounts.findOne({
      email
    })
    return Boolean(result)
  }
  // check account exist
  async checkAccountExist(email: string, password: string) {
    const account = await databaseService.accounts.findOne({
      email: email,
      password: hashPassword(password)
    })
    return account
  }
  // login
  async login(account_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(account_id)
    // save refresh tokens
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({ token: refresh_token, account_id: new ObjectId(account_id) })
    )
    return { access_token, refresh_token }
  }
  // logout
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
}
const accountService = new AccountService()
export default accountService
