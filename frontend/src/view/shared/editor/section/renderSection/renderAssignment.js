import React from 'react';
import PropTypes from 'prop-types';
import AssignmentAutocompleteFormItem from 'view/assignments/autocomplete/AssignmentAutocompleteFormItem';
import model from 'modules/task/taskModel';

const { fields } = model;

function Assignment(props) {
  const { form } = props;
  
  return (
    <div>
      <AssignmentAutocompleteFormItem
        name={fields.assignments.name}
        // label={fields.assignments.label}
        required={fields.assignments.required}
        showCreate={false}
        mode="multiple"
        form={form}
        layout={{
          wrapperCol: { lg: { span: 24 } },
          labelCol: { lg: { span: 0 } }
        }}
      />
    </div>
  );
}

Assignment.propTypes = {
  form: PropTypes.object.isRequired
};

const renderAssignment = (props) => {
  return <Assignment {...props} />;
};

export default renderAssignment;
