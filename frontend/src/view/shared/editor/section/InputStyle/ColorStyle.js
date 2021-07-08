import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 15px;
`;

const styles = {
  rowStyle: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 12,
  },
};

function ColorStyle(props) {
  const {
    onChange,
    sectionStyles,
    styleProp,
    title,
  } = props;
  const [colorValue, setColorValue] = useState('');
  const colorRef = useRef(null);

  useEffect(() => {
    clearTimeout(colorRef.current);
    colorRef.current = setTimeout(() => {
      onChange(styleProp, colorValue);
    }, 200);
  }, [colorValue]);

  const handleChange = useCallback((e) => {
    setColorValue(e.target.value);
  }, []);

  const defaultValue = useMemo(() => {
    if (sectionStyles) {
      return sectionStyles.backgroundColor || '#ffffff';
    }
    return '#ffffff';
  }, [sectionStyles]);

  return (
    <Container>
      <Row style={styles.rowStyle}>
        <Col span={5}>{title}</Col>
        <Col span={5}>
          <Input
            type="color"
            onChange={handleChange}
            defaultValue={defaultValue}
          />
        </Col>
      </Row>
    </Container>
  );
}

ColorStyle.defaultProps = {
  sectionStyles: {},
};

ColorStyle.propTypes = {
  onChange: PropTypes.func.isRequired,
  sectionStyles: PropTypes.object,
  styleProp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ColorStyle;
