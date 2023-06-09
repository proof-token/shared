import dynamoose from 'dynamoose'
import TokenSchema from '../schemas/TokenSchema'

const TokenModel = dynamoose.model('Token', TokenSchema)

export default TokenModel
