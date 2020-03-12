import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import BoxWrapper from 'view/shared/styles/BoxWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CasedViewItem from 'view/cased/view/CasedViewItem';
import { Row, Col } from 'antd';

const { fields } = model;

class RecordRoadmapView extends Component {
  renderView() {
    const { module } = this.props;

    return (
      <BoxWrapper>
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <TextViewItem
              label={fields.id.label}
              value={fields.id.forView(module.id)}
            />

            <CasedViewItem
              label={fields['roadmap.host'].label}
              value={fields['roadmap.host'].forView(module.host)}
            />

            <TextViewItem
              label={fields.state.label}
              value={fields.state.forView(module.state)}
            />

            <TextViewItem
              label={fields['roadmap.tasks'].label}
              value={fields['roadmap.tasks'].forView(module.children.length)}
            />
          </Col>
        </Row>
      </BoxWrapper>
    );
  }

  render() {
    const { module, loading } = this.props;

    if (loading || !module) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default RecordRoadmapView;
