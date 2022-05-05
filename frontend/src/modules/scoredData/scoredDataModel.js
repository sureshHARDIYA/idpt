import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import DecimalField from 'modules/shared/fields/decimalField';
import DateField from 'modules/shared/fields/dateField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';

function label(name) {
  return i18n(`entities.scoredData.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  dataType: new StringField('dataType', label('dataType'), {
    required: true,
  }),
  score: new DecimalField('score', label('score'), {
    required: true,
  }),
  timeStart: new DateField('timeStart', label('timeStart'), {
    required: true,
  }),
  timeEnd: new DateField('timeEnd', label('timeEnd'), {
    required: true,
  }),
  patientName: new StringField('patientName', label('patientName'), {
    required: true,
  }), 
  patientId: new StringField('patientId', label('patientId'), {
    required: true,
  }), 
  dataId: new StringField('dataId', label('dataId')),
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
