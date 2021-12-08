import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringArrayField from 'modules/shared/fields/stringArrayField';
import IntegerField from 'modules/shared/fields/integerField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

function label(name) {
  return i18n(`entities.empatica.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  type: new StringField('type', label('type'), {
    required: true,
  }),
  frequency: new IntegerField('frequency', label('frequency'), {
    required: true,
  }),
  timestamp: new IntegerField('timestamp', label('timestamp'), {
    required: true,
  }),
  patient: new RelationToOneField('patient', label('patient'), {
    required: true,
  }),
  data: new StringArrayField('data', label('data'), {
    required: true,
  }),
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
