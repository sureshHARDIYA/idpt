import { i18n } from 'i18n';
import IdField from 'modules/shared/fields/idField';
import DateTimeField from 'modules/shared/fields/dateTimeField';

function label(name) {
  return i18n(`entities.roadmap.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
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
