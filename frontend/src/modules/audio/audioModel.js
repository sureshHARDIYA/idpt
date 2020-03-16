import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField';
import IntegerField from 'modules/shared/fields/integerField';
import IntegerRangeField from 'modules/shared/fields/integerRangeField';
import StringField from 'modules/shared/fields/stringField';
import ShapeField from 'modules/shared/fields/shapeField';
import EnumeratorField from 'modules/shared/fields/enumeratorField'

function label(name) {
  return i18n(`entities.audio.fields.${name}`);
}

const evaluationCriteriaLabel = name => i18n(`entities.evaluationCriteria.fields.${name}`);

const enumeratorLabel = (name, value) => i18n(`entities.evaluationCriteria.enumerators.${name}.${value}`);

const fields = {
  id: new IdField('id', label('id')),
  url: new StringField('url', label('url'), {
    "max": 200
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
  evaluationCriteria: new ShapeField('evaluationCriteria', i18n('entities.evaluationCriteria.label'), {
    fields: {
      field: new EnumeratorField('evaluationCriteria.field', evaluationCriteriaLabel('field'), [
        {
          id: 'audiolengthRange',
          label: label('audiolengthRange'),
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
