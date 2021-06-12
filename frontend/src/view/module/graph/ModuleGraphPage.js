import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {twoColumnsResponsiveProps} from 'view/shared/styles/ResponsiveProps';
import {Card, Col, Row} from "antd";

import selectors from 'modules/module/graph/moduleGraphSelectors';
import destroySelectors from 'modules/module/destroy/moduleDestroySelectors';
import actions from "../../../modules/module/graph/moduleGraphActions";

import casedGraphSelectors from "../../../modules/cased/graph/casedGraphSelectors";
import {connect} from "react-redux";

import ModuleGraphFilter from "./ModuleGraphFilter";
import ModuleGraph from "./ModuleGraph";
import ModuleViewContent from "../view/ModuleViewContent";
import {i18n} from "../../../i18n";

class ModuleGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  } // TODO: See if this can be moved down in the call-hierarchy (At the moment, removing it causes delayed physics to graph)

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch(actions.doDeselect());
  }

  renderModule() {
    const {loading, casedRecord, moduleRecord} = this.props;

    return (
      <React.Fragment>
        <PageSubTitle>
          {i18n('overview.titles.modules')}
        </PageSubTitle>

        <ModuleGraphFilter casedRecord={casedRecord}/>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <ModuleGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px", overflow: "auto"}}>
              {!moduleRecord ? <p>{i18n('overview.instructions.left')}</p> :
                <ModuleViewContent
                  loading={loading}
                  record={moduleRecord}
                />
              }
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  render() {
    const {casedRecord} = this.props;

    if (!casedRecord) {
      return <p>{i18n('overview.instructions.above')}</p>;
    }

    return this.renderModule();
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
    moduleRecord: selectors.selectRecord(state),
    casedRecord: casedGraphSelectors.selectRecord(state),

  };
}

export default connect(select)(ModuleGraphPage);