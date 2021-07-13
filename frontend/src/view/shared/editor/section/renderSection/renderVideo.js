import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Col, Upload, Button, Input, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const UploadVideoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VideoPlayer = styled.iframe`
  max-width: 100%;
`;

const styles = {
  inputSource: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    marginLeft: 5,
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
  },
  video: {
    display: 'flex',
    margin: 'auto',
    border: 'none',
  },
  button: {
    width: 104,
    height: 104,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    border: '1px dashed #d9d9d9',
  },
  text: {
    color: '#666',
    marginLeft: 0,
  },
  icon: {
    fontSize: 32,
    color: '#999',
  },
  btnSaveContainer: {
    marginTop: 5,
  },
};

function Video(props) {
  const {
    section,
    onChange,
    parentId,
    isContainerContent,
  } = props;
  const [url, setUrl] = useState('');

  const handleInputSource = useCallback((e) => {
    const { target } = e;
    setUrl(target.value);
  }, []);

  const handleSave = useCallback((url) => {
    onChange(
      section.id,
      url,
      parentId,
      section.columnPosition,
    );
  }, []);

  const source = useMemo(() => {
    return section.value;
  }, [section]);

  return (
    <div>
      {source ? (
        <VideoPlayer
          src={source}
          title="video"
          style={section.style}
        />
      ) : (
        <UploadVideoContainer
          style={{
            flexDirection:
              parentId || isContainerContent
                ? 'column'
                : 'row',
          }}
        >
          <Col span={12} style={styles.input}>
            <Upload accept="video/*">
              <Button style={styles.button}>
                <PlusOutlined style={styles.icon} />
                <span style={styles.text}>Upload</span>
              </Button>
            </Upload>
          </Col>
          <Col
            span={parentId || isContainerContent ? 24 : 12}
            style={{
              ...styles.inputSource,
              marginTop:
                parentId || isContainerContent
                  ? 5
                  : 'unset',
            }}
          >
            <Row>
              <Col span={isContainerContent ? 24 : 12}>
                <Input
                  placeholder="Video source"
                  onChange={handleInputSource}
                />
              </Col>
              <Button
                style={
                  isContainerContent
                    ? styles.btnSaveContainer
                    : styles.btnSave
                }
                onClick={() => handleSave(url)}
              >
                Save
              </Button>
            </Row>
          </Col>
        </UploadVideoContainer>
      )}
    </div>
  );
}

Video.defaultProps = {
  isContainerContent: false,
};

Video.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  isContainerContent: PropTypes.bool,
};

const renderVideo = (props) => {
  return <Video {...props} />;
};

export default renderVideo;
