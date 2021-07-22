import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { Col, Input, Button, Row, Upload } from 'antd';
import PropTypes from 'prop-types';

const Img = styled.img`
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
  image: {
    width: '100%',
  },
  btnSaveContainer: {
    marginTop: 5,
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
  btnWidth: {
    width: 130,
  },
};

function Image(props) {
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
              placeholder="Image source"
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
        <div style={{ backgroundColor: 'white' }}>
          <Row justify="center">
            <Col span={24} style={styles.button}>
              <Upload accept="image/*">
                <Button style={styles.btnWidth}>
                  <span style={styles.text}>
                    Upload image
                  </span>
                </Button>
              </Upload>
            </Col>
          </Row>
          <Row style={{ paddingBottom: 5 }}>
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
        <Img src={source} alt="img" style={section.style} />
      ) : (
        renderInput()
      )}
    </div>
  );
}

Image.defaultProps = {
  isContainerContent: false,
};

Image.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  isContainerContent: PropTypes.bool,
};

const renderImage = (props) => {
  return <Image {...props} />;
};

export default renderImage;
