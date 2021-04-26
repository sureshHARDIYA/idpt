import { i18n } from 'i18n'
import IdField from 'modules/shared/fields/idField'
import StringField from 'modules/shared/fields/stringField'
import DateTimeField from 'modules/shared/fields/dateTimeField'

function label (name) {
  return i18n(`entities.assignmentResponse.fields.${name}`)
}

const fields = {
  id: new IdField('id', label('id')),
  formData: new StringField('formData', label('formData')),
  createdAt: new DateTimeField('createdAt', label('createdAt'))
}

export default { fields }
