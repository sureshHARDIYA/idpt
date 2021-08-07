import { Col, Row } from 'antd';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  COLUMN_TYPES,
  TWO_COLUMN_TYPES,
  TYPES_OF_CONTENT,
} from '../constant';
import EditingModal from './EditingModal';
import Section from './Section';
import {
  SortableContainer,
  SortableContainerTwoCol,
  SortableItem,
  SortableItemTwoCol,
} from './Sortable';

const Sections = (props) => {
  const { listSection, onChange } = props;
  const listSectionRef = useRef(null);
  listSectionRef.current = listSection;
  const [selectedSection, setSelectedSection] = useState(
    {},
  );

  const colIndex = useMemo(() => {
    return {
      left: 0,
      right: 1,
    };
  }, []);

  const deepComparison = useCallback(
    (prevValue, nextValue) => {
      return (
        JSON.stringify(prevValue) ===
        JSON.stringify(nextValue)
      );
    },
    [],
  );

  const handleSelectSection = (
    id,
    parentId,
    isContainerContent,
  ) => {
    mapSelectedSection(id, parentId, isContainerContent);
  };

  const mapSelectedSection = (
    id,
    parentId,
    isContainerContent,
  ) => {
    const cloneListSection = cloneDeep(
      listSectionRef.current,
    );
    const sectionIndex = parentId
      ? cloneListSection.findIndex(
          (section) => section.id === parentId,
        )
      : cloneListSection.findIndex(
          (section) => section.id === id,
        );
    if (sectionIndex >= 0) {
      const sectionEditing = cloneListSection[sectionIndex];
      if (parentId) {
        if (
          sectionEditing.type ===
          TYPES_OF_CONTENT.CONTAINER.value
        ) {
          sectionEditing.value.forEach((section) => {
            if (section.id === id) {
              section.parentId = sectionEditing.id;
              section.isContainerContent = isContainerContent;
              setSelectedSection(section);
            }
          });
        } else if (
          sectionEditing.columnType ===
          COLUMN_TYPES.TWO_COLUMNS
        ) {
          if (sectionEditing.leftContent.id === id) {
            sectionEditing.leftContent.parentId =
              sectionEditing.id;
            sectionEditing.leftContent.isContainerContent = isContainerContent;
            setSelectedSection(sectionEditing.leftContent);
          } else if (
            sectionEditing.rightContent.id === id
          ) {
            sectionEditing.rightContent.parentId =
              sectionEditing.id;
            sectionEditing.rightContent.isContainerContent = isContainerContent;
            setSelectedSection(sectionEditing.rightContent);
          }
        }
      } else {
        setSelectedSection(sectionEditing);
      }
    } else {
      setSelectedSection({});
    }
  };

  const handleSort = useCallback(
    (e) => {
      const cloneListSection = cloneDeep(listSection);
      const { oldIndex, newIndex } = e;
      const movingSection = cloneListSection[oldIndex];

      cloneListSection.splice(oldIndex, 1);
      cloneListSection.splice(newIndex, 0, movingSection);

      !deepComparison(listSection, cloneListSection) &&
        onChange(cloneListSection);
    },
    [listSection],
  );

  const handleDeleteSection = useCallback(
    (sectionId) => {
      const cloneListSection = cloneDeep(listSection);
      const index = cloneListSection.findIndex(
        (section) => section.id === sectionId,
      );
      if (index > -1) {
        cloneListSection.splice(index, 1);
      }

      onChange(cloneListSection);
    },
    [listSection],
  );

  const handleSortChildPage = useCallback(
    (e, sectionId) => {
      const cloneListSection = cloneDeep(listSection);
      const index = cloneListSection.findIndex(
        (section) => section.id === sectionId,
      );
      const { oldIndex, newIndex } = e;

      if (index > -1 && oldIndex !== newIndex) {
        const cloneContent = cloneDeep(
          cloneListSection[index],
        );

        cloneContent.leftContent.columnPosition =
          TWO_COLUMN_TYPES.RIGHT;
        cloneContent.rightContent.columnPosition =
          TWO_COLUMN_TYPES.LEFT;

        if (
          cloneContent.leftContent.type ===
          TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value
        ) {
          cloneContent.leftContent.type =
            TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value;
        }

        if (
          cloneContent.rightContent.type ===
          TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value
        ) {
          cloneContent.rightContent.type =
            TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value;
        }

        const temp = cloneDeep(cloneContent.leftContent);

        cloneContent.leftContent =
          cloneContent.rightContent;
        cloneContent.rightContent = temp;

        cloneListSection[index] = cloneContent;
      }

      !deepComparison(listSection, cloneListSection) &&
        onChange(cloneListSection);
    },
    [listSection],
  );

  const handleDeleteContent = useCallback(
    (sectionId, parentId, columnPosition) => {
      const cloneListSection = cloneDeep(listSection);
      if (columnPosition) {
        const index = cloneListSection.findIndex(
          (section) => section.id === parentId,
        );
        if (index > -1) {
          if (columnPosition === TWO_COLUMN_TYPES.RIGHT) {
            cloneListSection[index].rightContent.type =
              TYPES_OF_CONTENT.EMPTY_RIGHT_COLUMN.value;
            cloneListSection[
              index
            ].rightContent.value = null;
            cloneListSection[index].rightContent.style = {};
            cloneListSection[index].rightContent.name = '';
          }

          if (columnPosition === TWO_COLUMN_TYPES.LEFT) {
            cloneListSection[index].leftContent.type =
              TYPES_OF_CONTENT.EMPTY_LEFT_COLUMN.value;
            cloneListSection[
              index
            ].leftContent.value = null;
            cloneListSection[index].leftContent.style = {};
            cloneListSection[index].leftContent.name = '';
          }
        }
      } else {
        const index = cloneListSection.findIndex(
          (x) => x.id === sectionId,
        );
        if (index > -1) {
          cloneListSection[index].type =
            TYPES_OF_CONTENT.EMPTY_ONE_COLUMN.value;
          cloneListSection[index].value = null;
          cloneListSection[index].style = {};
          cloneListSection[index].name = '';
        }
      }

      onChange(cloneListSection);
    },
    [listSection],
  );

  const handleChangeContentSection = useCallback(
    (
      sectionId,
      value,
      parentId,
      columnPosition,
      additionalProps,
      isContainerContent,
    ) => {
      const cloneListSection = cloneDeep(listSection);
      const sectionIndex = parentId
        ? cloneListSection.findIndex(
            (section) => section.id === parentId,
          )
        : cloneListSection.findIndex(
            (section) => section.id === sectionId,
          );

      if (sectionIndex > -1) {
        const sectionEditing =
          cloneListSection[sectionIndex];

        if (columnPosition) {
          //two column
          if (columnPosition === TWO_COLUMN_TYPES.LEFT) {
            sectionEditing.leftContent.value = value;
            if (additionalProps) {
              const mergedProps = {
                ...sectionEditing.leftContent,
                ...additionalProps,
              };
              sectionEditing.leftContent = mergedProps;
            }
          } else {
            sectionEditing.rightContent.value = value;
            if (additionalProps) {
              const mergedProps = {
                ...sectionEditing.rightContent,
                ...additionalProps,
              };
              sectionEditing.rightContent = mergedProps;
            }
          }
        } else {
          //one column
          if (
            sectionEditing.type ===
              TYPES_OF_CONTENT.CONTAINER.value &&
            isContainerContent
          ) {
            sectionEditing.value.forEach((subContent) => {
              if (subContent.id === sectionId) {
                subContent.value = value;
                if (additionalProps) {
                  Object.assign(
                    subContent,
                    additionalProps,
                  );
                }
              }
            });
          } else {
            sectionEditing.value = value;
            if (additionalProps) {
              Object.assign(
                sectionEditing,
                additionalProps,
              );
            }
          }
        }
      }

      onChange(cloneListSection);
    },
    [listSection],
  );

  return (
    <SectionContainer>
      <Row gutter={20}>
        <Col span={24}>
          <SortableContainer
            axis="y"
            useDragHandle
            onSortEnd={handleSort}
            transitionDuration={300}
          >
            {listSection &&
              listSection.map((section, index) => {
                switch (section.columnType) {
                  case COLUMN_TYPES.ONE_COLUMN:
                    if (!section.canDelete) {
                      return (
                        <Section
                          key={section.id}
                          section={section}
                          onChange={
                            handleChangeContentSection
                          }
                          onDelete={handleDeleteContent}
                          onSelectSection={
                            handleSelectSection
                          }
                          selectedSection={selectedSection}
                        />
                      );
                    }
                    return (
                      <SortableItem
                        id={section.id}
                        key={section.id}
                        onDeleteSection={
                          handleDeleteSection
                        }
                        index={index}
                        canDelete={section.canDelete}
                      >
                        <Section
                          section={section}
                          onChange={
                            handleChangeContentSection
                          }
                          onDelete={handleDeleteContent}
                          onSelectSection={
                            handleSelectSection
                          }
                          editMode={false}
                        />
                      </SortableItem>
                    );

                  case COLUMN_TYPES.TWO_COLUMNS:
                    return (
                      <SortableItem
                        id={section.id}
                        key={section.id}
                        onDeleteSection={
                          handleDeleteSection
                        }
                        index={index}
                        canDelete={section.canDelete}
                      >
                        <SortableContainerTwoCol
                          axis="x"
                          useDragHandle
                          onSortEnd={(e) =>
                            handleSortChildPage(
                              e,
                              section.id,
                            )
                          }
                          transitionDuration={300}
                          pressDelay={100}
                        >
                          <SortableItemTwoCol
                            index={colIndex.left}
                            key={section.leftContent.id}
                          >
                            <Section
                              section={section.leftContent}
                              onChange={
                                handleChangeContentSection
                              }
                              parentId={section.id}
                              onDelete={handleDeleteContent}
                              onSelectSection={
                                handleSelectSection
                              }
                              editMode={false}
                            />
                          </SortableItemTwoCol>
                          <SortableItemTwoCol
                            index={colIndex.right}
                            key={section.rightContent.id}
                          >
                            <Section
                              section={section.rightContent}
                              onChange={
                                handleChangeContentSection
                              }
                              parentId={section.id}
                              onDelete={handleDeleteContent}
                              onSelectSection={
                                handleSelectSection
                              }
                              editMode={false}
                            />
                          </SortableItemTwoCol>
                        </SortableContainerTwoCol>
                      </SortableItem>
                    );

                  default:
                    return null;
                }
              })}
          </SortableContainer>
        </Col>
        <EditingModal
          section={selectedSection}
          visible={!!selectedSection.id}
          handleSelectSection={handleSelectSection}
          onChange={handleChangeContentSection}
        />
      </Row>
    </SectionContainer>
  );
};

Sections.defaultProps = {
  listSection: [],
};

Sections.propTypes = {
  listSection: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default Sections;

const SectionContainer = styled.div`
  margin-top: 30px;
`;
