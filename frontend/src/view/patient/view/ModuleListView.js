import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import RecordView from 'view/record/view/RecordView';
import { i18n } from 'i18n';
import actions from 'modules/record/view/recordViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/record/view/recordViewSelectors';
import RecordViewToolbar from 'view/record/view/RecordViewToolbar';
import RecordRoadmap from 'view/record/view/RecordRoadmap';
import Spinner from 'view/shared/Spinner';
import BoxWrapper from 'view/shared/styles/BoxWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CasedViewItem from 'view/cased/view/CasedViewItem';
import PatientViewItem from 'view/patient/view/PatientViewItem';
import { Card, Icon } from 'antd';
import model from 'modules/record/recordModel';
import _get from 'lodash/get';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

const { Meta } = Card;
const { fields } = model;

class ModuleListView extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }


  createMarkup(description) {
    return { __html: description };
  }

  getDescription(description) {
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(
          description,
        )}
      />
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/program'],
            [i18n('entities.record.view.title')],
          ]}
        />

        <ContentWrapper>
          <BoxWrapper>
            <Row>
              <Col md={12}>
                <CasedViewItem
                  label={fields.host.label}
                  value={fields.host.forView(record.host)}
                />
              </Col>
              <Col md={12}>
                <TextViewItem
                  label={fields.state.label}
                  value={fields.state.forView(record.state)}
                />
              </Col>
            </Row>
            <Row>
              {record.roadmaps &&
                record.roadmaps.map((item) => (
                  <Col
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={item.id}
                    style={{ padding: 8 }}
                  >
                    <Card
                      cover={
                        <img
                          alt={_get(item, 'host.name')}
                          style={{ width: 240, height: 200, margin: "20px auto" }}
                          src={_get(item, 'host.featuredImage.0.publicUrl', 'https://order1688.vn/upload/no-image.jpg')}
                        />
                      }
                    >
                      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Meta
                          title={_get(item, 'host.name')}
                          description={this.getDescription(
                            item.description,
                          )}
                        />
                        <Link to={`/program/${record.id}/module/${item.id}`}>
                          {'Start module'}
                          <Icon type="right" />
                        </Link>
                      </div>
                    </Card>
                  </Col>
                ))}
            </Row>
          </BoxWrapper>
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(ModuleListView);
