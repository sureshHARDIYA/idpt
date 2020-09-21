import { i18n } from 'i18n';
import { Formik } from 'formik';
import { Button, Form } from 'antd';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import model from 'modules/cased/casedModel';
import Editor from 'view/shared/form/items/Editor';
import FormSchema from 'view/shared/form/formSchema';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
import ModuleAutocompleteFormItem from 'view/module/autocomplete/ModuleAutocompleteFormItem';
import UserAutocompleteFormItem from 'view/iam/autocomplete/UserAutocompleteFormItem';
import RadioFormItem from 'view/shared/form/items/RadioFormItem';

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
    fields.audience,
    fields.audienceList,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record;
    if (!record.audience) {
      record.audience = 'ALL';
    }

    if (record.audienceList) {
      record.audienceList = record.audienceList.filter(
        Boolean,
      );
    }

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
                <Editor
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
                <DatePickerFormItem
                  name={fields.availableFrom.name}
                  label={fields.availableFrom.label}
                  required={fields.availableFrom.required}
                />
                <RadioFormItem
                  name={fields.audience.name}
                  label={fields.audience.label}
                  options={fields.audience.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.audience.required}
                />
                {form.values.audience === 'USER' && (
                  <UserAutocompleteFormItem
                    form={form}
                    mode="multiple"
                    name={fields.audienceList.name}
                    label={fields.audienceList.label}
                    required={fields.audienceList.required}
                  />
                )}
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
