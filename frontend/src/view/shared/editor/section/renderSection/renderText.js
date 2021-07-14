import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  textarea {
    border: none;
    resize: none;

    &:focus {
      border: unset;
      resize: vertical;
    }
  }
`;

function Text(props) {
  const { section, onChange, parentId } = props;

  const handleChange = (e) => {
    const { target } = e;
    onChange(
      section.id,
      target.value,
      parentId,
      section.columnPosition,
    );
  };

  return (
    <Container>
      <Input.TextArea
        autosize
        onChange={handleChange}
        style={section.style}
        value={section.value}
        placeholder="Input text"
      />
    </Container>
  );
}

Text.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
};

const renderText = (props) => {
  return <Text {...props} />;
};

export default renderText;
