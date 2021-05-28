import model from 'modules/module/moduleModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import CasedViewItem from 'view/cased/view/CasedViewItem';
import TaskViewItem from 'view/task/view/TaskViewItem';
import ModuleViewItem from 'view/module/view/ModuleViewItem';
import TaxonomyViewItem from 'view/taxonomy/view/TaxonomyViewItem';

const { fields } = model;

class ModuleView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <CasedViewItem
          label={fields.owner.label}
          value={fields.owner.forView(record.owner)}
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

        <TaskViewItem
          label={fields.tasks.label}
          value={fields.tasks.forView(record.tasks)}
        />

        <TaxonomyViewItem
          label={fields.taxonomies.label}
          value={fields.taxonomies.forView(record.taxonomies)}
        />

        <ImagesViewItem
          label={fields.featuredImage.label}
          value={fields.featuredImage.forView(record.featuredImage)}
        />

        <ModuleViewItem
          label={fields.prerequisite.label}
          value={fields.prerequisite.forView(record.prerequisite)}
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

export default ModuleView;
