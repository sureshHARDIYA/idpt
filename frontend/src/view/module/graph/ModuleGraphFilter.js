import {Component} from 'react';

import actions from 'modules/module/graph/moduleGraphActions';
import selectors from 'modules/module/graph/moduleGraphSelectors';
import {connect} from 'react-redux';

class ModuleGraphFilter extends Component {
  componentDidMount() {
    const {casedRecord, dispatch} = this.props;

    let modules = null;
    if (!!casedRecord) {
      modules = casedRecord.modules.map(m => m.id);
    }
    const ids = {ids: modules};

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
