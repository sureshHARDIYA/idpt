import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import CaseListView from 'view/patient/view/CaseListView';

class PatientView extends Component {
  createMarkup(description) {
    return { __html: description };
  }

  getDescription(description) {
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(
          description,
        )}
      />
    );
  }

  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <div
          dangerouslySetInnerHTML={this.createMarkup(
            record.description,
          )}
        />
        <CaseListView />
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
