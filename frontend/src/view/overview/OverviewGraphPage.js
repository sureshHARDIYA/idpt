import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import {connect} from "react-redux";

import casedGraphSelectors from "../../modules/cased/graph/casedGraphSelectors";
import CasedGraphPage from "../cased/graph/CasedGraphPage";

import moduleGraphSelectors from "../../modules/module/graph/moduleGraphSelectors";
import ModuleGraphPage from "../module/graph/ModuleGraphPage";

class OverviewGraphPage extends Component {
  handleButtonClick = () => {
    this.forceUpdate(); /*TODO: Remove this when done. Used to manually trigger a render*/
  }

  render() {
    return (
      <React.Fragment>
        <ContentWrapper>
          <PageTitle>
            Overview
          </PageTitle>

          <CasedGraphPage/>
          <ModuleGraphPage casedRecord={this.props.casedRecord}/>

        </ContentWrapper>

        <div>
          {/*TODO: Remove this div when done. The button is used to manually trigger a render*/}
          <button onClick={this.handleButtonClick}>
            Force render
          </button>
        </div>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    casedRecord: casedGraphSelectors.selectRecord(state),
    moduleRecord: moduleGraphSelectors.selectRecord(state),
  };
}

export default connect(select)(OverviewGraphPage);