import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import { connect } from 'react-redux';
import epicActions from 'modules/epic/view/epicViewActions';
import actions from 'modules/roadmap/view/roadmapViewActions';
import selectors from 'modules/roadmap/view/roadmapViewSelectors';
import _get from 'lodash/get';
import { Button, Divider, Icon, Tabs, Input, Form, Checkbox, Row, Col, Radio, DatePicker, TimePicker, Select, Collapse } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

class RecordRoadmapPage extends Component {
  state = {
    activeTab: '1',
    max: 4,
    isDisabled: false,
  };

  componentDidMount() {
    const { dispatch, match, roadmap } = this.props;

    dispatch(actions.doFind(match.params.id));
  }

  createMarkup(description) {
    return { __html: description };
  }

  getDescription(description) {
    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(
          description,
        )}
      />
    );
  }

  get tabs() {
    return _get(this.props.roadmap, 'children', []).map((task) => task.host.name);
  }

  changeTab = (activeKey) => {
    this.setState({
      activeTab: activeKey,
    });
  };

  forwardClick = () => {
    const currentId = parseInt(this.state.activeTab, 10);
    this.updateDurationDocument(currentId - 1);

    this.setState({
      activeTab: (currentId + 1).toString(),
      disabled: false,
    });
  };

  updateDurationDocument = (currentId) => {
    const task = _get(this.props.roadmap, `children.${currentId}`);

    console.log('task:', task)

    if (!!task && ['ACTIVATE', 'PROGRESS'].includes(task.state)) {
      const documents = task.evaluations.filter(item => item.resourceType === 'Document').map(({ id }) => id)

      this.props.dispatch(
        epicActions.doTaskStartDocumentCount(task.id, documents)
      );
    }
  }

  previousClick = () => {
    this.updateDurationDocument();
    const currentId = parseInt(this.state.activeTab, 10);
    this.updateDurationDocument(currentId + 1);

    if (currentId === 1) {
      this.setState({
        disabled: true,
      });
    }

    this.setState({
      activeTab: (currentId - 1).toString(),
    });
  };

  renderFormSchema = (form) => {
    switch (form.type) {
      case 'textarea': return <Input.TextArea placeholder={form.placeholder} />
      case 'radio': return (
        <Radio.Group style={{ width: '100%' }}>
          <Row>
            {form.options.map((option) => (
              <Col span={8} key={option.value}>
                <Radio value={option.value}>{option.label}</Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      );
      case 'checkbox': return (
        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            {form.options.map((option) => (
              <Col span={8} key={option.value}>
                <Checkbox value={option.value}>{option.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      );
      case 'select': return (
        <Select style={{ width: '100%' }}>
            {form.options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
        </Select>
      );
      case 'date': return <DatePicker />;
      case 'time': return <TimePicker />;
      default: return <Input placeholder={form.placeholder} />;
    }
  }

  renderAssignment = (assignments) => {
    return (
      <Collapse>
        {assignments.map((assignment) => (
              <Collapse.Panel header={assignment.title} key={assignment.id}>
                <Form {...formItemLayout}>
                    {assignment.formSchema.map((item) => {
                      return (
                        <Form.Item label={item.label} key={item.field} required={!!item.rules.find((r) => r.required)}>
                          {this.renderFormSchema(item)}
                        </Form.Item>
                      )
                    })}
                  </Form>
              </Collapse.Panel>
          ))}
      </Collapse>
    )
  }

  render() {
    const { roadmap } = this.props;
    const casedName = _get(roadmap, 'record.host.name');

    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.record.menu'), '/program'],
            !!casedName && [casedName, `/program/${_get(roadmap, 'record.id')}`],
            [i18n('entities.record.module.title')],
          ].filter(i => i)}
        />
        <ContentWrapper>
          <Tabs
            tabPosition="right"
            onChange={this.changeTab}
            activeKey={this.state.activeTab}
          >
            {_get(roadmap, 'children', []).map((task, index) => (
              <Tabs.TabPane tab={_get(task, 'host.name')} key={(index + 1).toString()}>
                <h1>{task.host.name}</h1>
                {this.getDescription(task.host.description)}
                {this.renderAssignment(task.host.assignments)}
              </Tabs.TabPane>
            ))}
          </Tabs>
          <Divider dashed />
            <Button.Group
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                type="primary"
                onClick={this.previousClick}
                disabled={
                  this.state.isDisabled ||
                  this.state.activeTab === '1'
                }
              >
                <Icon type="left" />
                Backward
              </Button>
              <Button
                type="primary"
                onClick={this.forwardClick}
                disabled={
                  this.state.activeTab ===
                  this.tabs.length.toString()
                }
              >
                Forward
                <Icon type="right" />
              </Button>
            </Button.Group>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

const select = (state) => ({
  roadmap: selectors.selectRecord(state),
  loading: selectors.selectLoading(state),
})

export default connect(select)(RecordRoadmapPage);
