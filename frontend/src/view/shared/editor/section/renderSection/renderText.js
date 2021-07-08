import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

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
    <Input.TextArea
      autosize
      onChange={handleChange}
      style={section.style}
    />
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
