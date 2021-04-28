import model from 'modules/task/taskModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import ModuleViewItem from 'view/module/view/ModuleViewItem';
import ImagesViewItem from "../../shared/view/ImagesViewItem";

const { fields } = model;

class TaskView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <TextViewItem
          label={fields.name.label}
          value={fields.name.forView(record.name)}
        />

        <TextViewItem
          label={fields.description.label}
          value={fields.description.forView(record.description)}
        />

        <TextViewItem
          label={fields.status.label}
          value={fields.status.forView(record.status)}
        />

        <TextViewItem
          label={fields.tags.label}
          value={fields.tags.forView(record.tags)}
        />

        <TextViewItem
          label={fields.points.label}
          value={fields.points.forView(record.points)}
        />

        <TextViewItem
          label={fields.completionRequired.label}
          value={fields.completionRequired.forView(record.completionRequired)}
        />

        <TextViewItem
          label={fields.complexityLevel.label}
          value={fields.complexityLevel.forView(record.complexityLevel)}
        />

        <ModuleViewItem
            label={fields.prerequisite.label}
            value={fields.prerequisite.forView(record.prerequisite)}
        />

        <ModuleViewItem
          label={fields.owner.label}
          value={fields.owner.forView(record.owner)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
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

export default TaskView;
