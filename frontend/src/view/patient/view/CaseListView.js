import React, { Component } from 'react';
import actions from 'modules/patient/view/patientViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/patient/view/patientViewSelectors';
import authSelectors from 'modules/auth/authSelectors';
import { Button, Icon, Card } from 'antd';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';

const { Meta } = Card;

class CaseListView extends Component {
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
    const { record } = this.props;

    if (!record) {
      return null;
    }

    return (
      <Grid fluid>
        <Row gutter={[24, 24]}>
          {record.recordList &&
            record.recordList.rows.map((item) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item.id}
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
                    <Link to={`/program/${item.id}`}>
                      {'Start Case.'}
                      <Icon type="right" />
                    </Link>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </Grid>
    );
  }
}

function select(state) {
  return {
    currentUser: authSelectors.selectCurrentUser(state),
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(CaseListView);
