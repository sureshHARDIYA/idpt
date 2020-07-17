import React, { Component } from 'react';
import { Form } from 'antd';
import { FastField } from 'formik';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

class EditorFormItem extends Component {
  render() {
    const {
      label,
      name,
      layout,
      formItemProps,
      required,
    } = this.props;
    // delete inputProps.touched;
    return (
      <Form.Item
        {...layout}
        label={label}
        required={required}
        {...formItemProps}
      >
        <FastField name={name} id={name}>
          {({ field }) => (
            <ReactQuill
              value={field.value}
              onChange={field.onChange(field.name)}
              theme="snow"
              modules={EditorFormItem.modules}
              formats={EditorFormItem.formats}
            />
          )}
        </FastField>
      </Form.Item>
    );
  }
}

EditorFormItem.modules = {
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
    ['link', 'video'],
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
EditorFormItem.formats = [
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

export default EditorFormItem;
