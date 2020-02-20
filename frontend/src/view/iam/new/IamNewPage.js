import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import IamNewForm from 'view/iam/new/IamNewForm';
import actions from 'modules/iam/form/iamFormActions';
import selectors from 'modules/iam/form/iamFormSelectors';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import { connect } from 'react-redux';

class IamNewPage extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(actions.doNew());
  };

  doSubmit = (id, data) => {
    const { dispatch } = this.props;
    dispatch(actions.doAdd(data));
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu'), '/iam'],
            [i18n('iam.new.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('iam.new.title')}</PageTitle>

          <IamNewForm
            saveLoading={this.props.saveLoading}
            onSubmit={this.doSubmit}
            onCancel={() => getHistory().push('/iam')}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    saveLoading: selectors.selectSaveLoading(state),
  };
}

export default connect(select)(IamNewPage);
