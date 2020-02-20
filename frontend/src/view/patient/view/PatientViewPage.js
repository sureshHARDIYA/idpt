import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PatientView from 'view/patient/view/PatientView';
import { i18n } from 'i18n';
import actions from 'modules/patient/view/patientViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/patient/view/patientViewSelectors';
import PatientViewToolbar from 'view/patient/view/PatientViewToolbar';

class PatientPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.patient.menu'), '/patient'],
            [i18n('entities.patient.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.patient.view.title')}
          </PageTitle>

          <PatientViewToolbar match={this.props.match} />

          <PatientView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(PatientPage);
