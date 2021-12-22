import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringArrayField from 'modules/shared/fields/stringArrayField';

class DataField extends StringArrayField {
  forView(value) {
    return value.toString();
  }
}

function label(name) {
  return i18n(`entities.empatica.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),

  type: new StringField('type', label('type'), {
    required: true,
  }),
  frequency: new StringField('frequency', label('frequency'), {
    required: true,
  }),
  timestamp: new StringField('timestamp', label('timestamp'), {
    required: true,
  }),
  patient: new StringField('patient', label('patient')),
  
  data: new DataField('data', label('data')),
  
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
};

export default {
  fields,
};
