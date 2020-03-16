import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';
import ShapeField from 'modules/shared/fields/shapeField';
import EnumeratorField from 'modules/shared/fields/enumeratorField'

const label = name => i18n(`entities.document.fields.${name}`);

const evaluationCriteriaLabel = name => i18n(`entities.evaluationCriteria.fields.${name}`);

const enumeratorLabel = (name, value) => i18n(`entities.evaluationCriteria.enumerators.${name}.${value}`);

const fields = {
  id: new IdField('id', label('id')),
  contentHTML: new StringField('contentHTML', label('contentHTML'), {
    required: true
  }),
  totalreadtime: new IntegerField('totalreadtime', label('totalreadtime'), {
    required: true
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
  totalreadtimeRange: new IntegerRangeField(
    'totalreadtimeRange',
    label('totalreadtimeRange'),
  ),
  evaluationCriteria: new ShapeField('evaluationCriteria', i18n('entities.evaluationCriteria.label'), {
    fields: {
      field: new EnumeratorField('evaluationCriteria.field', evaluationCriteriaLabel('field'), [
        {
          id: 'contentHTML',
          label: label('contentHTML'),
        },
        {
          id: 'totalreadtime',
          label: label('totalreadtime'),
        }
      ], {
        required: true
      }),
      operator: new EnumeratorField('evaluationCriteria.operator', evaluationCriteriaLabel('operator'), [
        {
          id: 'GREATERTHAN',
          label: enumeratorLabel('operators', 'GREATERTHAN')
        },
        {
          id: 'LESSTHAN',
          label: enumeratorLabel('operators', 'LESSTHAN')
        },
        { id: 'EQUALS', label: enumeratorLabel('operators', 'EQUALS') }
      ], {
        required: true
      }),
      valueRequired: new StringField('evaluationCriteria.valueRequired', evaluationCriteriaLabel('valueRequired'), {
        required: true
      }),
    }
  })
};

export default {
  fields,
};
