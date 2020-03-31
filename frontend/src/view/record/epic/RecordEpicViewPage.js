import React, { Component } from 'react';
import { Card, Col, Row, Collapse } from 'antd';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import actions from 'modules/epic/view/epicViewActions';
import selectors from 'modules/epic/view/epicViewSelectors';
import _get from 'lodash/get';
import RecordEpicView from 'view/record/epic/RecordEpicView';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const enumeratorLabel = (name) => i18n(`entities.evaluationCriteria.enumerators.operators.${name}`);

class RecordEpicPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  get fieldsParser() {
    return ({
      totalreadtime: 'Read time',
    })
  }

  componentWillUnmount() {
    this.props.dispatch(actions.doStartDocumentCount(this.props.match.params.id, []));
  }

  renderElement = (item) => {
    const evaluationCriteria = _get(item, 'evaluationCriteria', {});
    const status = evaluationCriteria.done ? 'Completed' : 'Uncompleted'

    return (
      <Panel
        key={JSON.stringify({
          id: evaluationCriteria.id,
          type: item.__typename
        })}
        header={[item.__typename, `(${status})`].join(': ')}
      >
        <Row>
          <Col xs={24}>
            <strong>
              Criteria:
            </strong>
            &nbsp;
            {this.fieldsParser[evaluationCriteria.field]} {enumeratorLabel(evaluationCriteria.operator)} {evaluationCriteria.valueRequired}
          </Col>
          <Col xs={24}>
            <strong>Status:</strong>&nbsp;{status}
          </Col>
          <Col xs={24}>
            <strong>
              Read time:
            </strong>
            &nbsp;
            {evaluationCriteria.total || '0'}
          </Col>
          <Col xs={24}>
            <strong>
              Content:
            </strong>
            <div
              dangerouslySetInnerHTML={{ __html: item.contentHTML }}
            />
          </Col>
        </Row>
      </Panel>
    )
  }

  onChange = (elements) => {
    const items = elements.map(item => JSON.parse(item));
    const documents = items.filter(item => item.type === 'Document').map(({ id }) => id)

    this.props.dispatch(
      actions.doStartDocumentCount(this.props.match.params.id, documents)
    );
  };

  render() {
    const { epic, loading } = this.props;
    const elements = _get(epic, 'host.elements', []);
    const moduleName = _get(epic, 'roadmap.host.name');
    const casedName = _get(epic, 'roadmap.record.host.name');

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/record'],
            !!casedName && [casedName, `/record/${_get(epic, 'roadmap.record.id')}`],
            !!moduleName && [moduleName, `/roadmaps/${_get(epic, 'roadmap.id')}`],
            [i18n('entities.record.task.title')],
          ].filter(i => i)}
        />
        <ContentWrapper>
          <RecordEpicView
            epic={epic}
            loading={loading}
          />
          <Card
            title="Task Types"
          >
            <Collapse
              onChange={this.onChange}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
              {elements.map(this.renderElement)}
            </Collapse>
          </Card>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const select = (state) => ({
  epic: selectors.selectRecord(state),
  loading: selectors.selectLoading(state),
})

export default connect(select)(RecordEpicPage);
