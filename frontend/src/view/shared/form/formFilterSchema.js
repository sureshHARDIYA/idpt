import * as yup from 'yup';
import queryString from 'query-string';
import { values as _values } from 'lodash';

export default class FormFilterSchema {
  constructor(fields) {
    this.fields = fields;
    this.schema = this.buildSchema();
  }

  initialValues(filter, location) {
    const queryFilters = queryString.parse(location.search);

    const hasFilterFromQuery = _values(queryFilters).some(
      (filterValue) => !!filterValue,
    );

    let rawValues;

    if (hasFilterFromQuery) {
      rawValues = queryFilters || {};
    } else {
      rawValues = filter || {};
    }

    const initialValues = {};

    this.fields.forEach((field) => {
      initialValues[field.name] = field.forFormInitialValue(
        rawValues[field.name],
      );
    });

    return initialValues;
  }

  buildSchema() {
    const shape = {};

    this.fields.forEach((field) => {
      shape[field.name] = field.forFilter();
    });

    return yup.object().shape(shape);
  }

  cast(values) {
    return this.schema.cast(values);
  }
}
