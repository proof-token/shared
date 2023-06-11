import dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import Status from '../../types/Status'

const UriSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      hashKey: true
    },
    uri: String,
    s3: Boolean,
    s3Uri: {
      type: String,
      required: false
    },
    ipfs: Boolean,
    ipfsUri: {
      type: String,
      required: false
    },
    userId: String,
    contractIds: {
      type: Set,
      schema: [String]
    },
    status: {
      type: String,
      enum: [Status.PENDING, Status.PROCESSING, Status.FAILED, Status.SUCCESS],
      default: Status.PENDING
    }
  },
  { timestamps: true }
)

export default UriSchema
