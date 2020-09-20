import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PatientView from 'view/patient/view/PatientView';
import { i18n } from 'i18n';
import actions from 'modules/patient/view/patientViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/patient/view/patientViewSelectors';
import authSelectors from 'modules/auth/authSelectors';
import { Tabs, Button, Icon, Divider } from 'antd';
import TextViewItem from 'view/shared/view/TextViewItem';

const { TabPane } = Tabs;

class PatientPage extends Component {
  state = {
    activeTab: '1',
    max: 4,
    isDisabled: false,
  };

  // componentDidMount() {
  //   const { dispatch, match } = this.props;
  //   dispatch(actions.doFind(match.params.id));
  // }

  changeTab = (activeKey) => {
    this.setState({
      activeTab: activeKey,
    });
  };

  forwardClick = () => {
    const currentId = parseInt(this.state.activeTab, 10);

    this.setState({
      activeTab: (currentId + 1).toString(),
      disabled: false,
    });
  };

  previousClick = () => {
    const currentId = parseInt(this.state.activeTab, 10);

    if (currentId === 1) {
      this.setState({
        disabled: true,
      });
    }

    this.setState({
      activeTab: (currentId - 1).toString(),
    });
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.patient.menu'), '/patient'],
            [i18n('entities.patient.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.patient.view.module')}
            <span className="ant-typography">
              <code>
                {this.props.currentUser &&
                  this.props.currentUser.fullName}
              </code>
            </span>
          </PageTitle>
          <Tabs
            tabPosition="right"
            activeKey={this.state.activeTab}
            onChange={this.changeTab}
          >
            <TabPane tab="Information" key="1">
              Content for tab 1
            </TabPane>
            <TabPane tab="List of cases" key="2">
              Content for tab 2
            </TabPane>
            <TabPane tab="List of modules" key="3">
              Content of Tab 3
            </TabPane>
            <TabPane tab="List of tasks" key="4">
              Content of Tab 4
            </TabPane>
            <Divider dashed />
            <Button.Group
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                type="primary"
                onClick={this.previousClick}
                disabled={
                  this.state.isDisabled ||
                  this.state.activeTab === '1'
                }
              >
                <Icon type="left" />
                Backward
              </Button>
              <Button
                type="primary"
                onClick={this.forwardClick}
                disabled={
                  this.state.activeTab ===
                  this.state.max.toString()
                }
              >
                Forward
                <Icon type="right" />
              </Button>
            </Button.Group>
          </Tabs>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    currentUser: authSelectors.selectCurrentUser(state),
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(PatientPage);
