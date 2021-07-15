import React, {
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Slider, Row, Col } from 'antd';

const styles = {
  rowStyles: {
    display: 'flex',
    alignItems: 'center',
    margin: 12,
  },
  title: {
    color: 'rgba(0,0,0,0.85)',
  },
};

function WidthStyle(props) {
  const {
    onChange,
    min,
    max,
    sliderProps,
    sectionStyles,
  } = props;

  const handleChange = useCallback((value) => {
    onChange('span', value);
  }, []);

  const defaultValue = useMemo(() => {
    return sectionStyles.span || max;
  }, [sectionStyles]);

  return (
    <div>
      <Row style={styles.rowStyles}>
        <Col span={12} style={styles.title}>
          Width:
        </Col>
        <Col span={12}>
          <Slider
            min={min}
            max={max}
            onChange={handleChange}
            defaultValue={defaultValue}
            value={defaultValue}
            {...sliderProps}
          />
        </Col>
      </Row>
    </div>
  );
}

WidthStyle.defaultProps = {
  sectionStyles: {},
  sliderProps: {},
  min: 0,
  max: 100,
};

WidthStyle.propTypes = {
  onChange: PropTypes.func.isRequired,
  sectionStyles: PropTypes.object,
  sliderProps: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default WidthStyle;
