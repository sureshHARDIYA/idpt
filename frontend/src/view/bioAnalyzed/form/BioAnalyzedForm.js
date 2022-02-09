import { Button, Form, Tabs } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/bioAnalyzed/bioAnalyzedModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import DatePickerFormItem from 'view/shared/form/items/DatePickerFormItem';
const { fields } = model;

class BioAnalyzedForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.dataType,
    fields.score,
    fields.timeStart,
    fields.timeEnd,
    fields.patientName,
    fields.patientId,
    fields.dataId,
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
                      name={fields.dataType.name}
                      label={fields.dataType.label}
                      required={fields.dataType.required}
                      autoFocus
                    />
                    <InputNumberFormItem
                      name={fields.score.name}
                      label={fields.score.label}
                      required={fields.score.required}
                      autoFocus
                    />
                    <DatePickerFormItem
                      name={fields.timeStart.name}
                      label={fields.timeStart.label}
                      required={fields.timeStart.required}
                    />
                    <DatePickerFormItem
                      name={fields.timeEnd.name}
                      label={fields.timeEnd.label}
                      required={fields.timeEnd.required}
                    />
                    <InputFormItem
                    name={fields.patientName.name}
                    label={fields.patientName.label}
                    required={fields.patientName.required}
                    form={form}
                    />
                    <InputFormItem
                    name={fields.patientId.name}
                    label={fields.patientId.label}
                    required={fields.patientId.required}
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

export default BioAnalyzedForm;
