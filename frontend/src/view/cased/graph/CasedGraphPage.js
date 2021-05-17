import React, {Component} from 'react';
import PageSubTitle from 'view/shared/styles/PageSubTitle';
import CasedGraph from "./CasedGraph";
import {Button, Card, Col, Row} from "antd";
import selectors from "../../../modules/cased/graph/casedGraphSelectors";
import destroySelectors from "../../../modules/cased/destroy/casedDestroySelectors";
import casedSelectors from "../../../modules/cased/casedSelectors";
import {connect} from "react-redux";
import CasedView from "../view/CasedView";
import {Link} from "react-router-dom";
import {i18n} from "../../../i18n";

class CasedGraphPage extends Component {
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
            <Card bodyStyle={{padding: 8}}>
              <CasedGraph/>
            </Card>
          </Col>

          <Col {...twoColumnsResponsiveProps}>
            <Card bodyStyle={{padding: 8}}>
              <CasedView
                loading={this.props.loading}
                record={this.props.record}
              />

              <div>
                {!!this.props.record ?
                  (
                    <Link to={`/cased/${this.props.record.id}`}>
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
    rows: selectors.selectRows(state),
    record: selectors.selectRecord(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(state,),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(state,),
    hasPermissionToRead: casedSelectors.selectPermissionToRead(state,),
  };
}

export default connect(select)(CasedGraphPage);