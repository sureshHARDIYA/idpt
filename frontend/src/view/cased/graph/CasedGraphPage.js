import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import CasedGraph from "./CasedGraph";
import {Card, Col, Row} from "antd";

import selectors from "../../../modules/cased/graph/casedGraphSelectors";
import destroySelectors from "../../../modules/cased/destroy/casedDestroySelectors";
import casedSelectors from "../../../modules/cased/casedSelectors";
import {connect} from "react-redux";
import actions from "../../../modules/cased/graph/casedGraphActions";
import CasedViewContent from "../view/CasedViewContent";

class CasedGraphPage extends Component {
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
          Cases
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <CasedGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px", overflow: "auto"}}>
              <CasedViewContent
                record={this.props.casedRecord}
                loading={this.props.loading}
              />
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
    casedRows: selectors.selectRows(state),
    casedRecord: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(CasedGraphPage);