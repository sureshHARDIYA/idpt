import { i18n } from 'i18n'
// import StringField from 'modules/shared/fields/stringField'
import IdField from 'modules/shared/fields/idField'
import DateTimeField from 'modules/shared/fields/dateTimeField'

function label (name) {
  return i18n(`entities.assignmentResponse.fields.${name}`)
}

const fields = {
  id: new IdField('id', label('id')),
  createdAt: new DateTimeField('createdAt', label('createdAt'))
}

export default { fields }
