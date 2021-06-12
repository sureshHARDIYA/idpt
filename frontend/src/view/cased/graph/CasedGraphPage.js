import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {twoColumnsResponsiveProps} from 'view/shared/styles/ResponsiveProps';
import CasedGraph from "./CasedGraph";
import {Card, Col, Row} from "antd";

import selectors from "../../../modules/cased/graph/casedGraphSelectors";
import destroySelectors from "../../../modules/cased/destroy/casedDestroySelectors";
import {connect} from "react-redux";
import actions from "../../../modules/cased/graph/casedGraphActions";
import CasedViewContent from "../view/CasedViewContent";
import {i18n} from "../../../i18n";

class CasedGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  render() {
    const {loading, casedRecord} = this.props;

    return (
      <React.Fragment>
        <PageSubTitle>
          {i18n('overview.titles.cased')}
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <CasedGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px", overflow: "auto"}}>
              {!casedRecord ? <p>{i18n('overview.instructions.left')}</p> :
                <CasedViewContent
                  loading={loading}
                  record={casedRecord}
                />
              }
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
    casedRecord: selectors.selectRecord(state),
  };
}

export default connect(select)(CasedGraphPage);