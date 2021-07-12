import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Slider, Row, Col, Collapse } from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const styles = {
  rowStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;

function SliderStyle(props) {
  const {
    title,
    onChange,
    styleProp,
    section,
    sliderProps,
    unit,
    max,
    min,
  } = props;

  const handleChange = useCallback((position, value) => {
    const prop = styleProp + position;
    const formatValue = unit ? value + unit : value;
    onChange(prop, formatValue);
  }, []);

  const mapValue = (position) => {
    if (section && section.style) {
      return section.style[styleProp + position] || 0;
    }
    return 0;
  };

  const getValue = () => {
    const value = [];
    const style = section && section.style ? section.style : {};
    value.push(
      style[styleProp + 'Top']
        ? style[styleProp + 'Top'] + 'px'
        : '0px',
    );
    value.push(
      style[styleProp + 'Right']
        ? style[styleProp + 'Right'] + 'px'
        : '0px',
    );
    value.push(
      style[styleProp + 'Bottom']
        ? style[styleProp + 'Bottom'] + 'px'
        : '0px',
    );
    value.push(
      style[styleProp + 'Left']
        ? style[styleProp + 'Left'] + 'px'
        : '0px',
    );
    return value.join(' ');
  };

  const renderHeader = () => {
    return (
      <Header>
        <span>{title}</span>
        <span>{getValue()}</span>
      </Header>
    );
  };

  return (
    <div>
      <Collapse bordered={false} ghost>
        <Panel showArrow={false} header={renderHeader()}>
          <Row gutter={24}>
            <Col span={12}>
              <Row style={styles.rowStyles}>
                <Col span={24}>{title} left:</Col>
                <Col span={24}>
                  <Slider
                    min={min}
                    max={max}
                    onChange={(value) =>
                      handleChange('Left', value)
                    }
                    defaultValue={mapValue('Left')}
                    value={mapValue('Left')}
                    {...sliderProps}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row style={styles.rowStyles}>
                <Col span={24}>{title} right:</Col>
                <Col span={24}>
                  <Slider
                    min={min}
                    max={max}
                    onChange={(value) =>
                      handleChange('Right', value)
                    }
                    defaultValue={mapValue('Right')}
                    value={mapValue('Right')}
                    {...sliderProps}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Row style={styles.rowStyles}>
                <Col span={24}>{title} top:</Col>
                <Col span={24}>
                  <Slider
                    min={min}
                    max={max}
                    onChange={(value) =>
                      handleChange('Top', value)
                    }
                    defaultValue={mapValue('Top')}
                    value={mapValue('Top')}
                    {...sliderProps}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row style={styles.rowStyles}>
                <Col span={24}>{title} bottom:</Col>
                <Col span={24}>
                  <Slider
                    min={min}
                    max={max}
                    onChange={(value) =>
                      handleChange('Bottom', value)
                    }
                    defaultValue={mapValue('Bottom')}
                    value={mapValue('Bottom')}
                    {...sliderProps}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
}

SliderStyle.defaultProps = {
  sectionStyles: {},
  sliderProps: {},
  unit: '',
  min: 0,
  max: 20,
};

SliderStyle.propTypes = {
  onChange: PropTypes.func.isRequired,
  sectionStyles: PropTypes.object,
  styleProp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sliderProps: PropTypes.object,
  unit: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default SliderStyle;
