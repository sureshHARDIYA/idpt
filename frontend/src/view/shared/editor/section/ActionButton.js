import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { sortableHandle } from 'react-sortable-hoc';
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import styled from 'styled-components';
import { EMPTY_TYPE } from '../constant';
import cn from 'classnames';

const { confirm } = Modal;

const DragContainer = styled.div`
  background-color: gray;
  opacity: 1;
  height: 25px;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  color: white;
`;

const Container = styled.div`
  .drag {
    visibility: visible;
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
    <DragContainer
      style={{ cursor: 'move' }}
      className={className}
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
  } = props;
  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () =>
      window.removeEventListener(
        'click',
        handleClickOutside,
      );
  }, []);

  const handleClickOutside = (e) => {
    const styles = document.querySelector(
      '.style-component',
    );
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target) &&
      styles &&
      !styles.contains(e.target)
    ) {
      onSelectSection();
    }
  };

  const handleDelete = () => {
    onDelete(section.id, parentId, section.columnPosition);
  };

  const handleSelectedSection = (e) => {
    e.stopPropagation();
    onSelectSection(
      section.id,
      parentId,
      isContainerContent,
    );
  };

  const checkIsShowActionButton = () => {
    return parentId || !EMPTY_TYPE.includes(section.type);
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
    <Container
      ref={wrapperRef}
      onClick={handleSelectedSection}
      type={section.type}
    >
      {parentId && !isContainerContent ? (
        <DragHandle
          className={
            checkIsShowActionButton() ? 'drag' : ''
          }
        >
          <span>{section.name || ''}</span>
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
          <span>{section.name || ''}</span>
          <DeleteOutlined
            onClick={showConfirmReset}
            style={{
              marginRight: 5,
              color: 'white',
              display: EMPTY_TYPE.includes(section.type)
                ? 'none'
                : 'initial',
            }}
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
