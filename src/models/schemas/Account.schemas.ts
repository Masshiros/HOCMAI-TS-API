import { ObjectId } from 'mongodb'

interface AccountType {
  _id?: ObjectId
  username: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
}

export default class Account {
  _id?: ObjectId
  username: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  constructor(account: AccountType) {
    const date = new Date()
    this._id = account._id
    this.username = account.username
    this.email = account.email
    this.password = account.password
    this.created_at = account.created_at || date
    this.updated_at = account.updated_at || date
    this.email_verify_token = account.email_verify_token || ''
    this.forgot_password_token = account.forgot_password_token || ''
  }
}
