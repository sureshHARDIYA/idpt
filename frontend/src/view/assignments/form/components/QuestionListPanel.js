import { connect } from 'react-redux';
import actions from 'modules/assignments/form/assignmentsFormActions';
import { QuestionDescriptions } from './helper';
import QuestionListPanelView from './QuestionListPanelView';

export default connect(() => {
  return {
    questions: QuestionDescriptions.map((q) => {
      return {
        text: q.text,
        action: () => actions.addQuestion(q.type),
      };
    }),
  };
})(QuestionListPanelView);
