import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import ProfileForm from 'view/auth/ProfileForm';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';

class ProfileFormPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('auth.profile.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('auth.profile.title')}
          </PageTitle>

          <ProfileForm
            onCancel={() => getHistory().push('/')}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default ProfileFormPage;
