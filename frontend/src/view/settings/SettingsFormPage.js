import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import SettingsForm from 'view/settings/SettingsForm';
import SettingsFormToolbar from 'view/settings/SettingsFormToolbar';
import { getHistory } from 'modules/store';

class SettingsFormPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('settings.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('settings.title')}</PageTitle>

          <SettingsFormToolbar />

          <SettingsForm
            onCancel={() => getHistory().push('/')}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default SettingsFormPage;
