import { Col, Row, Modal } from 'antd';
import React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import {
  ExclamationCircleOutlined,
  DragOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { confirm } = Modal;

const DragContainer = styled.div`
  margin-bottom: 16px;
  overflow: hidden;
  &.selected {
    border: solid 1px blue;
    border-radius: 4px;
  }
  &.sortableHelper {
    z-index: 9999 !important;
  }
`;

const DragItem = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PointerItem = styled.span`
  cursor: pointer;
`;

const DragHandle = sortableHandle(({ content }) => (
  <PointerItem>{content}</PointerItem>
));

export const SortableItem = sortableElement((props) => {
  const {
    children,
    onDeleteSection,
    id,
    isSelected,
    canDelete,
  } = props;

  const handleDeleteSection = () => {
    onDeleteSection(id);
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
        handleDeleteSection();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <DragContainer
      className={
        (isSelected ? 'selected' : '', 'sortableHelper ')
      }
    >
      <DragItem
        style={{ display: !canDelete ? 'none' : '' }}
      >
        <DragHandle content={<DragOutlined />} />
        <DeleteOutlined
          onClick={showConfirmReset}
          style={{ marginLeft: 10 }}
        />
      </DragItem>
      <div>{children}</div>
    </DragContainer>
  );
});

export const SortableItemTwoCol = sortableElement(
  (props) => {
    const { children } = props;

    return (
      <Col span={12} style={{ zIndex: 9999 }}>
        {children}
      </Col>
    );
  },
);

export const SortableContainer = sortableContainer(
  ({ children }) => <div>{children}</div>,
);

export const SortableContainerTwoCol = sortableContainer(
  ({ children }) => <Row gutter={24}>{children}</Row>,
);
