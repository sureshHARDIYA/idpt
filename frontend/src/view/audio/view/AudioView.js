import model from 'modules/audio/audioModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';


const { fields } = model;

class AudioView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <TextViewItem
          label={fields.url.label}
          value={fields.url.forView(record.url)}
        />

        <TextViewItem
          label={fields.audiolength.label}
          value={fields.audiolength.forView(record.audiolength)}
        />

        <TextViewItem
          label={fields.createdAt.label}
          value={fields.createdAt.forView(record.createdAt)}
        />

        <TextViewItem
          label={fields.updatedAt.label}
          value={fields.updatedAt.forView(record.updatedAt)}
        />
        <TextViewItem
          label={fields.evaluationCriteria.fields.field.label}
          value={fields.evaluationCriteria.fields.field.forView(record.evaluationCriteria.field)}
        />
        <TextViewItem
          label={fields.evaluationCriteria.fields.operator.label}
          value={fields.evaluationCriteria.fields.operator.forView(record.evaluationCriteria.operator)}
        />
        <TextViewItem
          label={fields.evaluationCriteria.fields.valueRequired.label}
          value={fields.evaluationCriteria.fields.valueRequired.forView(record.evaluationCriteria.valueRequired)}
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

export default AudioView;
