import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(`entities.audio.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  url: new StringField('url', label('url'), {
    "min": 200
  }),
  audiolength: new IntegerField('audiolength', label('audiolength'), {
    "min": 1
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
  audiolengthRange: new IntegerRangeField(
    'audiolengthRange',
    label('audiolengthRange'),
  ),
};

export default {
  fields,
};
