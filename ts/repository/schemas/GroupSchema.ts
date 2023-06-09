import dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'

const GroupSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      hashKey: true
    },
    name: String,
    userId: String,
    contractIds: {
      type: Set,
      schema: [String]
    }
  },
  { timestamps: true }
)

export default GroupSchema
