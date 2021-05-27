import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {Card, Col, Row} from "antd";

import selectors from 'modules/module/graph/moduleGraphSelectors';
import destroySelectors from 'modules/module/destroy/moduleDestroySelectors';
import moduleSelectors from 'modules/module/moduleSelectors';
import actions from "../../../modules/module/graph/moduleGraphActions";
import {connect} from "react-redux";

import ModuleGraph from "./ModuleGraph";
import ModuleViewContent from "../view/ModuleViewContent";

class ModuleGraphPage extends Component {
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
          Modules
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <ModuleGraph casedRecord={this.props.casedRecord}/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px", overflow: "auto"}}>
              <ModuleViewContent
                loading={this.props.loading}
                record={this.props.moduleRecord}
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
    moduleFilter: selectors.selectFilter(state),
    moduleRows: selectors.selectRows(state),
    moduleRecord: selectors.selectRecord(state),
    hasPermissionToEdit: moduleSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: moduleSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: moduleSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(ModuleGraphPage);