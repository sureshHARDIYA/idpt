import { i18n } from 'i18n'
import IdField from 'modules/shared/fields/idField'
import DateTimeField from 'modules/shared/fields/dateTimeField'
import DateTimeRangeField from 'modules/shared/fields/dateTimeRangeField'
import IntegerField from 'modules/shared/fields/integerField'
import IntegerRangeField from 'modules/shared/fields/integerRangeField'
import StringField from 'modules/shared/fields/stringField'
import EnumeratorField from 'modules/shared/fields/enumeratorField'

function label (name) {
  return i18n(`entities.video.fields.${name}`)
}

function enumeratorLabel (name, value) {
  return i18n(`entities.video.enumerators.${name}.${value}`)
}

const fields = {
  id: new IdField('id', label('id')),
  url: new StringField('url', label('url'), { max: 400, required: true }),
  videoLength: new IntegerField('videoLength', label('videoLength'), {
    min: 1
  }),
  evaluationname: new StringField('evaluationCriteriaName', label('name'), {}),
  evaluationoperator: new EnumeratorField(
    'evaluationCriteriaOperator',
    label('operator'),
    [
      {
        id: 'GREATERTHAN',
        label: enumeratorLabel('evaluationCriteria', 'GREATERTHAN')
      },
      {
        id: 'LESSTHAN',
        label: enumeratorLabel('evaluationCriteria', 'LESSTHAN')
      },
      { id: 'EQUALS', label: enumeratorLabel('evaluationCriteria', 'EQUALS') }
    ],
    {}
  ),
  requiredWatchTime: new IntegerField(
    'evaluationCriteriaRequiredWatchTime',
    label('requiredWatchTime'),
    { min: 1 }
  ),
  createdAt: new DateTimeField('createdAt', label('createdAt')),
  updatedAt: new DateTimeField('updatedAt', label('updatedAt')),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange')
  ),
  videoLengthRange: new IntegerRangeField(
    'videoLengthRange',
    label('videoLengthRange')
  )
}

export default { fields }
