import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

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

const modules = {
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
    matchVisual: false,
  },
};

const formats = [
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

function Text(props) {
  const { section, onChange, parentId } = props;

  const handleChange = (content) => {
    onChange(
      section.id,
      content,
      parentId,
      section.columnPosition,
    );
  };

  return (
    <Container>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        modules={modules}
        formats={formats}
        value={section.value || ''}
        style={section.style}
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
