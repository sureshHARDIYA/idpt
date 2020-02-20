import GenericField from 'modules/shared/fields/genericField';
import * as yup from 'yup';
import moment from 'moment';

export default class DateTimeRangeField extends GenericField {
  forFilter() {
    return yup.mixed().label(this.label);
  }

  forFormInitialValue(value) {
    if (!value || !value.length) {
      return [];
    }

    return value.map((item) =>
      item ? moment(item) : null,
    );
  }
}
