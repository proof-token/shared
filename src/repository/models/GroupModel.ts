import dynamoose from 'dynamoose'
import GroupSchema from '../schemas/GroupSchema'

const GroupModel = dynamoose.model('Group', GroupSchema)

export default GroupModel
