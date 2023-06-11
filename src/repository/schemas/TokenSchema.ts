import dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'
import Chain from '../../types/Chain'
import Status from '../../types/Status'

const TokenSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      hashKey: true
    },
    userId: String,
    chain: {
      type: String,
      enum: [
        Chain.ETHEREUM_MAINNET,
        Chain.ETHEREUM_GOERLI,
        Chain.ETHEREUM_RINKBY,
        Chain.ETHEREUM_SEPOLIA
      ]
    },
    address: String,
    amount: Number,
    status: {
      type: String,
      enum: [Status.PENDING, Status.PROCESSING, Status.FAILED, Status.SUCCESS],
      default: Status.PENDING
    },
    tx: String,
    contractId: String
  },
  { timestamps: true }
)

export default TokenSchema
