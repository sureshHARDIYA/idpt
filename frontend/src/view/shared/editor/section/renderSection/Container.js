import React from 'react';
import { DropTarget } from 'react-dnd';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  border: 1px solid;
  min-height: 50;
  border-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #bdeaff;
`;

const fullColumnTarget = {
  drop(props) {
    const { sectionId, subSectionId, columnType } = props;

    return {
      name: 'fullColumnTarget',
      sectionId: sectionId,
      subSectionId: subSectionId,
      columnType: columnType,
    };
  },
};

const Container = DropTarget(
  'full-column',
  fullColumnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)((props) => {
  const { connectDropTarget } = props;
  const xhtml = connectDropTarget(
    <div
      style={{
        height: 100,
        padding: 5,
      }}
    >
      <ContainerStyle>
        <span>Drag & drop content to container</span>
      </ContainerStyle>
    </div>,
  );
  return xhtml;
});

export const ContainerWrapper = DropTarget(
  'full-column',
  fullColumnTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)((props) => {
  const { connectDropTarget, children } = props;
  const xhtml = connectDropTarget(
    <div style={{ padding: 5 }}>{children}</div>,
  );
  return xhtml;
});

export default Container;
