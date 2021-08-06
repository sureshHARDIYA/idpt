import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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

  .hidden {
    visibility: hidden;
  }
`;

const Delete = styled.span`
  margin-right: 5px;
  display: inline-block;
  cursor: pointer;
  color: #ff4d4f;
`;

const Edit = styled.span`
  margin-right: 15px;
  display: inline-block;
  cursor: pointer;
  color: #1890ff;
`;

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

  const handleClickSection = (e) => {
    if (!section.value || editMode) {
      handleSelectedSection(e);
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

  const checkDisplayDeleteButton = () => {
    if (!editMode || isContainerContent) {
      return true;
    }
    return false;
  };

  const checkDisplayEditButton = () => {
    if (editMode) {
      return false;
    }
    return true;
  };

  const getEditClassName = () => {
    if (section.value !== null) {
      return isContainerContent
        ? 'sub-icon-delete'
        : 'icon-delete';
    }
    return 'hidden';
  };

  return (
    <Container
      onClick={handleClickSection}
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
      <DragContainer
        className={cn(
          checkIsShowActionButton() && !isContainerContent
            ? 'drag'
            : '',
        )}
        isEmpty={EMPTY_TYPE.includes(section.type)}
      >
        <span>{section.name || ''}</span>
        <div>
          <Edit
            onClick={handleSelectedSection}
            style={{
              display: checkDisplayEditButton()
                ? 'initial'
                : 'none',
            }}
            className={getEditClassName()}
          >
            Edit
          </Edit>
          <Delete
            onClick={showConfirmReset}
            style={{
              display: checkDisplayDeleteButton()
                ? 'initial'
                : 'none',
            }}
            className={
              isContainerContent
                ? 'sub-icon-delete'
                : 'icon-delete'
            }
          >
            Delete
          </Delete>
        </div>
      </DragContainer>
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
