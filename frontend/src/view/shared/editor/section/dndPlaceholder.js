import React from "react";
import { DropTarget } from "react-dnd";

const fullColumnTarget = {
  drop(props) {
    const {sectionId, subSectionId, columnType} = props;
    
    return { name: "fullColumnTarget", sectionId: sectionId, subSectionId: subSectionId, columnType: columnType };
  },
};

const leftColumnTarget = {
  drop(props) {
    const {sectionId, subSectionId, columnType} = props;
    
    return { name: "leftColumnTarget", sectionId: sectionId, subSectionId: subSectionId, columnType: columnType };
  },
};
const rightColumnTarget = {
  drop(props) {
    const {sectionId, subSectionId, columnType} = props;
    
    return { name: "rightColumnTarget", sectionId: sectionId, subSectionId: subSectionId, columnType: columnType };
  },
};

const borderStyle = {
  border: "1px dashed",
  height: 50,
  borderColor: "gray",
  display: "flex",
  justifyContent:"center",
  alignItems: "center"
};

export const FullColumnPlaceholder = DropTarget("full-column", fullColumnTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))((props)=>{
  const { connectDropTarget, isDragging } = props;
  const xhtml = connectDropTarget(
    <div style={{ height: 50, opacity: isDragging ? 1 : 0.5 }}>
      <div style={borderStyle}><span>Drag & drop content here</span></div>
    </div>
  )
  return xhtml;
});


 export const LeftColumnPlaceholder = DropTarget("full-column", leftColumnTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))((props)=>{
  const {connectDropTarget, isDragging } = props;
  const xhtml = connectDropTarget(
    <div style={{ height: 50, opacity: isDragging ? 1 : 0.5 }}>
      <div style={ borderStyle }><span>Drag & drop content here</span></div>
    </div>
  )
  return xhtml;
});

 export const RightColumnPlaceholder = DropTarget("full-column", rightColumnTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))((props)=>{
  const {connectDropTarget, isDragging} = props;
  
  const xhtml = connectDropTarget(
    <div style={{ height: 50, opacity: isDragging ? 1 : 0.5 }}>
      <div style={ borderStyle }><span>Drag & drop content here</span></div>
    </div>
  )
  return xhtml;
});