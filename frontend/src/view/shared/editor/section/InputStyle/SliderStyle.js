import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Slider, Row, Col } from 'antd';

const styles = {
  rowStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginBottom: 20,
  },
};

function SliderStyle(props) {
  const {
    title,
    onChange,
    styleProp,
    sectionStyles,
  } = props;

  const handleChange = useCallback((position, value) => {
    const prop = styleProp + position;
    onChange(prop, value);
  }, []);

  const mapValue = (position) => {
    if (sectionStyles) {
      return sectionStyles[styleProp + position] || 0;
    }
    return 0;
  };

  return (
    <div style={styles.container}>
      <Row gutter={24}>
        <Col span={12}>
          <Row style={styles.rowStyles}>
            <Col span={10}>{title} left:</Col>
            <Col span={12}>
              <Slider
                min={0}
                max={20}
                onChange={(value) =>
                  handleChange('Left', value)
                }
                defaultValue={mapValue('Left')}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={styles.rowStyles}>
            <Col span={10}>{title} right:</Col>
            <Col span={12}>
              <Slider
                min={0}
                max={20}
                onChange={(value) =>
                  handleChange('Right', value)
                }
                defaultValue={mapValue('Right')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Row style={styles.rowStyles}>
            <Col span={10}>{title} top:</Col>
            <Col span={12}>
              <Slider
                min={0}
                max={20}
                onChange={(value) =>
                  handleChange('Top', value)
                }
                defaultValue={mapValue('Top')}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row style={styles.rowStyles}>
            <Col span={10}>{title} bottom:</Col>
            <Col span={12}>
              <Slider
                min={0}
                max={20}
                onChange={(value) =>
                  handleChange('Bottom', value)
                }
                defaultValue={mapValue('Bottom')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

SliderStyle.defaultProps = {
  sectionStyles: {},
};

SliderStyle.propTypes = {
  onChange: PropTypes.func.isRequired,
  sectionStyles: PropTypes.object,
  styleProp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SliderStyle;
