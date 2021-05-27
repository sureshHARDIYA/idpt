import React, {Component} from 'react';
import ModuleView from 'view/module/view/ModuleView';
import ModuleViewToolbar from 'view/module/view/ModuleViewToolbar';
import Spinner from "../../shared/Spinner";

class ModuleViewContent extends Component {

  renderContent() {
    const {record, loading} = this.props;

    return (
      <React.Fragment>
        <ModuleViewToolbar id={record.id}/>

        <ModuleView
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

export default ModuleViewContent;
