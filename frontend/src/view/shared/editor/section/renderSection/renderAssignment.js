import React from 'react';
import PropTypes from 'prop-types';
import AssignmentAutocompleteFormItem from 'view/assignments/autocomplete/AssignmentAutocompleteFormItem';
import model from 'modules/task/taskModel';
import styled from 'styled-components';

const { fields } = model;

const PlaceHolder = styled.div`
  margin-bottom: 0;
`;

const styles = {
  placeholder: {
    cursor: 'pointer',
    padding: 5,
    backgroundColor: 'white',
  },
  displayData: {
    padding: 5,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
};

function Assignment(props) {
  const { section, onChange, parentId, editMode } = props;

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
  };

  if (!editMode) {
    return section.value && section.value.length ? (
      <div
        style={{
          ...styles.displayData,
          background:
            section.style.backgroundColor || 'white',
        }}
      >
        <div style={section.style}>
          {section.value.map((item) => (
            <span
              key={item.key}
              style={{ marginRight: 10 }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <div style={styles.placeholder}>
        <PlaceHolder>Click to edit</PlaceHolder>
      </div>
    );
  }

  return (
    <div>
      <AssignmentAutocompleteFormItem
        name="assignmentCache"
        required={fields.assignments.required}
        showCreate={false}
        mode="multiple"
        onChangeCustom={handleChange}
        layout={{
          wrapperCol: { lg: { span: 24 } },
          labelCol: { lg: { span: 0 } },
        }}
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
