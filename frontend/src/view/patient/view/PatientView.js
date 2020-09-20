import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import { Grid, Row, Col } from 'react-flexbox-grid';

const { Meta } = Card;

class PatientView extends Component {
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

  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <div
          dangerouslySetInnerHTML={this.createMarkup(
            record.description,
          )}
        />
        <Grid fluid>
          <Row gutter={[24, 24]}>
            {record.modules &&
              record.modules.map((item, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={item.id}
                >
                  <Card
                    style={{ width: 240 }}
                    cover={
                      <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      />
                    }
                  >
                    <Meta
                      title={item.name}
                      description={this.getDescription(
                        item.description,
                      )}
                    />
                    <Button
                      type="primary"
                      href={`/patient/${record.id}/module/${item.id}`}
                    >
                      {'Start Module.'}
                      <Icon type="right" />
                    </Button>
                  </Card>
                </Col>
              ))}
          </Row>
        </Grid>
      </ViewWrapper>
    );
  }

  render() {
    const { record, loading } = this.props;

    if (loading || !record) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default PatientView;
