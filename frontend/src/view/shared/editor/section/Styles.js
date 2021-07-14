import React, { useCallback, useRef } from 'react';
import SliderStyle from './InputStyle/SliderStyle';
import ColorStyle from './InputStyle/ColorStyle';
import WidthStyle from './InputStyle/WidthStyle';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Container = styled.div`
  margin-top: 25px;
  border-radius: 4px;
  border: dashed 1px #cfcfcf;
  min-height: 500px;
`;

const MessageWrapper = styled.div`
  align-items: center;
  display: flex;
  min-height: inherit;
  justify-content: center;
`;

function Styles(props) {
  const { onChange, section, styleRef } = props;
  const sectionRef = useRef(null);
  sectionRef.current = section;

  const handleChange = useCallback(
    (prop, value) => {
      onChange(
        sectionRef.current.id,
        sectionRef.current.parentId,
        prop,
        value,
      );
    },
    [section, onChange],
  );

  if (!section.id) {
    return (
      <Container>
        <MessageWrapper>
          Select a component to start styling
        </MessageWrapper>
      </Container>
    );
  }

  return (
    <Container ref={styleRef}>
      <SliderStyle
        styleProp="margin"
        title="Margin"
        onChange={handleChange}
        section={sectionRef.current}
      />
      <SliderStyle
        styleProp="padding"
        title="Padding"
        onChange={handleChange}
        section={sectionRef.current}
      />
      <ColorStyle
        sectionStyles={sectionRef.current.style}
        title="Background color"
        styleProp="backgroundColor"
        onChange={handleChange}
        defaultValue="#ffffff"
      />
      <ColorStyle
        sectionStyles={sectionRef.current.style}
        title="Text color"
        styleProp="color"
        onChange={handleChange}
        defaultValue="#000000"
      />
      {section.isContainerContent ? (
        <WidthStyle
          onChange={handleChange}
          min={25}
          max={100}
          sliderProps={{ step: 25 }}
          sectionStyles={sectionRef.current.style}
        />
      ) : null}
    </Container>
  );
}

Styles.defaultProps = {
  section: {}
}

Styles.propTypes = {
  section: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default Styles;
