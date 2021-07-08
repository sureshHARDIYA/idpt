import React from "react";
import PropTypes from "prop-types";
import {
  FullColumnPlaceholder,
  LeftColumnPlaceholder,
  RightColumnPlaceholder
} from "../dndPlaceholder";
import { TYPES_OF_CONTENT } from "../../constant";


const Empty = props => {
  const { section, parentId } = props;

  switch (section.type) {
    case TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value:
      return (
        <FullColumnPlaceholder
          key={section.id}
          sectionId={section.id}
          columnType={section.columnType}
        />
      );

    case TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value:
      return (
        <LeftColumnPlaceholder
          key={section.id}
          sectionId={parentId}
          columnType={section.columnPosition}
          subSectionId={section.id}
        />
      );

    case TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value:
      return (
        <RightColumnPlaceholder
          key={section.id}
          sectionId={parentId}
          columnType={section.columnPosition}
          subSectionId={section.id}
        />
      );

    default:
      return null;
  }
};

Text.defaultProps = {
  parentId: ""
};

Empty.propTypes = {
  parentId: PropTypes.string,
  section: PropTypes.object.isRequired,
};

const renderEmpty = props => {
  return <Empty {...props} />;
};

export default renderEmpty;
