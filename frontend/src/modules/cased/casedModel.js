import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import StringField from 'modules/shared/fields/stringField';
import EnumeratorField from 'modules/shared/fields/enumeratorField';
import DateField from 'modules/shared/fields/dateField';
import DateRangeField from 'modules/shared/fields/dateRangeField';
import RelationToManyField from 'modules/shared/fields/relationToManyField';
import ImagesField from 'modules/shared/fields/imagesField';

function label(name) {
  return i18n(`entities.cased.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(
    `entities.cased.enumerators.${name}.${value}`,
  );
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    required: true,
  }),
  description: new StringField(
    'description',
    label('description'),
    {},
  ),
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
    {
      required: true,
    },
  ),
  featuredImage: new ImagesField(
    'featuredImage',
    label('featuredImage'),
    'cased/featuredImage',
    {},
  ),
  modules: new RelationToManyField(
    'modules',
    label('modules'),
    {},
  ),
  patients: new RelationToManyField(
    'patients',
    label('patients'),
    {},
  ),
  availableFrom: new DateField(
    'availableFrom',
    label('availableFrom'),
    {
      required: true,
    },
  ),
  audience: new EnumeratorField(
    'audience',
    label('audience'),
    [
      {
        id: 'ALL',
        label: enumeratorLabel('audience', 'ALL'),
      },
      {
        id: 'USER',
        label: enumeratorLabel('audience', 'USER'),
      },
    ],
    {},
  ),
  audienceList: new RelationToManyField(
    'audienceList',
    label('audienceList'),
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
  availableFromRange: new DateRangeField(
    'availableFromRange',
    label('availableFromRange'),
  ),
};

export default {
  fields,
};
