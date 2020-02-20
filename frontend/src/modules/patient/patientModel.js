import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import DateField from 'modules/shared/fields/dateField';
import DateRangeField from 'modules/shared/fields/dateRangeField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.patient.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.patient.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  birthdate: new DateField('birthdate', label('birthdate'), {}),
  gender: new EnumeratorField('gender', label('gender'), [
    { id: 'male', label: enumeratorLabel('gender', 'male') },
    { id: 'female', label: enumeratorLabel('gender', 'female') },
  ],{}),
  assignCase: new RelationToManyField('assignCase', label('assignCase'), {}),
  phone: new StringField('phone', label('phone'), {
    "required": true
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
  birthdateRange: new DateRangeField(
    'birthdateRange',
    label('birthdateRange'),
  ),
};

export default {
  fields,
};
