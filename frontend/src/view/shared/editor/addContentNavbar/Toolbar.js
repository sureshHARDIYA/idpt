import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { COLUMN_TYPES } from '../constant';
import { controls } from './controls';
import DragItem from './DragItem';

const ToolbarContainer = styled.div`
  background-color: white;
  margin-top: 15px;
  border: solid 1px #e3e3e3;
`;

const ToolbarWrapper = styled.div`
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07);
  background-color: white;
  height: auto;
  overflow-y: hidden;
  display: block;
  padding: 10px 0;
`;

const ContentTypeContainer = styled.div`
  margin: auto;
  display: block;
`;

const TopContent = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const BottomContent = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

const AddColumnContainer = styled.div`
  text-align: center;
`;

const AddColumnButton = styled.div`
  padding: 0 10px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  & p {
    text-align: center;
    font-size: 13px;
    margin: 0;
  }
`;

const Icon = styled.img`
  height: 25px;
  width: 25px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Toolbar = (props) => {
  const { handleAddColumn, handleAddContent } = props;

  return (
    <ToolbarContainer>
      <ToolbarWrapper>
        <ContentTypeContainer>
          <Row justify="space-between">
            <Col span={9}>
              <TopContent>
                <AddColumnButton
                  onClick={() =>
                    handleAddColumn(COLUMN_TYPES.ONE_COLUMN)
                  }
                >
                  <AddColumnContainer>
                    <Icon
                      src={require('assets/images/ic_one_col.svg')}
                      alt="one_column"
                    />
                    <p>One column</p>
                  </AddColumnContainer>
                </AddColumnButton>

                <AddColumnButton
                  onClick={() =>
                    handleAddColumn(
                      COLUMN_TYPES.TWO_COLUMNS,
                    )
                  }
                >
                  <AddColumnContainer>
                    <Icon
                      src={require('assets/images/ic_two_col.svg')}
                      alt="two_column"
                    />
                    <p>Two column</p>
                  </AddColumnContainer>
                </AddColumnButton>
              </TopContent>
            </Col>
            <Col span={15}>
              <BottomContent>
                {controls.map((control) => (
                  <IconWrapper key={control.key}>
                    <DragItem
                      {...control}
                      title={control.title}
                      handleAddContent={handleAddContent}
                    />
                  </IconWrapper>
                ))}
              </BottomContent>
            </Col>
          </Row>
        </ContentTypeContainer>
      </ToolbarWrapper>
    </ToolbarContainer>
  );
};

Toolbar.propTypes = {
  handleAddColumn: PropTypes.func.isRequired,
  handleAddContent: PropTypes.func.isRequired,
};

export default Toolbar;
