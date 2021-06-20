import model from 'modules/cased/casedModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import ImagesViewItem from 'view/shared/view/ImagesViewItem';
import ModuleViewItem from 'view/module/view/ModuleViewItem';
import TaxonomyViewItem from 'view/taxonomy/view/TaxonomyViewItem';
import {Tabs} from "antd";

const { fields } = model;

class CasedView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            key="1"
            tab="General Information"
          >
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

            <ImagesViewItem
              label={fields.featuredImage.label}
              value={fields.featuredImage.forView(record.featuredImage)}
            />

            <ModuleViewItem
              label={fields.modules.label}
              value={fields.modules.forView(record.modules)}
            />

            <TaxonomyViewItem
              label={fields.taxonomies.label}
              value={fields.taxonomies.forView(record.taxonomies)}
            />

            <TextViewItem
              label={fields.availableFrom.label}
              value={fields.availableFrom.forView(record.availableFrom)}
            />

            <TextViewItem
              label={fields.createdAt.label}
              value={fields.createdAt.forView(record.createdAt)}
            />

            <TextViewItem
              label={fields.updatedAt.label}
              value={fields.updatedAt.forView(record.updatedAt)}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="2"
            tab="Constraints"
          >

          </Tabs.TabPane>
        </Tabs>
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

export default CasedView;
