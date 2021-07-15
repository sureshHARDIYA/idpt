import React, { Component } from 'react';
import { Form } from 'antd';
// import _get from 'lodash/get';
import { FastField } from 'formik';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormErrors from 'view/shared/form/formErrors';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import MainPageEditor from '../../editor/mainPage';

const EditorFormItemNotFast = ({
  label,
  layout,
  formItemProps,
  required,
  form,
  name,
  hint,
  field,
  errorMessage,
  inputProps,
  ...props
}) => {
  // const value = _get(
  //   form.values,
  //   name,
  //   props.defaultValue || '',
  // );

  const descriptionLayout = {
    labelCol: {
      md: {
        span: 4,
      },
    },
    wrapperCol: {
      md: {
        span: 24,
      },
    },
  };

  return (
    <Form.Item
      {...descriptionLayout}
      label={label}
      required={required}
      {...formItemProps}
      validateStatus={FormErrors.validateStatus(
        form,
        name,
        errorMessage,
      )}
      help={
        FormErrors.displayableError(
          form,
          name,
          errorMessage,
        ) || hint
      }
    >
      <MainPageEditor form={form} />
    </Form.Item>
  );
};

EditorFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  required: false,
};

EditorFormItemNotFast.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditorFormItemNotFast.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

class EditorFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form, field }) => (
          <EditorFormItemNotFast
            {...this.props}
            form={form}
            field={field}
          />
        )}
      />
    );
  }
}

export default EditorFormItem;
