import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {twoColumnsResponsiveProps} from 'view/shared/styles/ResponsiveProps';
import {Card, Col, Row} from "antd";

import selectors from 'modules/task/graph/taskGraphSelectors';
import destroySelectors from 'modules/task/destroy/taskDestroySelectors';
import actions from "../../../modules/task/graph/taskGraphActions";

import casedGraphSelectors from "../../../modules/cased/graph/casedGraphSelectors";
import moduleGraphSelectors from "../../../modules/module/graph/moduleGraphSelectors";
import {connect} from "react-redux";

import TaskGraphFilter from "./TaskGraphFilter";
import TaskGraph from "./TaskGraph";
import TaskViewContent from "../view/TaskViewContent";
import {i18n} from "../../../i18n";

class TaskGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(actions.doDeselect());
  }

  renderTask() {
    const {loading, taskRecord, moduleRecord} = this.props;

    return (
      <React.Fragment>
        <PageSubTitle>
          {i18n('overview.titles.tasks')}
        </PageSubTitle>

        <TaskGraphFilter moduleRecord={moduleRecord}/>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <TaskGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px", overflow: "auto"}}>
              {!taskRecord ? <p>{i18n('overview.instructions.left')}</p> :
                <TaskViewContent
                  loading={loading}
                  record={taskRecord}
                />
              }
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    const {casedRecord, moduleRecord} = this.props;

    if (!casedRecord) {
      return null;
    }

    if (!moduleRecord) {
      return <p>{i18n('overview.instructions.above')}</p>;
    }

    return this.renderTask();
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    taskRecord: selectors.selectRecord(state),
    casedRecord: casedGraphSelectors.selectRecord(state),
    moduleRecord: moduleGraphSelectors.selectRecord(state),
  };
}

export default connect(select)(TaskGraphPage);