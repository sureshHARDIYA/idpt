import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import StringField from 'modules/shared/fields/stringField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';

function label(name) {
  return i18n(`entities.taxonomy.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    required: true,
  }),
  /*
  status: new EnumeratorField(
    'status',
    label('status'),
    [
      {
        id: 'ACTIVE',
        label: enumeratorLabel('status', 'ACTIVE'),
      },
      {
        id: 'INACTIVE',
        label: enumeratorLabel('status', 'INACTIVE'),
      },
      {
        id: 'DRAFT',
        label: enumeratorLabel('status', 'DRAFT'),
      },
    ],
    {},
  ),
  */
  parent: new RelationToManyField(
    'parent',
    label('parent'),
    {},
  ),
  subtaxonomies: new RelationToManyField(
    'subtaxonomies',
    label('subtaxonomies'),
    {},
  ),
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
