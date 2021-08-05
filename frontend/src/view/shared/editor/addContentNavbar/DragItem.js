import React from 'react';
import { DragSource } from 'react-dnd';
import styled from 'styled-components';

const DragItem = ({ title, imgSrc, connectDragSource }) => {
  return (
    <IconContainer ref={connectDragSource}>
      <img src={imgSrc} alt={title} />
      <p>{title}</p>
    </IconContainer>
  );
};

export default DragSource(
  'full-column',
  {
    beginDrag: (props) => {
      return { name: props.name };
    },
    endDrag(props, monitor) {
      const { handleAddContent, addType } = props;
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const {
          sectionId,
          subSectionId,
          columnType,
        } = dropResult;
        handleAddContent &&
          handleAddContent(
            addType,
            sectionId,
            subSectionId,
            columnType,
          );
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(DragItem);

const IconContainer = styled.div`
  cursor: pointer;
  img {
    width: 25px;
  }
  p {
    text-align: center;
    margin: 0;
  }
`;
