import { Button, Form, Tabs } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/empatica/empaticaModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import PatientAutocompleteFormItem from 'view/patient/autocomplete/PatientAutocompleteFormItem';
const { fields } = model;

class EmpaticaForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.type,
    fields.frequency,
    fields.timestamp,
    fields.patient,
    fields.data,
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
                      name={fields.data.name}
                      label={fields.data.label}
                      required={fields.data.required}
                      autoFocus
                    />
                    <PatientAutocompleteFormItem
                    name={fields.patient.name}
                    label={fields.patient.label}
                    required={fields.patient.required}
                    form={form}
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

export default EmpaticaForm;
