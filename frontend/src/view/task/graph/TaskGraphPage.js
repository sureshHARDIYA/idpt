import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {Button, Card, Col, Row} from "antd";

import selectors from 'modules/task/graph/taskGraphSelectors';
import destroySelectors from 'modules/task/destroy/taskDestroySelectors';
import taskSelectors from 'modules/task/taskSelectors';
import actions from "../../../modules/task/graph/taskGraphActions";
import {connect} from "react-redux";

import TaskGraph from "./TaskGraph";
import {Link} from "react-router-dom";
import {i18n} from "../../../i18n";
import TaskView from "../view/TaskView";

class TaskGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  render() {
    const twoColumnsResponsiveProps = {
      xs: 24, sm: 24, md: 12, lg: 12, xl: 12, style: {marginBottom: 24},
    };

    return (
      <React.Fragment>
        <PageSubTitle>
          Tasks
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8}}>
              <TaskGraph moduleRecord={this.props.moduleRecord}/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8}}>
              <TaskView
                loading={this.props.loading}
                record={this.props.taskRecord}
              />

              <div>
                {!!this.props.taskRecord ?
                  (
                    <Link to={`/task/${this.props.taskRecord.id}`}>
                      <Button type="primary" icon="view">
                        {i18n('common.view')}
                      </Button>
                    </Link>)
                  : ("")
                }
              </div>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    moduleFilter: selectors.selectFilter(state),
    taskRows: selectors.selectRows(state),
    taskRecord: selectors.selectRecord(state),
    hasPermissionToEdit: taskSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: taskSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: taskSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(TaskGraphPage);