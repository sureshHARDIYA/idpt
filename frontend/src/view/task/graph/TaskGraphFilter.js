import {Component} from 'react';

import actions from 'modules/task/graph/taskGraphActions';
import selectors from 'modules/task/graph/taskGraphSelectors';
import {connect} from 'react-redux';

class ModuleGraphFilter extends Component {
  componentDidMount() {
    const {moduleRecord, dispatch} = this.props;

    let tasks = null;
    if (!!moduleRecord) {
      tasks = moduleRecord.tasks.map(t => t.id);
    }
    const ids = {ids: tasks};

    dispatch(actions.doFetch(ids));
  }

  render() {
    return null;
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
  };
}

export default connect(select)(ModuleGraphFilter);
