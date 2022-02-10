import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import BioGraph from 'view/shared/bioGraph/bioGraph';

class BioGraphPage extends Component {
  patient = this.props.location.state.patient;
  userIsPatient = this.props.location.state.userIsPatient;
  
  
  // TODO 
  render() {
    const Graph = BioGraph(this.patient.id);
    
    if (this.userIsPatient){
      return (
        <React.Fragment>
        <Breadcrumb
        items={[
          [i18n('home.menu'), '/'],
          [
            i18n(
              'entities.bioAnalyzed.bioGraph.title',
              ),
            ],
          ]}
          />
          <ContentWrapper>
          <PageTitle>
          {this.getTitle()}
          </PageTitle>
          
          <Graph />
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
                
                i18n('entities.bioAnalyzed.menu'),
                '/bioAnalyzed',
              ],
              [
                i18n(
                  'entities.bioAnalyzed.bioGraph.title',
                  ),
                ],
              ]}
              />
              <ContentWrapper>
              <PageTitle>
              {this.getTitle()}
              </PageTitle>
              
              <Graph />
              </ContentWrapper>
              </React.Fragment>
              );
            }
          }
          
          getTitle(){
            return this.patient.fullName + "'s graph";
          }
        }
        
        export default BioGraphPage;
        