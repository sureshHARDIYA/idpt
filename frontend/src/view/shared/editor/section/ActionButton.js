import {
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { sortableHandle } from 'react-sortable-hoc';
import styled from 'styled-components';
import { EMPTY_TYPE, TYPES_OF_CONTENT } from '../constant';

const { confirm } = Modal;

const DragContainer = styled.div`
  opacity: 1;
  height: 25px;
  margin-bottom: 0;
  display: ${(props) => (props.isEmpty ? 'none' : 'flex')};
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  background-color: white;
  & span {
    font-weight: bold;
  }
  .icon-delete {
    visibility: hidden;
  }
  .sub-icon-delete {
    visibility: hidden;
  }
`;

const Container = styled.div`
  &:hover {
    .icon-delete {
      visibility: visible;
    }
  }

  .sub-content:hover {
    .sub-icon-delete {
      visibility: visible;
    }
  }

  .ant-select {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
`;

const DragHandle = sortableHandle(
  ({ children, className, isEmpty }) => (
    <DragContainer
      style={{ cursor: 'move' }}
      className={className}
      isEmpty={isEmpty}
    >
      {children}
    </DragContainer>
  ),
);

function ActionButton(props) {
  const {
    onDelete,
    children,
    section,
    parentId,
    isContainerContent,
    onSelectSection,
    selectedSection,
    editMode,
  } = props;

  const handleDelete = () => {
    onDelete(section.id, parentId, section.columnPosition);
  };

  const handleSelectedSection = (e) => {
    if (!EMPTY_TYPE.includes(section.type)) {
      e.stopPropagation();
      onSelectSection(
        section.id,
        parentId,
        isContainerContent,
      );
    }
  };

  const checkIsShowActionButton = () => {
    return parentId || !EMPTY_TYPE.includes(section.type);
  };

  const showConfirmReset = (e) => {
    e.stopPropagation();
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure want to delete this section
        </span>
      ),
      onOk: () => {
        handleDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const borderStyle = () => {
    if (
      selectedSection &&
      selectedSection.id === section.id
    ) {
      return 'solid 1px blue';
    }
    return 'solid 1px #e3e3e3';
  };

  const isDisplayDeleteButton = () => {
    if (!editMode) {
      return true;
    } else if (isContainerContent) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container
      onClick={handleSelectedSection}
      type={section.type}
      style={{
        border: borderStyle(),
      }}
      className={cn(
        section.type === TYPES_OF_CONTENT.CONTAINER.value
          ? 'container'
          : '',
        isContainerContent ? 'sub-content' : '',
      )}
    >
      {parentId && !isContainerContent ? (
        <DragHandle
          className={
            checkIsShowActionButton() ? 'drag' : ''
          }
          isEmpty={EMPTY_TYPE.includes(section.type)}
        >
          <span>{section.name || ''}</span>

          <DeleteOutlined
            onClick={showConfirmReset}
            style={{
              marginRight: 5,
              display: isDisplayDeleteButton()
                ? 'initial'
                : 'none',
            }}
            className="icon-delete"
          />
        </DragHandle>
      ) : (
        <DragContainer
          className={cn(
            checkIsShowActionButton() && !isContainerContent
              ? 'drag'
              : '',
          )}
          isEmpty={EMPTY_TYPE.includes(section.type)}
        >
          <span>{section.name || ''}</span>

          <DeleteOutlined
            onClick={showConfirmReset}
            style={{
              marginRight: 5,
              display: isDisplayDeleteButton()
                ? 'initial'
                : 'none',
            }}
            className={
              isContainerContent
                ? 'sub-icon-delete'
                : 'icon-delete'
            }
          />
        </DragContainer>
      )}
      {children}
    </Container>
  );
}

ActionButton.defaultProps = {
  isContainerContent: false,
  onSelectSection: () => {},
};

ActionButton.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isContainerContent: PropTypes.bool,
};

export default ActionButton;
