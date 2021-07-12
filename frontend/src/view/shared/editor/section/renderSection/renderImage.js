import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import ImagesUploader from 'view/shared/uploaders/ImagesUploader';
import model from 'modules/module/moduleModel';
import styled from 'styled-components';
import { Col, Input, Button, Row } from 'antd';
import PropTypes from 'prop-types';

const UploadImageContainer = styled.div`
  display: flex;
  align-items: center;
`;

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
};

const { fields } = model;

function Image(props) {
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

  const handleChange = useCallback((value) => {
    onChange(
      section.id,
      value.publicUrl,
      parentId,
      section.columnPosition,
    );
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
        <Img src={source} alt="img" style={section.style} />
      ) : (
        <UploadImageContainer
          style={{
            flexDirection:
              parentId || isContainerContent
                ? 'column'
                : 'row',
          }}
        >
          <Col span={12} style={styles.input}>
            <ImagesUploader
              path={fields.featuredImage.path}
              schema={{
                size: fields.featuredImage.size,
              }}
              value={section.value}
              onChange={(value) => handleChange(value[0])}
              max={1}
            />
          </Col>
          <Col
            span={parentId || isContainerContent ? 24 : 12}
            style={styles.inputSource}
          >
            <Row>
              <Col span={isContainerContent ? 24 : 12}>
                <Input
                  placeholder="Input source"
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
        </UploadImageContainer>
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
