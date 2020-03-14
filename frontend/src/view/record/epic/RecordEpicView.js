import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Spinner from 'view/shared/Spinner';
import model from 'modules/record/recordModel';
import BoxWrapper from 'view/shared/styles/BoxWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import TaskViewItem from 'view/task/view/TaskViewItem';
import ModuleViewItem from 'view/module/view/ModuleViewItem';

const { fields } = model;

class RecordRoadmapView extends Component {
  renderView() {
    const { epic } = this.props;

    return (
      <BoxWrapper>
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <TaskViewItem
              label={fields['roadmap.tasks'].label}
              value={fields['roadmap.tasks'].forView(epic.host)}
            />

            <ModuleViewItem
              label={fields['roadmap.host'].label}
              value={fields['roadmap.host'].forView(epic.roadmap.host)}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <TextViewItem
              label={fields['roadmap.completion?'].label}
              value={fields['roadmap.completion?'].forView(epic.completionRequired ? 'True' : 'False')}
            />

            <TextViewItem
              label={fields['roadmap.state'].label}
              value={fields['roadmap.state'].forView(epic.state)}
            />

            <TextViewItem
              label={fields['roadmap.elements'].label}
              value={fields['roadmap.elements'].forView(epic.elements)}
            />
          </Col>
        </Row>
      </BoxWrapper>
    );
  }

  render() {
    const { epic, loading } = this.props;

    if (loading || !epic) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default RecordRoadmapView;
