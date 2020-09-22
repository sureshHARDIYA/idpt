import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import actions from 'modules/roadmap/view/roadmapViewActions';
import selectors from 'modules/roadmap/view/roadmapViewSelectors';
import _get from 'lodash/get';
import { Button, Divider, Icon, Tabs } from 'antd';

class RecordRoadmapPage extends Component {
  state = {
    activeTab: '1',
    max: 4,
    isDisabled: false,
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  createMarkup(description) {
    return { __html: description };
  }

  getDescription(description) {
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(
          description,
        )}
      />
    );
  }

  get tabs() {
    return _get(this.props.roadmap, 'children', []).map((task) => task.host.name);
  }

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
    const { roadmap } = this.props;
    const casedName = _get(roadmap, 'record.host.name');
    console.log('roadmap:', roadmap)

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/program'],
            !!casedName && [casedName, `/program/${_get(roadmap, 'record.id')}`],
            [i18n('entities.record.module.title')],
          ].filter(i => i)}
        />
        <ContentWrapper>
          <Tabs
            tabPosition="right"
            onChange={this.changeTab}
            activeKey={this.state.activeTab}
          >
            {_get(roadmap, 'children', []).map((task, index) => (
              <Tabs.TabPane tab={_get(task, 'host.name')} key={(index + 1).toString()}>
                <h1>{task.host.name}</h1>
                {this.getDescription(task.host.description)}
              </Tabs.TabPane>
            ))}
          </Tabs>
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
                  this.tabs.length.toString()
                }
              >
                Forward
                <Icon type="right" />
              </Button>
            </Button.Group>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const select = (state) => ({
  roadmap: selectors.selectRecord(state),
  loading: selectors.selectLoading(state),
})

export default connect(select)(RecordRoadmapPage);
