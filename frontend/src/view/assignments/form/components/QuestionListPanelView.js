import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuestionListPanelWrapper = styled.div`
  margin: 10px 0;
  padding: 5px;
`;

const QuestionListWrapper = styled.div`
  overflow: hidden;
`;

const QuestionListLink = styled.a`
  margin: 1%;
  float: none;
  width: 48%;
`;

class QuestionListPanel extends React.Component {
  render() {
    let { questions, dispatch } = this.props;
    return (
      <QuestionListPanelWrapper>
        <h4>Questions</h4>
        <QuestionListWrapper>
          {questions.map((question) => {
            return (
              <QuestionListLink
                key={question.text}
                href="#"
                className="ant-btn"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(question.action());
                }}
              >
                {question.text}
              </QuestionListLink>
            );
          })}
        </QuestionListWrapper>
      </QuestionListPanelWrapper>
    );
  }
}

QuestionListPanel.propTypes = {
  questions: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};
QuestionListPanel.defaultProps = {};

export default QuestionListPanel;
