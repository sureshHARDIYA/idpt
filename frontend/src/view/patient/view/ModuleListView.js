import React, { Component } from 'react';
import { i18n } from 'i18n';
import _get from 'lodash/get';
import { Card, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from 'view/shared/Spinner';
import { Row, Col } from 'react-flexbox-grid';
import Breadcrumb from 'view/shared/Breadcrumb';
import actions from 'modules/record/view/recordViewActions';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import selectors from 'modules/record/view/recordViewSelectors';

const { Meta } = Card;

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
          <Row>
            <h1>{record.host.name}</h1>
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
                        // style={{ width: 240, height: 200, margin: "20px auto" }}
                        src={_get(
                          item,
                          'host.featuredImage.0.publicUrl',
                          'https://order1688.vn/upload/no-image.jpg',
                        )}
                      />
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Meta
                        title={_get(item, 'host.name')}
                        description={this.getDescription(
                          item.description,
                        )}
                      />
                      <Link
                        to={`/program/${record.id}/module/${item.id}`}
                      >
                        {'Start module'}
                        <Icon type="right" />
                      </Link>
                    </div>
                  </Card>
                </Col>
              ))}
          </Row>
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
