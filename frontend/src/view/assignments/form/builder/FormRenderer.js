import React, { useState } from 'react';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Radio,
  Select,
  Row,
  Col,
  DatePicker,
  TimePicker,
} from 'antd';
import { isEmpty, omit } from 'lodash';
import moment from 'moment-timezone';

const CustomDatePicker = React.forwardRef((props, ref) => {
  const handleChange = (date) => {
    if (props.onChange) props.onChange(date.format());
  };
  const { value, format, ...restProps } = props;
  return (
    <DatePicker
      ref={ref}
      {...restProps}
      value={value ? moment(value) : null}
      onChange={handleChange}
      format={format || 'MM/DD/YYYY'}
    />
  );
});

const CustomTimePicker = React.forwardRef((props, ref) => {
  const handleChange = (date, dateString) => {
    if (props.onChange) props.onChange(dateString);
  };
  const { value, format, ...restProps } = props;

  return (
    <TimePicker
      ref={ref}
      {...restProps}
      value={value ? moment(value, 'h:mm A') : null}
      onChange={handleChange}
      format={format || 'h:mm A'}
    />
  );
});

const selectFormElement = (type) => {
  switch (type) {
    case 'input':
      return Input;
    case 'textarea':
      return Input.TextArea;
    case 'password':
      return Input.Password;
    case 'checkbox':
      return Checkbox.Group;
    case 'radio':
      return Radio.Group;
    case 'date':
      return CustomDatePicker;
    case 'time':
      return CustomTimePicker;
    default:
      return null;
  }
};

export const FormItemRenderer = ({
  formItem,
  decorator,
  initialValue,
}) => {
  const {
    label,
    field,
    type,
    help,
    ...allProps
  } = formItem;
  const fieldProps = omit(allProps, 'placeholder');
  // Select list
  if (type === 'select') {
    return (
      <Form.Item label={label} help={help}>
        {decorator(field, {
          ...fieldProps,
          initialValue: initialValue || [],
        })(
          <Select {...fieldProps}>
            {fieldProps.options &&
              fieldProps.options.map((item) => (
                <Select.Option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </Select.Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    );
  }
  // Confirm checkbox
  if (type === 'confirm') {
    return (
      <Form.Item label="" help={help}>
        {decorator(field, {
          ...fieldProps,
          valuePropName: 'checked',
          initialValue: initialValue || false,
        })(<Checkbox>{label}</Checkbox>)}
      </Form.Item>
    );
  }

  // Others
  const FormElement = selectFormElement(type);
  if (!FormElement) return null;

  return (
    <Form.Item
      labelAlign={fieldProps.labelAlign || 'left'}
      label={label}
      help={help}
    >
      {decorator(field, {
        ...fieldProps,
        initialValue,
      })(<FormElement {...fieldProps} />)}
    </Form.Item>
  );
};

const FormRenderer = ({
  colon = false,
  form: { getFieldDecorator, validateFields, resetFields },
  data = {},
  onSave,
  onError,
  formStructure: { id, type, title, sub_title, formSchema },
  formProps,
  allowDraft = true,
  allowSubmit = true,
  disabled = false,
}) => {
  const [draft, setDraft] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, formData) => {
      if (!err) {
        if (onSave) {
          onSave({ formData, draft });
        }
        resetFields();
      } else if (onError) onError(err);
    });
  };

  getFieldDecorator('id', { initialValue: data.id || '' });
  getFieldDecorator('formId', { initialValue: id || '' });
  getFieldDecorator('type', { initialValue: type || '' });

  return (
    <Form
      onSubmit={handleSubmit}
      colon={colon}
      {...formProps}
    >
      <Col>
        <Row>
          {title && (
            <Row>
              <h2>{title}</h2>
            </Row>
          )}
          {sub_title && (
            <Row>
              <p>{sub_title}</p>
            </Row>
          )}
          <fieldset disabled={disabled}>
            {!isEmpty(formSchema) &&
              formSchema.map((fieldItem, index) => (
                <Row key={index}>
                  <FormItemRenderer
                    formItem={fieldItem}
                    decorator={getFieldDecorator}
                    initialValue={data[fieldItem.field]}
                  />
                </Row>
              ))}
          </fieldset>
          {!isEmpty(formSchema) && allowSubmit && (
            <Row gutter={16}>
              {allowDraft && (
                <Col
                  style={{ marginBottom: 10 }}
                  lg={{ span: allowDraft ? 12 : 24 }}
                  md={{ span: allowDraft ? 12 : 24 }}
                  sm={{ span: 24 }}
                  xs={{ span: 24 }}
                >
                  <Button
                    onClick={() => setDraft(true)}
                    block
                    icon="edit"
                    type="dashed"
                    htmlType="submit"
                  >
                    Save Draft
                  </Button>
                </Col>
              )}
              <Col
                style={{ marginBottom: 10 }}
                lg={{ span: allowDraft ? 12 : 24 }}
                md={{ span: allowDraft ? 12 : 24 }}
                sm={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Button
                  onClick={() => setDraft(false)}
                  block
                  type="primary"
                  icon="save"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          )}
        </Row>
      </Col>
    </Form>
  );
};

export default Form.create({
  name: 'form_renderer',
})(FormRenderer);
