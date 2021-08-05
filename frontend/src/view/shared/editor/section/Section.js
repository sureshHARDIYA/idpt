import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { TYPES_OF_CONTENT } from '../constant';
import ActionButton from './ActionButton';
import render from './renderSection';

const Section = (props) => {
  const { section } = props;

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

  return (
    <ActionButton {...props}>
      {renderSection()}
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
  onChange: PropTypes.func.isRequired,
};

export default Section;
