import model from 'modules/patient/patientModel';
import React, { Component } from 'react';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CasedViewItem from 'view/cased/view/CasedViewItem';

const { fields } = model;

class PatientView extends Component {
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
          label={fields.birthdate.label}
          value={fields.birthdate.forView(record.birthdate)}
        />

        <TextViewItem
          label={fields.gender.label}
          value={fields.gender.forView(record.gender)}
        />

        <CasedViewItem
          label={fields.assignCase.label}
          value={fields.assignCase.forView(record.assignCase)}
        />

        <TextViewItem
          label={fields.phone.label}
          value={fields.phone.forView(record.phone)}
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

export default PatientView;
