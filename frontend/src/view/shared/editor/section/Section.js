import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { TYPES_OF_CONTENT } from '../constant';
import render from './renderSection';
import ActionButton from './ActionButton';

const Section = (props) => {
  const {
    section,
    parentId,
    onSelectSection,
    isContainerContent,
    selectedSection,
  } = props;

  const handleSelectedSection = (e) => {
    e.stopPropagation();
    onSelectSection(
      section.id,
      parentId,
      isContainerContent,
    );
  };

  const renderSection = useCallback(() => {
    switch (section.type) {
      case TYPES_OF_CONTENT.TEXT.value:
        return render.text({
          ...props,
        });

      case TYPES_OF_CONTENT.IMAGE.value:
        return render.image({
          ...props,
        });

      case TYPES_OF_CONTENT.AUDIO.value:
        return render.audio({
          ...props,
        });

      case TYPES_OF_CONTENT.VIDEO.value:
        return render.video({
          ...props,
        });

      case TYPES_OF_CONTENT.ASSIGNMENT.value:
        return render.assignment({
          ...props,
        });

      case TYPES_OF_CONTENT.CONTAINER.value:
        return render.container({
          ...props,
        });

      case TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value:
      case TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value:
      case TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value:
      case TYPES_OF_CONTENT.EMPTY_TWO_COLUMN.value:
        return render.empty({ ...props });

      default:
        return null;
    }
  }, [props]);

  const borderStyle = () => {
    if (
      selectedSection &&
      selectedSection.id === section.id
    ) {
      return 'solid 1px red';
    }
    return 'solid 1px #76affc';
  };

  return (
    <ActionButton {...props}>
      <div
        style={{
          border: borderStyle(),
        }}
        onClick={handleSelectedSection}
        className={
          section.type === TYPES_OF_CONTENT.CONTAINER.value
            ? 'container'
            : ''
        }
      >
        {renderSection()}
      </div>
    </ActionButton>
  );
};

Section.defaultProps = {
  parentId: '',
  isContainerContent: false,
  selectedSection: {},
};

Section.propTypes = {
  section: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  onSelectSection: PropTypes.func.isRequired,
  isContainerContent: PropTypes.bool,
  selectedSection: PropTypes.object,
};

export default Section;
