import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import BoxWrapper from 'view/shared/styles/BoxWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CasedViewItem from 'view/cased/view/CasedViewItem';
import PatientViewItem from 'view/patient/view/PatientViewItem';
import { Row, Col } from 'antd';

const { fields } = model;

class RecordView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <BoxWrapper>
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <TextViewItem
              label={fields.id.label}
              value={fields.id.forView(record.id)}
            />

            <CasedViewItem
              label={fields.host.label}
              value={fields.host.forView(record.host)}
            />

            <PatientViewItem
              label={fields.owner.label}
              value={fields.owner.forView(record.owner)}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <TextViewItem
              label={fields.description.label}
              value={fields.description.forView(record.description)}
            />

            <TextViewItem
              label={fields.status.label}
              value={fields.status.forView(record.status)}
            />

            <TextViewItem
              label={fields.createdAt.label}
              value={fields.createdAt.forView(record.createdAt)}
            />

            <TextViewItem
              label={fields.updatedAt.label}
              value={fields.updatedAt.forView(record.updatedAt)}
            />
          </Col>
        </Row>
      </BoxWrapper>
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

export default RecordView;
