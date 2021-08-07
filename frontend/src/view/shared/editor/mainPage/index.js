import { Col, notification, Row } from 'antd';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Prompt } from 'react-router';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Toolbar from '../addContentNavbar/Toolbar';
import {
  COLUMN_TYPES,
  EMPTY_TYPE,
  TWO_COLUMN_TYPES,
  TYPES_OF_CONTENT,
} from '../constant';
import Sections from '../section';

const Container = styled.div`
  border: solid 1px #e3e3e3;
  border-radius: 5px;
  padding: 0 10px;
`;

class MainPageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSection: [
        {
          type: TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value,
          id: uuidv4(),
          columnType: COLUMN_TYPES.ONE_COLUMN,
          value: null,
          style: { backgroundColor: '#ffffff' },
          canDelete: false,
        },
      ],
    };
    this.handleSaveListSection = this.handleSaveListSection.bind(
      this,
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.listSection !== this.state.listSection) {
      const listSection = this.state.listSection;
      const form = this.props.form;
      if (form && form.values) {
        const _listSection = form.values.description;
        if (_listSection !== JSON.stringify(listSection)) {
          this.handleSaveListSection();
        }
      }
      if (listSection.length === 0) {
        this.onHandleAddColumn(
          COLUMN_TYPES.ONE_COLUMN,
          false,
        );
      } else {
        const lastSection =
          listSection[listSection.length - 1];
        if (
          lastSection.type ===
          TYPES_OF_CONTENT.EMPTY_TWO_COLUMN.value
        ) {
          this.onHandleAddColumn(
            COLUMN_TYPES.ONE_COLUMN,
            false,
          );
        }
        if (
          lastSection.canDelete &&
          lastSection.type ===
            TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value
        ) {
          if (EMPTY_TYPE.includes(lastSection.type)) {
            lastSection.canDelete = false;
            this.setState({ listSection });
          } else {
            this.onHandleAddColumn(
              COLUMN_TYPES.ONE_COLUMN,
              false,
            );
          }
        }
      }
    }

    if (prevProps.form !== this.props.form) {
      const { form } = this.props;
      if (form && form.values) {
        const _listSection = form.values.description;
        const listSection = this.handleDeleteEmptySection();
        if (
          _listSection &&
          _listSection !== JSON.stringify(listSection)
        ) {
          this.setState({
            listSection: JSON.parse(_listSection),
          });
        }
      }
    }
  }

  onHandleAddColumn = (colType, canDelete = true) => {
    const { listSection } = this.state;
    if (colType === COLUMN_TYPES.ONE_COLUMN) {
      const section = {
        type: TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value,
        id: uuidv4(),
        columnType: colType,
        value: null,
        style: { backgroundColor: '#ffffff' },
        canDelete,
      };
      listSection[listSection.length - 1].canDelete = true;
      listSection.push(section);
      this.setState({ listSection });
    } else {
      const section = {
        id: uuidv4(),
        columnType: COLUMN_TYPES.TWO_COLUMNS,
        type: TYPES_OF_CONTENT.EMPTY_TWO_COLUMN.value,
        canDelete,
        leftContent: {
          id: uuidv4(),
          value: null,
          type: TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value,
          columnPosition: TWO_COLUMN_TYPES.LEFT,
          style: { backgroundColor: '#ffffff' },
        },
        rightContent: {
          id: uuidv4(),
          value: null,
          type: TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value,
          columnPosition: TWO_COLUMN_TYPES.RIGHT,
          style: { backgroundColor: '#ffffff' },
        },
      };
      listSection[listSection.length - 1].canDelete = true;
      listSection.push(section);
      this.setState({ listSection });
    }
  };

  onHandleAddContent = (
    type,
    sectionId,
    subSectionId,
    columnType,
  ) => {
    if (
      columnType &&
      subSectionId &&
      type === TYPES_OF_CONTENT.CONTAINER.value
    ) {
      this.cannotUseContainerInColumnNotification();
      return;
    }
    const { listSection } = this.state;
    const name = this.getObjectByType(type).name;
    const index = listSection.findIndex(
      (section) => section.id === sectionId,
    );
    let section = null;
    if (index !== -1) {
      if (
        subSectionId &&
        columnType === TWO_COLUMN_TYPES.LEFT
      ) {
        section = listSection[index].leftContent;
        section.name = name;
      } else if (
        subSectionId &&
        columnType === TWO_COLUMN_TYPES.RIGHT
      ) {
        section = listSection[index].rightContent;
        section.name = name;
      } else {
        section = listSection[index];
      }

      if (type === TYPES_OF_CONTENT.CONTAINER.value) {
        section.value = [];
        section.style = { backgroundColor: '#bdeaff' };
      }

      if (
        section.type === TYPES_OF_CONTENT.CONTAINER.value &&
        section.type !== type
      ) {
        const subContent = {
          type,
          value: null,
          style: { backgroundColor: '#ffffff' },
          id: uuidv4(),
          columnType: COLUMN_TYPES.ONE_COLUMN,
          name,
          isContainerContent: true,
          parentId: section.id,
        };
        section.value.push(subContent);
      } else if (section.type === type) {
        this.cannotDragContainerNotification();
        return;
      } else {
        section.type = type;
        section.canDelete = true;
        section.name = name;
      }
      this.setState({ listSection }, () => {
        const lastSection =
          listSection[listSection.length - 1];
        if (
          lastSection.type !==
          TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value
        ) {
          this.onHandleAddColumn(
            COLUMN_TYPES.ONE_COLUMN,
            false,
          );
        }
      });
    }
  };

  handleChangeSection = (listSection) => {
    this.setState({ listSection });
  };

  handleDeleteEmptySection = () => {
    const { listSection } = this.state;
    const _listSection = cloneDeep(listSection);
    const result = [];
    _listSection.forEach((section) => {
      if (section.columnType === COLUMN_TYPES.ONE_COLUMN) {
        if (
          !EMPTY_TYPE.includes(section.type) &&
          section.type !== TYPES_OF_CONTENT.CONTAINER.value
        ) {
          result.push(section);
        } else if (
          section.type ===
            TYPES_OF_CONTENT.CONTAINER.value &&
          section.value &&
          section.value.length
        ) {
          result.push(section);
        }
      } else {
        if (
          !EMPTY_TYPE.includes(section.rightContent.type) ||
          !EMPTY_TYPE.includes(section.leftContent.type)
        ) {
          result.push(section);
        }
      }
    });
    return result;
  };

  getObjectByType = (type) => {
    const foundKey = Object.keys(TYPES_OF_CONTENT).find(
      (key) => TYPES_OF_CONTENT[key].value === type,
    );
    return TYPES_OF_CONTENT[foundKey];
  };

  handleSaveListSection = () => {
    const { form } = this.props;
    const listSection = this.handleDeleteEmptySection();
    form.setFieldValue(
      'description',
      JSON.stringify(listSection),
    );
  };

  cannotDragContainerNotification = () => {
    notification.warning({
      message: 'Cannot drag container into container',
    });
  };

  cannotUseContainerInColumnNotification = () => {
    notification.error({
      message: 'Cannot use container in two column',
    });
  };

  render() {
    const { listSection } = this.state;
    return (
      <Container>
        <DndProvider backend={HTML5Backend}>
          <Row gutter={24} style={{ marginBottom: 20 }}>
            <Col
              span={24}
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
              }}
            >
              <Toolbar
                handleAddContent={this.onHandleAddContent}
                handleAddColumn={this.onHandleAddColumn}
              />
            </Col>
            <Col span={24}>
              <Sections
                listSection={listSection}
                onChange={this.handleChangeSection}
              />
            </Col>
          </Row>
        </DndProvider>
        <Prompt
          message="There are unsaved changes, do you wish to discard them"
          when={this.handleDeleteEmptySection().length > 0}
        />
      </Container>
    );
  }
}

MainPageEditor.defaultProps = {
  loading: false,
};

MainPageEditor.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MainPageEditor;
