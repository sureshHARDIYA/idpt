import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import BoxWrapper from 'view/shared/styles/BoxWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import TaskViewItem from 'view/task/view/TaskViewItem';
import ModuleViewItem from 'view/module/view/ModuleViewItem';
import { Row, Col } from 'antd';

const { fields } = model;

class RecordTaskView extends Component {
  renderView() {
    const { task } = this.props;

    return (
      <BoxWrapper>
        <Row>
          <Col span={24} md={{ span: 12 }}>
            <TaskViewItem
              label={fields['roadmap.tasks'].label}
              value={fields['roadmap.tasks'].forView(task.host)}
            />

            <ModuleViewItem
              label={fields['roadmap.host'].label}
              value={fields['roadmap.host'].forView(task.parent.host)}
            />
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <TextViewItem
              label={fields['roadmap.completion?'].label}
              value={fields['roadmap.completion?'].forView(task.completionRequired ? 'True' : 'False')}
            />

            <TextViewItem
              label={fields['roadmap.state'].label}
              value={fields['roadmap.state'].forView(task.state)}
            />

            <TextViewItem
              label={fields['roadmap.elements'].label}
              value={fields['roadmap.elements'].forView(task.elements)}
            />
          </Col>
        </Row>
      </BoxWrapper>
    );
  }

  render() {
    const { task, loading } = this.props;

    if (loading || !task) {
      return <Spinner />;
    }

    return this.renderView();
  }
}

export default RecordTaskView;
