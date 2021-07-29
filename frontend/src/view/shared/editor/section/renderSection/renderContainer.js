import React, { useCallback, useRef } from 'react';
import Container, { ContainerWrapper } from './Container';
import Section from '../Section';
import { Row, Col } from 'antd';
import { MAXIMUM_GRID_COL } from '../../constant';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    margin-right: 0px;
  }
  .sub-content {
    visibility: visible;
  }
`;

function ContainerContent(props) {
  const {
    section,
    parentId,
    onChange,
    onSelectSection,
    selectedSection,
  } = props;
  const sectionRef = useRef(null);
  sectionRef.current = section;
  const calculateWidth = useCallback((span) => {
    return (span * MAXIMUM_GRID_COL) / 100;
  }, []);

  const handleDeleteSubContent = (index) => {
    const cloneListSubContent = cloneDeep(section.value);
    cloneListSubContent.splice(index, 1);
    onChange(
      section.id,
      cloneListSubContent,
      parentId,
      section.columnPosition,
    );
  };

  const handleChangeSubContentValue = (
    id,
    value,
    _,
    __,
    additionalProps,
  ) => {
    const cloneListSubContent = cloneDeep(
      sectionRef.current.value,
    );
    const sectionIndex = cloneListSubContent.findIndex(
      (section) => section.id === id,
    );
    const selectedSection = {
      ...cloneListSubContent[sectionIndex],
      ...additionalProps,
      value,
    };
    cloneListSubContent[sectionIndex] = selectedSection;
    onChange(
      section.id,
      cloneListSubContent,
      parentId,
      section.columnPosition,
    );
  };

  if (!section.value.length) {
    return (
      <Container
        key={section.id}
        sectionId={section.id}
        columnType={section.columnType}
      />
    );
  }

  return (
    <ContainerWrapper
      key={section.id}
      sectionId={section.id}
      columnType={section.columnType}
    >
      <div
        style={{
          backgroundColor: section.style.backgroundColor,
          padding: 5,
          paddingBottom: 0,
        }}
      >
        <Row
          gutter={10}
          style={{
            display: 'flex',
            flexFlow: 'wrap',
            marginLeft: 0,
            marginRight: 0,
            ...section.style,
          }}
        >
          {section.value.map((subContent, index) => (
            <Col
              key={subContent.id}
              style={{ paddingBottom: 10 }}
              span={
                subContent.style.span
                  ? calculateWidth(subContent.style.span)
                  : 24
              }
            >
              <Wrapper>
                <Section
                  parentId={section.id}
                  section={subContent}
                  isContainerContent
                  onDelete={() =>
                    handleDeleteSubContent(index)
                  }
                  onChange={handleChangeSubContentValue}
                  onSelectSection={onSelectSection}
                  selectedSection={selectedSection}
                />
              </Wrapper>
            </Col>
          ))}
        </Row>
      </div>
    </ContainerWrapper>
  );
}

ContainerContent.defaultProps = {
  parentId: '',
  selectedSection: {},
};

ContainerContent.propTypes = {
  section: PropTypes.object.isRequired,
  parentId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelectSection: PropTypes.func.isRequired,
  selectedSection: PropTypes.object,
};

const renderContainer = (props) => {
  return <ContainerContent {...props} />;
};

export default renderContainer;
