import { Button, Form, Card } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/audio/audioModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';

const { fields } = model;

class AudioForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.url,
    fields.audiolength,
    fields.evaluationCriteria
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
                  name={fields.url.name}
                  label={fields.url.label}
                  required={fields.url.required}
                  autoFocus
                />
                <InputNumberFormItem
                  name={fields.audiolength.name}
                  label={fields.audiolength.label}
                  required={
                    fields.audiolength.required
                  }
                />
                <Card title={fields.evaluationCriteria.label}>
                  <SelectFormItem
                    name={fields.evaluationCriteria.fields.field.name}
                    label={fields.evaluationCriteria.fields.field.label}
                    required={fields.evaluationCriteria.fields.field.required}
                    options={fields.evaluationCriteria.fields.field.options.map(
                      (item) => ({
                        value: item.id,
                        label: item.label,
                      }),
                    )}
                  />

                  <SelectFormItem
                    name={fields.evaluationCriteria.fields.operator.name}
                    label={fields.evaluationCriteria.fields.operator.label}
                    required={fields.evaluationCriteria.fields.operator.required}
                    options={fields.evaluationCriteria.fields.operator.options.map(
                      (item) => ({
                        value: item.id,
                        label: item.label,
                      }),
                    )}
                  />

                  <InputFormItem
                    name={fields.evaluationCriteria.fields.valueRequired.name}
                    label={fields.evaluationCriteria.fields.valueRequired.label}
                    required={fields.evaluationCriteria.fields.valueRequired.required}
                    autoFocus
                  />
                </Card>
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

export default AudioForm;
