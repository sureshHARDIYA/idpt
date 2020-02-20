import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import BooleanField from 'modules/shared/fields/booleanField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.task.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.task.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true
  }),
  description: new StringField('description', label('description'), {}),
  status: new EnumeratorField('status', label('status'), [
    { id: 'ACTIVE', label: enumeratorLabel('status', 'ACTIVE') },
    { id: 'INACTIVE', label: enumeratorLabel('status', 'INACTIVE') },
    { id: 'DRAFT', label: enumeratorLabel('status', 'DRAFT') },
  ],{}),
  tags: new StringField('tags', label('tags'), {}),
  points: new IntegerField('points', label('points'), {
    "min": 0
  }),
  completionRequired: new BooleanField('completionRequired', label('completionRequired')),
  complexityLevel: new IntegerField('complexityLevel', label('complexityLevel'), {
    "min": 0
  }),
  type: new EnumeratorField('type', label('type'), [
    { id: 'AUDIO', label: enumeratorLabel('type', 'AUDIO') },
    { id: 'VIDEO', label: enumeratorLabel('type', 'VIDEO') },
    { id: 'TEXT', label: enumeratorLabel('type', 'TEXT') },
    { id: 'ASSESSMENT', label: enumeratorLabel('type', 'ASSESSMENT') },
    { id: 'FEEDBACK', label: enumeratorLabel('type', 'FEEDBACK') },
  ],{}),
  owner: new RelationToManyField('owner', label('owner'), {}),
  elements: new RelationToManyField('elements', label('elements'), {}),
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
  pointsRange: new IntegerRangeField(
    'pointsRange',
    label('pointsRange'),
  ),
  complexityLevelRange: new IntegerRangeField(
    'complexityLevelRange',
    label('complexityLevelRange'),
  ),
};

export default {
  fields,
};
