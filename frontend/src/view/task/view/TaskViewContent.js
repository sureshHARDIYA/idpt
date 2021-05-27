import React, {Component} from 'react';
import TaskView from 'view/task/view/TaskView';
import TaskViewToolbar from 'view/task/view/TaskViewToolbar';
import Spinner from "../../shared/Spinner";

class TaskViewContent extends Component {

  renderContent() {
    const {record, loading} = this.props;

    return (
      <React.Fragment>
        <TaskViewToolbar id={record.id}/>

        <TaskView
          loading={loading}
          record={record}
        />
      </React.Fragment>
    );
  }

  render() {
    const {record, loading} = this.props;

    if (loading || !record) {
      return <Spinner/>;
    }

    return this.renderContent();
  }
}

export default TaskViewContent;
