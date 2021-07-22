import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

const TextContainer = styled.div`
  p {
    margin-bottom: 0;
    padding: 5px;
  }
`;

const PlaceHolder = styled.div`
  margin-bottom: 0;
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
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () =>
      window.removeEventListener(
        'click',
        handleClickOutside,
      );
  }, []);

  const handleClickOutside = (e) => {
    if (
      editorRef.current &&
      !editorRef.current.contains(e.target)
    ) {
      handleCloseEditor();
    }
  };

  const handleChange = (content) => {
    onChange(
      section.id,
      content,
      parentId,
      section.columnPosition,
    );
  };

  const handleOpenEditor = () => {
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div ref={editorRef}>
          <ReactQuill
            theme="snow"
            onChange={handleChange}
            modules={modules}
            formats={formats}
            value={section.value || ''}
            style={section.style}
            onBlur={handleCloseEditor}
          />
        </div>
      );
    } else {
      if (
        section.value &&
        section.value.split('<p><br></p>')[0]
      ) {
        return (
          <div>
            <TextContainer
              onClick={handleOpenEditor}
              style={{
                cursor: 'pointer',
                ...section.style,
              }}
              dangerouslySetInnerHTML={{
                __html: section.value,
              }}
            />
          </div>
        );
      } else {
        return (
          <div
            onClick={handleOpenEditor}
            style={{
              cursor: 'pointer',
              padding: 5,
              backgroundColor: 'white',
            }}
          >
            <PlaceHolder>Input content here</PlaceHolder>
          </div>
        );
      }
    }
  };

  return <div>{renderContent()}</div>;
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
