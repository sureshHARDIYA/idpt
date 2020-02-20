import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/task/taskModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'view/shared/form/items/TextAreaFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import SwitchFormItem from 'view/shared/form/items/SwitchFormItem';
import RadioFormItem from 'view/shared/form/items/RadioFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import ModuleAutocompleteFormItem from 'view/module/autocomplete/ModuleAutocompleteFormItem';
import DocumentAutocompleteFormItem from 'view/document/autocomplete/DocumentAutocompleteFormItem';

const { fields } = model;

class TaskForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.name,
    fields.description,
    fields.status,
    fields.tags,
    fields.points,
    fields.completionRequired,
    fields.complexityLevel,
    fields.type,
    fields.owner,
    fields.elements,
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
                <InputFormItem
                  name={fields.tags.name}
                  label={fields.tags.label}
                  required={fields.tags.required}
                />
                <InputNumberFormItem
                  name={fields.points.name}
                  label={fields.points.label}
                  required={
                    fields.points.required
                  }
                />
                <SwitchFormItem
                  name={fields.completionRequired.name}
                  label={fields.completionRequired.label}
                />
                <InputNumberFormItem
                  name={fields.complexityLevel.name}
                  label={fields.complexityLevel.label}
                  required={
                    fields.complexityLevel.required
                  }
                />
                <RadioFormItem
                  name={fields.type.name}
                  label={fields.type.label}
                  options={fields.type.options.map(
                    (item) => ({
                      value: item.id,
                      label: item.label,
                    }),
                  )}
                  required={fields.type.required}
                />
                <ModuleAutocompleteFormItem
                  name={fields.owner.name}
                  label={fields.owner.label}
                  required={fields.owner.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <DocumentAutocompleteFormItem
                  name={fields.elements.name}
                  label={fields.elements.label}
                  required={fields.elements.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
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

export default TaskForm;
