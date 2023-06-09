import dynamoose from 'dynamoose'
import { AnyItem } from 'dynamoose/dist/Item'

const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.DYNAMO_DB_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.DYNAMO_DB_SECRET_ACCESS_KEY as string
  },
  region: process.env.DYNAMO_DB_REGION as string
})
dynamoose.aws.ddb.set(ddb)

class RootRepository<M extends AnyItem> {
  db: M

  constructor (model: M) {
    this.db = model
  }
}

export default RootRepository
