import model from 'modules/empatica/empaticaModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';

const { fields } = model;

class EmpaticaView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <TextViewItem
          label={fields.type.label}
          value={fields.type.forView(record.type)}
        />

        <TextViewItem
          label={fields.frequency.label}
          value={fields.frequency.forView(record.frequency)}
        />

        <TextViewItem
          label={fields.timestamp.label}
          value={fields.timestamp.forView(record.timestamp)}
        />

        <TextViewItem
          label={fields.patient.label}
          value={fields.patient.forView(record.patient)}
        />

        <TextViewItem
          label={fields.data.label}
          value={fields.data.forView(record.data)}
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

export default EmpaticaView;
