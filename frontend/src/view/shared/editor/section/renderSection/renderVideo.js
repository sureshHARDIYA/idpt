import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Col, Upload, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const UploadVideoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VideoPlayer = styled.iframe`
  max-width: 100%
`

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
};

function Video(props) {
  const { section, onChange, parentId } = props;
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
            flexDirection: parentId ? 'column' : 'row',
          }}
        >
          <Col span={12} style={styles.input}>
            <Upload accept="video/*">
              <Button icon={<UploadOutlined />}>
                Upload video
              </Button>
            </Upload>
          </Col>
          <Col
            span={parentId ? 24 : 12}
            style={styles.inputSource}
          >
            <Input
              placeholder="Input source"
              onChange={handleInputSource}
            />
            <Button
              style={styles.btnSave}
              onClick={() => handleSave(url)}
            >
              Save
            </Button>
          </Col>
        </UploadVideoContainer>
      )}
    </div>
  );
}

Video.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
};

const renderVideo = (props) => {
  return <Video {...props} />;
};

export default renderVideo;
