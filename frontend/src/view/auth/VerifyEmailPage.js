import actions from 'modules/auth/authActions';
import selectors from 'modules/auth/authSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import { i18n } from 'i18n';
import queryString from 'query-string';
import EmailUnverifiedPageWrapper from 'view/auth/styles/EmailUnverifiedPageWrapper';

class VerifyEmailPage extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(actions.doVerifyEmail(this.token()));
  };

  token = () => {
    return queryString.parse(this.props.location.search)
      .token;
  };

  render() {
    return (
      <EmailUnverifiedPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <h3 style={{ textAlign: 'center' }}>
            {i18n('auth.verifyEmail.message')}
          </h3>
        </Content>
      </EmailUnverifiedPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoadingVerifyEmail(state),
});

export default connect(select)(VerifyEmailPage);
