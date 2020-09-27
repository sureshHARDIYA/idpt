import React, { Component } from 'react';
import { i18n } from 'i18n';
import { Layout, Tabs } from 'antd';
import { connect } from 'react-redux';
import { getHistory } from 'modules/store';
import Breadcrumb from 'view/shared/Breadcrumb';
import PageTitle from 'view/shared/styles/PageTitle';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import actions from 'modules/assignments/form/assignmentsFormActions';
import selectors from 'modules/assignments/form/assignmentsFormSelectors';

import { QuestionDescriptions } from './components/helper';
import QuestionListPanel from './components/QuestionListPanel';
// import SurveyPreview from './components/SurveyPreview';
import EditSurveyPage from './components/EditSurveyPage';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

class AssignmentFormPage extends Component {
  state = {
    dispatched: false,
    questions: [],
  };

  async componentDidMount() {
    const { dispatch, match } = this.props;

    if (this.isEditing()) {
      await dispatch(actions.doFind(match.params.id));
    } else {
      dispatch(actions.doNew());
    }

    this.setState({
      dispatched: true,
      questions: this.props.record.questions || [],
    });
  }

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    if (this.isEditing()) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  isEditing = () => {
    const { match } = this.props;
    return !!match.params.id;
  };

  title = () => {
    return this.isEditing()
      ? i18n('entities.audio.edit.title')
      : i18n('entities.audio.new.title');
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.audio.menu'), '/audio'],
            [this.title()],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{this.title()}</PageTitle>
          <Layout style={{ background: '#fff' }}>
            <Layout style={{ background: '#fff' }}>
              <Content>conent </Content>
            </Layout>
            <Sider
              width={400}
              style={{
                borderLeft: '1px solid #dadada',
                background: '#fff',
                padding: '0 1rem',
              }}
            >
              <Tabs type="card">
                <TabPane tab="Add Question" key="1">
                  <QuestionListPanel />
                </TabPane>
                <TabPane tab="Edit Question" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Edit Survey" key="3">
                  <EditSurveyPage />
                </TabPane>
              </Tabs>
            </Sider>
          </Layout>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(AssignmentFormPage);
