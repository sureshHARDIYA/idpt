import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import {Button, Card, Col, Row} from "antd";

import selectors from 'modules/module/graph/moduleGraphSelectors';
import destroySelectors from 'modules/module/destroy/moduleDestroySelectors';
import moduleSelectors from 'modules/module/moduleSelectors';
import actions from "../../../modules/module/graph/moduleGraphActions";
import {connect} from "react-redux";

import ModuleGraph from "./ModuleGraph";
import {Link} from "react-router-dom";
import {i18n} from "../../../i18n";
import ModuleView from "../view/ModuleView";

class ModuleGraphPage extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(actions.doFetch());
  }

  render() {
    const twoColumnsResponsiveProps = {
      xs: 24, sm: 24, md: 12, lg: 12, xl: 12, style: {marginBottom: 24},
    };
    console.log("Module: ", this.props)

    return (
      <React.Fragment>
        <PageSubTitle>
          Modules
        </PageSubTitle>

        <Row gutter={24}>
          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8}}>
              <ModuleGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8}}>
              <ModuleView
                loading={this.props.loading}
                record={this.props.moduleRecord}
              />

              <div>
                {!!this.props.moduleRecord ?
                  (
                    <Link to={`/module/${this.props.moduleRecord.id}`}>
                      <Button type="primary" icon="view">
                        {i18n('common.view')}
                      </Button>
                    </Link>)
                  : ("")
                }
              </div>
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