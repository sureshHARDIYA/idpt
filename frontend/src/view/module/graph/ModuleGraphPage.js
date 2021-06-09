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
import {i18n} from "../../../i18n";

class ModuleGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  renderModule() {
    const {loading, casedRecord, moduleRecord} = this.props

    const twoColumnsResponsiveProps = {
      xs: 24, sm: 24, md: 12, lg: 12, xl: 12, style: {marginBottom: 24},
    };

    return (
      <React.Fragment>
        <PageSubTitle>
          {i18n('overview.titles.modules')}
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8, height: "500px"}}>
              <ModuleGraph casedRecord={casedRecord}/>
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
    moduleFilter: selectors.selectFilter(state),
    moduleRows: selectors.selectRows(state),
    moduleRecord: selectors.selectRecord(state),
    hasPermissionToEdit: moduleSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: moduleSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: moduleSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(ModuleGraphPage);