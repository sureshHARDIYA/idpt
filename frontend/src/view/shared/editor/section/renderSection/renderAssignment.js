import React from 'react';
import PropTypes from 'prop-types';
import AssignmentAutocompleteFormItem from 'view/assignments/autocomplete/AssignmentAutocompleteFormItem';
import model from 'modules/task/taskModel';

const { fields } = model;

function Assignment(props) {
  const { section, onChange, parentId } = props;

  const handleChange = (values) => {
    onChange(
      section.id,
      values,
      parentId,
      section.columnPosition,
    );
  };

  const handleClear = () => {
    onChange(
      section.id,
      [],
      parentId,
      section.columnPosition,
    );
  }

  return (
    <div>
      <AssignmentAutocompleteFormItem
        name={fields.assignments.name}
        required={fields.assignments.required}
        showCreate={false}
        mode="multiple"
        onChangeCustom={handleChange}
        layout={{
          wrapperCol: { lg: { span: 24 } },
          labelCol: { lg: { span: 0 } },
        }}
        value={section.value || []}
        onClear={handleClear}
        style={section.style}
      />
    </div>
  );
}

Assignment.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
};

const renderAssignment = (props) => {
  return <Assignment {...props} />;
};

export default renderAssignment;
