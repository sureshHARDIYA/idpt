import model from 'modules/patient/patientModel';
import React, { Component } from 'react';
import { Tabs } from 'antd';
import Spinner from 'view/shared/Spinner';
import ViewWrapper from 'view/shared/styles/ViewWrapper';
import TextViewItem from 'view/shared/view/TextViewItem';
import CasedListTable from 'view/patient/view/CasedListTable';

const { fields } = model;

const { TabPane } = Tabs;

class PatientView extends Component {
  renderView() {
    const { record } = this.props;

    return (
      <ViewWrapper>
        <Tabs tabPosition="right">
          <TabPane tab=":Information" key="1">
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
          </TabPane>
          <TabPane tab=":List of cases" key="2">
            <CasedListTable />
          </TabPane>
          <TabPane tab=":List of modules" key="3">
            Content of Tab 3
          </TabPane>
          <TabPane tab=":List of tasks" key="4">
            Content of Tab 4
          </TabPane>
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

export default PatientView;
