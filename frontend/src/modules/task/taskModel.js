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
import ShapeArrayField from 'modules/shared/fields/shapeArrayField';

function label(name) {
  return i18n(`entities.task.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.task.enumerators.${name}.${value}`);
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
    {},
  ),
  tags: new StringField('tags', label('tags'), {}),
  points: new IntegerField('points', label('points'), {
    min: 0,
  }),
  completionRequired: new BooleanField(
    'completionRequired',
    label('completionRequired'),
  ),
  complexityLevel: new IntegerField(
    'complexityLevel',
    label('complexityLevel'),
    {
      min: 0,
    },
  ),
  owner: new RelationToManyField(
    'owner',
    label('owner'),
    {},
  ),
  assignments: new RelationToManyField(
    'assignments',
    label('assignments'),
    {},
  ),
  taxonomies: new RelationToManyField(
    'taxonomies',
    label('taxonomies'),
    {},
  ),
  next: new RelationToManyField('next', label('next'), {}),
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
  documents: new ShapeArrayField(
    'documents',
    label('documents'),
    {
      id: new IdField('id', label('id')),
      contentHTML: new StringField(
        'documents.contentHTML',
        'ContentHTML',
        {
          required: true,
        },
      ),
      evaluation: new IntegerField(
        'documents.evaluation',
        'Read time',
        {
          required: true,
        },
      ),
    },
  ),
  audios: new ShapeArrayField('audios', label('audios'), {
    id: new IdField('id', label('id')),
    url: new StringField('audios.url', 'URL', {
      required: true,
    }),
    evaluation: new IntegerField(
      'audios.evaluation',
      'Listen time',
      {
        required: true,
      },
    ),
  }),
  videos: new ShapeArrayField('videos', label('videos'), {
    id: new IdField('id', label('id')),
    url: new StringField('videos.url', 'URL', {
      required: true,
    }),
    evaluation: new IntegerField(
      'videos.evaluation',
      'Watch time',
      {
        required: true,
      },
    ),
  }),
};

export default {
  fields,
};
