import model from 'modules/scoredData/scoredDataModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';

const { fields } = model;

class ScoredDataView extends Component {
  renderView() {
    const { record } = this.props;
    console.log(record);

    return (
      <ViewWrapper>
        <TextViewItem
          label={fields.id.label}
          value={fields.id.forView(record.id)}
        />

        <TextViewItem
          label={fields.dataType.label}
          value={fields.dataType.forView(record.type)}
        />

        <TextViewItem
          label={fields.score.label}
          value={fields.score.forView(record.score)}
        />

        <TextViewItem
          label={fields.timeStart.label}
          value={fields.timeStart.forView(record.timeStart)}
        />

        <TextViewItem
          label={fields.timeEnd.label}
          value={fields.timeEnd.forView(record.timeEnd)}
        />

        <TextViewItem
          label={fields.patientName.label}
          value={fields.patientName.forView(record.patient)}
        />

        <TextViewItem
          label={fields.patientId.label}
          value={fields.patientId.forView(record.patient)}
        />

        <TextViewItem
          label={fields.dataId.label}
          value={fields.dataId.forView(record.data)}
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

export default ScoredDataView;
