import { i18n } from 'i18n';
import StringField from 'modules/shared/fields/stringField';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';

function label(name) {
  return i18n(`entities.assignments.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  title: new StringField('title', label('title'), {
    required: true,
  }),
  sub_title: new StringField(
    'sub_title',
    label('sub_title'),
    {
      required: false,
    },
  ),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
};

export default {
  fields,
};
