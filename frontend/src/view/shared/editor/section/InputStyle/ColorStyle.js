import React, {
  useCallback,
  useEffect,
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
    margin: 12,
  },
  title: {
    color: 'rgba(0,0,0,0.85)',
  },
};

function ColorStyle(props) {
  const {
    onChange,
    sectionStyles,
    styleProp,
    title,
    defaultValue,
  } = props;
  const [colorValue, setColorValue] = useState(
    defaultValue,
  );
  const colorRef = useRef(null);

  useEffect(() => {
    if (
      sectionStyles &&
      sectionStyles[styleProp] &&
      sectionStyles[styleProp].length
    ) {
      setColorValue(sectionStyles[styleProp]);
    } else {
      setColorValue(defaultValue);
    }
  }, [sectionStyles]);

  useEffect(() => {
    clearTimeout(colorRef.current);
    colorRef.current = setTimeout(() => {
      onChange(styleProp, colorValue);
    }, 100);
  }, [colorValue]);

  const handleChange = useCallback((e) => {
    setColorValue(e.target.value);
  }, []);

  return (
    <Container>
      <Row style={styles.rowStyle}>
        <Col span={12} style={styles.title}>
          {title}
        </Col>
        <Col span={12}>
          <Input
            type="color"
            onChange={handleChange}
            defaultValue={defaultValue}
            value={colorValue}
          />
        </Col>
      </Row>
    </Container>
  );
}

ColorStyle.defaultProps = {
  sectionStyles: {},
  defaultValue: '#ffffff',
};

ColorStyle.propTypes = {
  onChange: PropTypes.func.isRequired,
  sectionStyles: PropTypes.object,
  styleProp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ColorStyle;
