import dynamoose from 'dynamoose'
import ContractSchema from '../schemas/ContractSchema'

const ContractModel = dynamoose.model('Contract', ContractSchema)

export default ContractModel
