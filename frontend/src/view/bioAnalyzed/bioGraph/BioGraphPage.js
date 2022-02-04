import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import BioGraph from 'view/shared/bioGraph/bioGraph';

class BioGraphPage extends Component {
  
  
  render() {
    console.log(this.props.location.state);
    const Graph = BioGraph();
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
            {i18n(
              'entities.bioAnalyzed.bioGraph.title',
            )}
          </PageTitle>

          <Graph />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default BioGraphPage;
