import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import { Popover, Modal } from 'antd';
import SliderStyle from './InputStyle/SliderStyle';
import ColorStyle from './InputStyle/ColorStyle';
import { TYPES_OF_CONTENT } from '../constant';

function PopoverChangeStyles(props) {
  const {
    children,
    value,
    onChange,
    section,
    parentId,
  } = props;
  const [visible, setVisible] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [style, setStyle] = useState({});
  const styleRef = useRef(null);
  styleRef.current = style;

  const childProps = children.props;

  const openModal = useCallback(() => {
    setIsOpenModal(true);
    hidePopover();
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const hidePopover = useCallback(() => {
    setVisible(false);
  }, []);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (childProps.section.value && !isOpenModal) {
      setVisible(true);
    }
  };

  const handleChangeStyles = useCallback(
    (prop, styleValue) => {
      setStyle((prevState) => ({
        ...prevState,
        [prop]: styleValue,
      }));
    },
    [],
  );

  const handleSave = () => {
    onChange(
      section.id,
      section.value,
      parentId,
      section.columnPosition,
      { style: styleRef.current },
    );
    closeModal();
  };

  const renderStylesModal = useCallback(() => {
    return (
      <Modal
        title="Change style"
        visible={isOpenModal}
        onOk={handleSave}
        onCancel={closeModal}
        centered
        width={700}
      >
        <SliderStyle
          title="Padding"
          styleProp="padding"
          onChange={handleChangeStyles}
          sectionStyle={section.style}
        />
        <SliderStyle
          title="Margin"
          styleProp="margin"
          onChange={handleChangeStyles}
          sectionStyle={section.style}
        />
        <ColorStyle
          onChange={handleChangeStyles}
          sectionStyle={section.style}
          styleProp="backgroundColor"
          title="Background Color"
        />
        {section.type === TYPES_OF_CONTENT.TEXT.value ? (
          <ColorStyle
            onChange={handleChangeStyles}
            sectionStyle={section.style}
            styleProp="color"
            title="Color"
          />
        ) : null}
      </Modal>
    );
  }, [value, onChange, isOpenModal]);

  const renderStylesButton = useCallback(() => {
    return (
      <div onClick={openModal}>
        <span style={{ cursor: 'pointer' }}>Styles</span>
      </div>
    );
  }, [onChange, value]);

  return (
    <div onContextMenu={handleRightClick}>
      <Popover
        visible={visible}
        content={renderStylesButton()}
        placement="bottom"
      >
        {children}
      </Popover>
      {renderStylesModal()}
    </div>
  );
}

PopoverChangeStyles.propTypes = {};

export default PopoverChangeStyles;
