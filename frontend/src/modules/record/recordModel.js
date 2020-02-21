import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

function label(name) {
  return i18n(`entities.record.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.record.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  host: new RelationToOneField('host', label('host'), {
    required: true
  }),
  owner: new RelationToOneField('owner', label('owner'), {
    required: true
  }),
  description: new StringField('description', label('description'), {}),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  status: new EnumeratorField('status', label('status'), [
    { id: 'ACTIVE', label: enumeratorLabel('status', 'ACTIVE') },
    { id: 'INACTIVE', label: enumeratorLabel('status', 'INACTIVE') },
    { id: 'DRAFT', label: enumeratorLabel('status', 'DRAFT') },
  ],{}),
  'roadmap.host': new StringField('roadmap.host', label('roadmap.host'), {}),
  'roadmap.state': new EnumeratorField('state', label('state'), [
    { id: 'LOCKED', label: enumeratorLabel('state', 'LOCKED') },
    { id: 'ACTIVE', label: enumeratorLabel('state', 'ACTIVE') },
    { id: 'PROGRESS', label: enumeratorLabel('state', 'PROGRESS') },
    { id: 'COMPLETE', label: enumeratorLabel('state', 'COMPLETE') },
  ], {}),
  'roadmap.tasks': new StringField('roadmap.tasks', label('roadmap.children'), {}),
  'roadmap.children': new StringField('roadmap.children', label('roadmap.children'), {}),
  'roadmap.completionRequired': new StringField('roadmap.completionRequired', label('roadmap.completionRequired'), {}),
};

export default {
  fields,
};
