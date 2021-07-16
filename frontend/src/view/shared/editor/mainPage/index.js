import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Col,
  Row,
  notification,
  Button,
  Modal,
} from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import {
  COLUMN_TYPES,
  EMPTY_TYPE,
  TWO_COLUMN_TYPES,
  TYPES_OF_CONTENT,
} from '../constant';
import Toolbar from '../addContentNavbar/Toolbar';
import Sections from '../section';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

const { confirm } = Modal;

const Container = styled.div`
  border: solid 1px #e3e3e3;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;

  button {
    &:last-child {
      margin-left: 8px;
    }
  }
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
          style: {},
          canDelete: false,
        },
      ],
    };
    this.handleSaveListSection = this.handleSaveListSection.bind(
      this,
    );
    this.showConfirmReset = this.showConfirmReset.bind(
      this,
    );
  }

  componentDidMount() {
    const { form } = this.props;
    if (form && form.value) {
      const listSection = form.value.description;
      if (listSection) {
        this.setState({
          listSection: JSON.parse(listSection),
        });
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
        style: {},
        canDelete,
      };
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
          style: {},
        },
        rightContent: {
          id: uuidv4(),
          value: null,
          type: TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value,
          columnPosition: TWO_COLUMN_TYPES.RIGHT,
          style: {},
        },
      };
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
      } else if (
        subSectionId &&
        columnType === TWO_COLUMN_TYPES.RIGHT
      ) {
        section = listSection[index].rightContent;
      } else {
        section = listSection[index];
      }

      if (type === TYPES_OF_CONTENT.CONTAINER.value) {
        section.value = [];
      }

      if (
        section.type === TYPES_OF_CONTENT.CONTAINER.value &&
        section.type !== type
      ) {
        const subContent = {
          type,
          value: null,
          style: {},
          id: uuidv4(),
          columnType: COLUMN_TYPES.ONE_COLUMN,
        };
        section.value.push(subContent);
      } else if (section.type === type) {
        this.cannotDragContainerNotification();
      } else {
        section.type = type;
        section.canDelete = true;
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
        if (!EMPTY_TYPE.includes(section.type)) {
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

  handleSaveListSection = () => {
    const { form } = this.props;
    const listSection = this.handleDeleteEmptySection();
    form.setFieldValue(
      'description',
      JSON.stringify(listSection),
    );
  };

  handleReset = () => {
    this.setState({
      listSection: [
        {
          type: TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value,
          id: uuidv4(),
          columnType: COLUMN_TYPES.ONE_COLUMN,
          value: null,
          style: {},
          canDelete: false,
        },
      ],
    });
  };

  showConfirmReset() {
    confirm({
      title: 'Do you Want to reset all sections?',
      onOk: () => this.handleReset(),
    });
  }

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
              span={3}
              style={{ position: 'sticky', top: 0 }}
            >
              <Toolbar
                handleAddContent={this.onHandleAddContent}
                handleAddColumn={this.onHandleAddColumn}
              />
            </Col>
            <Col span={21}>
              <Sections
                listSection={listSection}
                onChange={this.handleChangeSection}
              />
            </Col>
          </Row>
        </DndProvider>
        <ButtonContainer>
          <Button onClick={this.showConfirmReset}>
            Reset
          </Button>
          <Button
            type="primary"
            onClick={this.handleSaveListSection}
          >
            Save
          </Button>
        </ButtonContainer>
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
