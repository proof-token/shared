import Chain from '@shared/Chain'
import Status from '@shared/Status'
import dynamoose from 'dynamoose'
import { v4 as uuidv4 } from 'uuid'

const blockchainSubSchema = {
  type: Object,
  schema: {
    enabled: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ''
    },
    status: {
      type: [Status.PENDING, Status.PROCESSING, Status.FAILED, Status.SUCCESS],
      default: Status.PENDING
    },
    tx: {
      type: String,
      default: ''
    }
  },
  required: true
}

const ContractSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      hashKey: true
    },
    name: String,
    symbol: String,
    userId: String,
    uriId: String,
    groupId: String,
    tokenIds: {
      type: Set,
      schema: [String]
    },
    max: [Number, 'infinite'],
    chains: {
      type: Object,
      schema: {
        [Chain.ETHEREUM_MAINNET]: blockchainSubSchema,
        [Chain.ETHEREUM_RINKBY]: blockchainSubSchema,
        [Chain.ETHEREUM_GOERLI]: blockchainSubSchema,
        [Chain.ETHEREUM_SEPOLIA]: blockchainSubSchema
      }
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

export default ContractSchema
