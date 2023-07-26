import { MongoClient, Collection, Db } from 'mongodb'
import { config } from 'dotenv'
import Account from '~/models/schemas/Account.schemas'
import RefreshToken from '~/models/schemas/RefreshToken.schemas'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@hocmai.5je1aww.mongodb.net/?retryWrites=true&w=majority`

class DatabaseService {
  // connection
  private client: MongoClient
  // db
  private db: Db
  constructor() {
    //connect to mongodb
    this.client = new MongoClient(uri)
    // create new db instance
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('ERROR', error)
      throw error
    }
  }
  // account collections
  get accounts(): Collection<Account> {
    return this.db.collection(process.env.DB_ACCOUNT_COLLECTIONS as string)
  }
  // refresh token collections
  get refreshTokens(): Collection<RefreshToken>{
    return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTIONS as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
