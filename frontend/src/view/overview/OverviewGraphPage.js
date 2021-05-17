import React, {Component} from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import selectors from "../../modules/cased/graph/casedGraphSelectors";
import destroySelectors from "../../modules/cased/destroy/casedDestroySelectors";
import casedSelectors from "../../modules/cased/casedSelectors";
import {connect} from "react-redux";
import actions from "../../modules/cased/graph/casedGraphActions";
import CasedGraphPage from "../cased/graph/CasedGraphPage";

class OverviewGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  handleButtonClick = () => {
    //TODO: Remove this function when done. It belongs to the button used to manually trigger a render
    this.forceUpdate();
  }


  render() {
    return (
      <React.Fragment>
        <ContentWrapper>
          <PageTitle>
            Overview
          </PageTitle>

          <CasedGraphPage/>

        </ContentWrapper>


        <div>
          {
            //TODO: Remove this div when done. The button is used to manually trigger a render
          }
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
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    record: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(OverviewGraphPage);