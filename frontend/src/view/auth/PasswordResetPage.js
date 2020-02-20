import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import model from 'modules/auth/userModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import queryString from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import ForgotPasswordPageWrapper from 'view/auth/styles/EmptyPermissionsPageWrapper';
import FormSchema from 'view/shared/form/formSchema';

const { fields } = model;

class PasswordResetPage extends Component {
  schema = new FormSchema(fields.id, [fields.password]);

  componentDidMount() {
    this.clearErrorMessage();
  }

  handleChange(event, form) {
    if (this.props.errorMessage) {
      this.clearErrorMessage();
    }

    form.handleChange(event);
  }

  clearErrorMessage = () => {
    const { dispatch } = this.props;
    dispatch(actions.doClearErrorMessage());
  };

  initialValues = () => {
    return {
      password: '',
    };
  };

  token = () => {
    return queryString.parse(this.props.location.search)
      .token;
  };

  doSubmit = ({ password }) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doResetPassword(this.token(), password),
    );
  };

  render() {
    return (
      <ForgotPasswordPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <Form onSubmit={form.handleSubmit}>
                <InputFormItem
                  name={fields.password.name}
                  placeholder={fields.password.label}
                  autoComplete={fields.password.name}
                  type="password"
                  size="large"
                  layout={null}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  {i18n('auth.passwordReset.message')}
                </Button>

                <OtherActions>
                  <Link to="/auth/signin">
                    {i18n('common.cancel')}
                  </Link>
                </OtherActions>
              </Form>
            )}
          />
        </Content>
      </ForgotPasswordPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoadingPasswordReset(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(select)(PasswordResetPage);
