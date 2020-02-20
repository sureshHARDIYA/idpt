import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/cased/casedModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import ModuleAutocompleteFormItem from 'view/module/autocomplete/ModuleAutocompleteFormItem';
import PatientAutocompleteFormItem from 'view/patient/autocomplete/PatientAutocompleteFormItem';

const { fields } = model;

class CasedForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.name,
    fields.description,
    fields.status,
    fields.featuredImage,
    fields.modules,
    fields.patients,
    fields.availableFrom,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <InputFormItem
                  name={fields.name.name}
                  label={fields.name.label}
                  required={fields.name.required}
                  autoFocus
                />
                <TextAreaFormItem
                  name={fields.description.name}
                  label={fields.description.label}
                  required={fields.description.required}
                />
                <SelectFormItem
                  name={fields.status.name}
                  label={fields.status.label}
                  options={fields.status.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.status.required}
                />
                <ImagesFormItem
                  name={fields.featuredImage.name}
                  label={fields.featuredImage.label}
                  required={fields.featuredImage.required}
                  path={fields.featuredImage.path}
                  schema={{
                    size: fields.featuredImage.size,
                  }}
                  max={fields.featuredImage.max}
                />
                <ModuleAutocompleteFormItem
                  name={fields.modules.name}
                  label={fields.modules.label}
                  required={fields.modules.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <PatientAutocompleteFormItem
                  name={fields.patients.name}
                  label={fields.patients.label}
                  required={fields.patients.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <DatePickerFormItem
                  name={fields.availableFrom.name}
                  label={fields.availableFrom.label}
                  required={fields.availableFrom.required}
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default CasedForm;
