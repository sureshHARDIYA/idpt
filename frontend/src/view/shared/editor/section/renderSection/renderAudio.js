import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Col, Upload, Button, Input, Row } from 'antd';
import styled from 'styled-components';

const AudioPlayer = styled.audio`
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
  audio: {
    width: '100%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
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
  btnWidth: {
    width: 200,
  },
};

function Audio(props) {
  const {
    section,
    onChange,
    parentId,
    isContainerContent,
  } = props;
  const [url, setUrl] = useState('');
  const [isInputUrl, setIsInputUrl] = useState(false);

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

  const renderInput = () => {
    if (isInputUrl) {
      return (
        <Row>
          <Col
            style={{
              display:
                !isContainerContent || !parentId
                  ? 'flex'
                  : '',
            }}
            span={parentId ? 24 : 12}
            offset={parentId ? 0 : 6}
          >
            <Input
              placeholder="Audio source"
              onChange={handleInputSource}
            />
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
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <Row justify="center">
            <Col span={24} style={styles.button}>
              <Upload accept="audio/*">
                <Button style={styles.btnWidth}>
                  <span style={styles.text}>
                    Upload audio
                  </span>
                </Button>
              </Upload>
            </Col>
          </Row>
          <Row>
            <Button
              style={{
                ...styles.button,
                ...styles.btnWidth,
              }}
              onClick={() => setIsInputUrl(true)}
            >
              <span style={styles.text}>Just add url</span>
            </Button>
          </Row>
        </div>
      );
    }
  };

  return (
    <div>
      {source ? (
        <AudioPlayer controls style={section.style}>
          <source src={source} type="audio/ogg" />
          <source src={source} type="audio/mpeg" />
        </AudioPlayer>
      ) : (
        renderInput()
      )}
    </div>
  );
}

Audio.defaultProps = {
  isContainerContent: false,
};

Audio.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  isContainerContent: PropTypes.bool,
};

const renderAudio = (props) => {
  return <Audio {...props} />;
};

export default renderAudio;
