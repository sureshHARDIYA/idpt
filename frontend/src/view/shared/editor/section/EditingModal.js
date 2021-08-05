import { Col, Modal, Row } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { TYPES_OF_CONTENT } from '../constant';
import Section from './Section';
import Styles from './Styles';

function EditingModal(props) {
  const {
    visible,
    handleSelectSection,
    onChange,
    form,
  } = props;
  const [section, setSection] = useState({});
  const [selectedSection, setSelectedSection] = useState(
    {},
  );
  const sectionRef = useRef(null);

  useEffect(() => {
    setSection(cloneDeep(props.section));
    if (
      props.section.type ===
        TYPES_OF_CONTENT.ASSIGNMENT.value &&
      form
    ) {
      form.setFieldValue(
        'assignmentCache',
        props.section.value || [],
      );
    }
  }, [props.section]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () =>
      window.removeEventListener(
        'click',
        handleClickOutside,
      );
  }, []);

  const handleClickOutside = (e) => {
    const styles = document.querySelector(
      '.style-component',
    );
    if (
      sectionRef.current &&
      !sectionRef.current.contains(e.target) &&
      styles &&
      !styles.contains(e.target)
    ) {
      setSelectedSection({});
    }
  };

  const onSelectSection = (id) => {
    if (section.type === TYPES_OF_CONTENT.CONTAINER.value) {
      const foundSection = section.value.find(
        (subContent) => subContent.id === id,
      );
      foundSection
        ? setSelectedSection(cloneDeep(foundSection))
        : setSelectedSection({});
    }
  };

  const handleChangeSection = (
    id,
    value,
    __,
    ___,
    style,
    isContainerContent,
  ) => {
    if (
      isContainerContent &&
      section.type === TYPES_OF_CONTENT.CONTAINER.value
    ) {
      section.value.forEach((subContent) => {
        if (subContent.id === id) {
          subContent.value = value;
          if (style) {
            subContent.style = style;
          }
          setSelectedSection(cloneDeep(subContent));
        }
      });
      setSection(cloneDeep(section));
    } else {
      setSection({
        ...section,
        value,
        style: style ? style : section.style,
      });
    }
  };

  const handleSave = () => {
    onChange(
      section.id,
      section.value,
      section.parentId,
      section.columnPosition,
      {
        style: section.style,
      },
      !!section.isContainerContent,
    );
    handleSelectSection();
  };

  return (
    <Modal
      visible={visible}
      width="80%"
      className="editing-modal"
      onCancel={handleSelectSection}
      onOk={handleSave}
    >
      <Row gutter={24}>
        <Col span={18} style={{ paddingTop: 25 }}>
          <div ref={sectionRef}>
            <Section
              section={section}
              editMode
              onSelectSection={onSelectSection}
              selectedSection={selectedSection}
              onChange={handleChangeSection}
              onDelete={() => {}}
            />
          </div>
        </Col>
        <Col span={6}>
          <Styles
            section={
              selectedSection.id ? selectedSection : section
            }
            onChange={handleChangeSection}
          />
        </Col>
      </Row>
    </Modal>
  );
}

EditingModal.propTypes = {};

export default EditingModal;
