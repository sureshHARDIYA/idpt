import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(`entities.document.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  contentHTML: new StringField('contentHTML', label('contentHTML'), {}),
  totalreadtime: new IntegerField('totalreadtime', label('totalreadtime'), {}),
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
  totalreadtimeRange: new IntegerRangeField(
    'totalreadtimeRange',
    label('totalreadtimeRange'),
  ),
};

export default {
  fields,
};
