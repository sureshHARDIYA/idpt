import { Button, Form, Tabs } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/taxonomy/taxonomyModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import TaxonomyAutocompleteFormItem from 'view/taxonomy/autocomplete/TaxonomyAutocompleteFormItem';

const { fields } = model;

class TaxonomyForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.name,
    // fields.status,
    fields.parent,
    fields.subtaxonomies,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record || {};
    return this.schema.initialValues(record);
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

                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane
                    key="1"
                    tab="Generate Information"
                  >
                    <InputFormItem
                      name={fields.name.name}
                      label={fields.name.label}
                      required={fields.name.required}
                      autoFocus
                    />
                    {/* <SelectFormItem
                      name={fields.status.name}
                      label={fields.status.label}
                      options={fields.status.options.map(
                        (item) => ({
                          value: item.id,
                          label: item.label,
                        }),
                      )}
                      required={fields.status.required}
                    /> */}
                    <TaxonomyAutocompleteFormItem
                      name={fields.parent.name}
                      label={fields.parent.label}
                      required={fields.parent.required}
                      showCreate={!this.props.modal}
                      form={form}
                      mode="multiple"
                    />
                    <TaxonomyAutocompleteFormItem
                      name={fields.subtaxonomies.name}
                      label={fields.subtaxonomies.label}
                      required={fields.subtaxonomies.required}
                      showCreate={!this.props.modal}
                      form={form}
                      mode="multiple"
                    />
                  </Tabs.TabPane>
                </Tabs>

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

export default TaxonomyForm;
