import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  token: string
  created_at?: Date
  account_id: ObjectId
}
export default class RefreshToken {
  _id?: ObjectId
  token: string
  created_at: Date
  account_id: ObjectId
  constructor({ _id, token, created_at, account_id }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.account_id = account_id
  }
}
