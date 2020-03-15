import _get from 'lodash/get'

export default class FormErrors {
  static displayableError(
    form,
    fieldName,
    externalErrorMessage = null,
  ) {
    if (externalErrorMessage) {
      return externalErrorMessage;
    }

    if (!_get(form.touched, fieldName)) {
      return null;
    }

    const errors = _get(form.errors, fieldName);

    if (!errors) {
      return null;
    }

    if (Array.isArray(errors)) {
      return errors[0];
    }

    return errors;
  }

  static validateStatus(
    form,
    fieldName,
    externalErrorMessage,
  ) {
    if (
      this.displayableError(
        form,
        fieldName,
        externalErrorMessage,
      )
    ) {
      return 'error';
    }

    return 'success';
  }
}
