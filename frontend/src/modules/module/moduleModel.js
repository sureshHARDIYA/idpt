import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.module.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.module.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  owner: new RelationToManyField('owner', label('owner'), {}),
  name: new StringField('name', label('name'), {
    "required": true
  }),
  description: new StringField('description', label('description'), {}),
  status: new EnumeratorField('status', label('status'), [
    { id: 'ACTIVE', label: enumeratorLabel('status', 'ACTIVE') },
    { id: 'INACTIVE', label: enumeratorLabel('status', 'INACTIVE') },
    { id: 'DRAFT', label: enumeratorLabel('status', 'DRAFT') },
  ],{}),
  tasks: new RelationToManyField('tasks', label('tasks'), {}),
  featuredImage: new ImagesField('featuredImage', label('featuredImage'), 'module/featuredImage',{}),
  prerequisite: new RelationToManyField('prerequisite', label('prerequisite'), {}),
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
