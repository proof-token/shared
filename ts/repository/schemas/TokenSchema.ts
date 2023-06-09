import Chain from '@shared/Chain'
import Status from '@shared/Status'
import dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'

const TokenSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      hashKey: true
    },
    userId: String,
    chain: [
      Chain.ETHEREUM_MAINNET,
      Chain.ETHEREUM_GOERLI,
      Chain.ETHEREUM_RINKBY,
      Chain.ETHEREUM_SEPOLIA
    ],
    address: String,
    amount: Number,
    status: {
      type: [Status.PENDING, Status.PROCESSING, Status.FAILED, Status.SUCCESS],
      default: Status.PENDING
    },
    tx: String,
    contractId: String
  },
  { timestamps: true }
)

export default TokenSchema
