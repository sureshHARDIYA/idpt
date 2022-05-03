import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import PatientView from 'view/patient/view/PatientView';
import { i18n } from 'i18n';
import actions from 'modules/patient/view/patientViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/patient/view/patientViewSelectors';
import authSelectors from 'modules/auth/authSelectors';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import Toolbar from 'view/shared/styles/Toolbar';

class PatientPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const currentUserId = this.props.currentUser.id;
    console.log(this.props.currentUser);
    
    dispatch(
      actions.doFind(match.params.id || currentUserId),
      );
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
        {i18n('entities.patient.view.welcome')}
        <span className="ant-typography">
        <code>
        {this.props.currentUser &&
          this.props.currentUser.fullName}
          </code>
          </span>
          </PageTitle>
          
          <Toolbar>
          <Link to="/scoredData/wearableDataImporter">
          <Button type="primary" icon="upload" size="large">
          {i18n('common.wearableData')}
          </Button>
          </Link>
          
          <Link to={{
            pathname: '/graph',
            state: { 
              patient: {
                id: this.props.currentUser['id'], 
                fullName: this.props.currentUser['fullName'],
              }, 
              userIsPatient: true,
            },
          }}>
          <Button type="primary" icon="line" size="large">
          Graph
          </Button>
          </Link>
          </Toolbar>
          
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
          currentUser: authSelectors.selectCurrentUser(state),
          loading: selectors.selectLoading(state),
          record: selectors.selectRecord(state),
        };
      }
      
      export default connect(select)(PatientPage);
      