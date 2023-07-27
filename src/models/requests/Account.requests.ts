import { JwtPayload } from 'jsonwebtoken'
import { tokenType } from '~/constants/enums'

export interface registerReqBody {
  username: string
  email: string
  password: string
  confirm_password: string
}
export interface logoutReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  account_id: string
  token_type: tokenType
}
