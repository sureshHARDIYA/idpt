import React from 'react';
import PropTypes from 'prop-types';
import { sortableHandle } from 'react-sortable-hoc';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import styled from 'styled-components';
import { TYPES_OF_CONTENT } from '../constant';
import cn from 'classnames';

const { confirm } = Modal;

const DragContainer = styled.div`
  background-color: gray;
  opacity: 0.7;
  height: 25px;
  visibility: hidden;
  margin-bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Container = styled.div`
  &:hover {
    .drag {
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
  ({ children, className }) => (
    <DragContainer style={{ cursor: 'pointer' }} className={className}>
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
  } = props;

  const handleDelete = () => {
    onDelete(section.id, parentId, section.columnPosition);
  };

  const checkIsShowActionButton = () => {
    return (
      parentId ||
      (section.type !==
        TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value &&
        section.type !==
          TYPES_OF_CONTENT.EMPTY_TWO_COLUMN.value &&
        section.type !==
          TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value &&
        section.type !==
          TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value)
    );
  };

  const showConfirmReset = () => {
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

  return (
    <Container>
      {parentId && !isContainerContent ? (
        <DragHandle
          className={
            checkIsShowActionButton() ? 'drag' : ''
          }
        >
          <DeleteOutlined
            onClick={showConfirmReset}
            style={{ marginRight: 5, color: 'white' }}
          />
        </DragHandle>
      ) : (
        <DragContainer
          className={cn(
            checkIsShowActionButton() && !isContainerContent
              ? 'drag'
              : '',
            isContainerContent ? 'sub-content' : '',
          )}
        >
          <DeleteOutlined
            onClick={showConfirmReset}
            style={{ marginRight: 5, color: 'white' }}
          />
        </DragContainer>
      )}
      {children}
    </Container>
  );
}

ActionButton.defaultProps = {
  isContainerContent: false,
};

ActionButton.propTypes = {
  section: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  isContainerContent: PropTypes.bool,
};

export default ActionButton;
