import React from 'react';
import PropTypes from 'prop-types';
import AssignmentAutocompleteFormItem from 'view/assignments/autocomplete/AssignmentAutocompleteFormItem';
import styled from 'styled-components';

const PlaceHolder = styled.div`
  margin-bottom: 0;
`;

const TextContainer = styled.div`
  padding: 5px;
  background: white;
  line-height: 26px;
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
    const value = values.length ? values : null;
    onChange(
      section.id,
      value,
      parentId,
      section.columnPosition,
    );
  };

  const handleClear = () => {
    onChange(
      section.id,
      null,
      parentId,
      section.columnPosition,
    );
  };

  if (!editMode) {
    return section.value && section.value.length ? (
      <TextContainer>
        Click edit to change your assignment
      </TextContainer>
    ) : (
      <div style={styles.placeholder}>
        <PlaceHolder>Click to edit</PlaceHolder>
      </div>
    );
  }

  return (
    <div>
      <AssignmentAutocompleteFormItem
        name="descriptionAssignment"
        showCreate={false}
        mode="multiple"
        onChangeCustom={handleChange}
        layout={{
          wrapperCol: { lg: { span: 24 } },
          labelCol: { lg: { span: 0 } },
        }}
        onClear={handleClear}
        style={section.style}
        inputProps={{ value: section.value || [] }}
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
