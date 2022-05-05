import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import Graph from 'view/shared/graph/graph';

class GraphPage extends Component {
  patient = this.props.location.state.patient;
  userIsPatient = this.props.location.state.userIsPatient;
  
  
  // TODO 
  render() {
    const PatientGraph = Graph(this.patient.id);
    
    if (this.userIsPatient){
      return (
        <React.Fragment>
        <Breadcrumb
        items={[
          [i18n('home.menu'), '/'],
          [
            i18n(
              'entities.scoredData.graph.title',
              ),
            ],
          ]}
          />
          <ContentWrapper>
          <PageTitle>
          {this.getTitle()}
          </PageTitle>
          
          <PatientGraph />
          </ContentWrapper>
          </React.Fragment>
          );
        }
        else {
          return (
            <React.Fragment>
            <Breadcrumb
            items={[
              [i18n('home.menu'), '/'],
              [
                
                i18n('entities.scoredData.menu'),
                '/scoredData',
              ],
              [
                i18n(
                  'entities.scoredData.graph.title',
                  ),
                ],
              ]}
              />
              <ContentWrapper>
              <PageTitle>
              {this.getTitle()}
              </PageTitle>
              
              <PatientGraph />
              </ContentWrapper>
              </React.Fragment>
              );
            }
          }
          
          getTitle(){
            return this.patient.fullName + "'s graph";
          }
        }
        
        export default GraphPage;
        