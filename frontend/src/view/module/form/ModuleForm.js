import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/module/moduleModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import Editor from 'view/shared/form/items/Editor';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import CasedAutocompleteFormItem from 'view/cased/autocomplete/CasedAutocompleteFormItem';
import TaskAutocompleteFormItem from 'view/task/autocomplete/TaskAutocompleteFormItem';
import ModuleAutocompleteFormItem from 'view/module/autocomplete/ModuleAutocompleteFormItem';

const { fields } = model;

class ModuleForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.owner,
    fields.name,
    fields.description,
    fields.status,
    fields.tasks,
    fields.featuredImage,
    fields.prerequisite,
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

                <CasedAutocompleteFormItem
                  name={fields.owner.name}
                  label={fields.owner.label}
                  required={fields.owner.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
                />
                <InputFormItem
                  name={fields.name.name}
                  label={fields.name.label}
                  required={fields.name.required}
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
                <TaskAutocompleteFormItem
                  name={fields.tasks.name}
                  label={fields.tasks.label}
                  required={fields.tasks.required}
                  showCreate={!this.props.modal}
                  form={form}
                  mode="multiple"
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
                  name={fields.prerequisite.name}
                  label={fields.prerequisite.label}
                  required={fields.prerequisite.required}
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

export default ModuleForm;
