import dynamoose from 'dynamoose'
import UriSchema from '../schemas/UriSchema'

const UriModel = dynamoose.model('Uri', UriSchema)

export default UriModel
