import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Col,
  Row,
  Modal,
  notification,
} from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import {
  COLUMN_TYPES,
  TWO_COLUMN_TYPES,
  TYPES_OF_CONTENT,
} from '../constant';
import Toolbar from '../addContentNavbar/Toolbar';
import Sections from '../section';

const { confirm } = Modal;

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
        },
      ],
      visible: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSaveListSection = this.handleSaveListSection.bind(
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

  onDeleteAllSection = () => {
    this.setState({ listSection: [] });
  };

  onHandleAddColumn = (colType) => {
    const { listSection } = this.state;
    if (colType === COLUMN_TYPES.ONE_COLUMN) {
      const section = {
        type: TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value,
        id: uuidv4(),
        columnType: colType,
        value: null,
        style: {},
      };
      listSection.push(section);
      this.setState({ listSection });
    } else {
      const section = {
        id: uuidv4(),
        columnType: COLUMN_TYPES.TWO_COLUMNS,
        type: TYPES_OF_CONTENT.EMPTY_TWO_COLUMN.value,
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
      }
      this.setState({ listSection });
    }
  };

  handleChangeSection = (listSection) => {
    this.setState({ listSection });
  };

  handleSaveListSection = () => {
    const { form } = this.props;
    const { listSection } = this.state;
    form.setFieldValue(
      'description',
      JSON.stringify(listSection),
    );
  };

  showConfirmReset = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure want to delete all sections
        </span>
      ),
      onOk: () => {
        this.onDeleteAllSection();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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

  openModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({
      visible: false,
      listSection: [
        {
          type: TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value,
          id: uuidv4(),
          columnType: COLUMN_TYPES.ONE_COLUMN,
          value: null,
          style: {},
        },
      ],
    });
  };

  render() {
    const { listSection } = this.state;
    return (
      <>
        <Button onClick={this.openModal}>
          Edit description
        </Button>
        <Modal
          width="95%"
          visible={this.state.visible}
          onCancel={this.closeModal}
          onOk={this.handleSaveListSection}
        >
          <DndProvider backend={HTML5Backend}>
            <Row gutter={24}>
              <Col
                span={2}
                style={{ position: 'sticky', top: 0 }}
              >
                <Toolbar
                  handleAddContent={this.onHandleAddContent}
                  handleAddColumn={this.onHandleAddColumn}
                />
              </Col>
              <Col span={22}>
                <Sections
                  listSection={listSection}
                  onChange={this.handleChangeSection}
                />
              </Col>
            </Row>
          </DndProvider>
        </Modal>
      </>
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
