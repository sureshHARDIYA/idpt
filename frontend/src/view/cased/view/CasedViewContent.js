import React, {Component} from 'react';
import CasedView from 'view/cased/view/CasedView';
import CasedViewToolbar from 'view/cased/view/CasedViewToolbar';
import Spinner from "../../shared/Spinner";

class CasedViewContent extends Component {

  renderContent() {
    const {record, loading} = this.props;

    return (
      <React.Fragment>
        <CasedViewToolbar id={record.id}/>

        <CasedView
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

export default CasedViewContent;
