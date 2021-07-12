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
      visible: true,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  onDeleteAllSection = () => {
    const { form } = this.props;
    this.setState({ listSection: [] });
    form.setFieldValue('listSection', []);
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
    const { form } = this.props;
    this.setState({ listSection });
    form.setFieldValue('listSection', listSection);
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

  toggleModal = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { listSection } = this.state;
    const { form } = this.props;
    return (
      <>
        <Button onClick={this.toggleModal}>
          Edit description
        </Button>
        <Modal
          width="95%"
          visible={this.state.visible}
          onCancel={this.toggleModal}
        >
          <DndProvider backend={HTML5Backend}>
            <Row gutter={24}>
              <Col span={2}>
                <Toolbar
                  handleAddContent={this.onHandleAddContent}
                  handleAddColumn={this.onHandleAddColumn}
                />
              </Col>
              <Col span={22}>
                <Sections
                  listSection={listSection}
                  onChange={this.handleChangeSection}
                  form={form}
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

// import React from 'react';
// import { i18n } from 'i18n';
// import { v4 as uuidv4 } from "uuid";
// import { Button, Col, Row } from 'antd';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import FilterWrapper from 'view/shared/styles/FilterWrapper';

// import Section from '../section';
// import AddContentNavbar from '../addContentNavbar';
// import { COLUMN_TYPES, TYPES_OF_CONTENT } from '../constanst';

// const MainPageEditor = ({
//   loading
// }) => {
//   const [listSection, setListSection] = React.useState([]);

//   React.useEffect(() => {}, [listSection]);

//   const onHandleAddContent = (type, columnType) => {
//     console.log('columnType: ', columnType);
//     const newListSection = listSection;
//     let columnSection = null;
//     if (columnType === COLUMN_TYPES.ONE_COLUMN) {
//       columnSection = {
//         id: uuidv4(),
//         columnType,
//         value: null,
//         type,
//       };
//     }
//     newListSection.push(columnSection);
//     setListSection(newListSection);
//   }

//   console.log('xxxxxxlistSection: ', listSection);
//   const renderListSection = React.useMemo(() => (
//     <Section
//       listSection={listSection}
//     />
//   ), [listSection]);

//   return (
//     <FilterWrapper>
//       <DndProvider backend={HTML5Backend}>
//         <Row gutter={24}>
//           <Col lg={22} md={22}>
//             {/* {renderListSection} */}
//             <Section
//               listSection={listSection}
//             />
//           </Col>
//           <Col lg={2} md={2}>
//             <AddContentNavbar
//               handleDrag={() => {}}
//               handleEndDrag={() => {}}
//               handleAddContent={onHandleAddContent}
//               setWrapperRefAddContent={() => {console.log('setWrapperRefAddContent');}}
//             />
//           </Col>
//         </Row>
//       </DndProvider>
//       <Row gutter={24}>
//         <Col lg={12} md={12}>
//           <Button
//             loading={loading}
//             onClick={() => {}}
//             icon="undo"
//           >
//             {i18n('common.reset')}
//           </Button>
//         </Col>
//         <Col lg={12} md={12}>
//           <Button
//             loading={loading}
//             icon="save"
//             type="primary"
//             htmlType="submit"
//           >
//             {i18n('common.save')}
//           </Button>
//         </Col>
//       </Row>
//     </FilterWrapper>
//   );
// };

// MainPageEditor.defaultProps = {

// };

// export default MainPageEditor;
