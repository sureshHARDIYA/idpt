import { i18n } from 'i18n';
import StringField from 'modules/shared/fields/stringField';

function label(name) {
  return i18n(`entities.assignments.fields.${name}`);
}

const fields = {
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
};

export default {
  fields,
};
