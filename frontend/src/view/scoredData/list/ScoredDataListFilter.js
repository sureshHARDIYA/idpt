import { Button, Col, Form, Row } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import actions from 'modules/scoredData/list/scoredDataListActions';
import selectors from 'modules/scoredData/list/scoredDataListSelectors';
import model from 'modules/scoredData/scoredDataModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FilterWrapper, {
  formItemLayout,
} from 'view/shared/styles/FilterWrapper';
import FormFilterSchema from 'view/shared/form/formFilterSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';

const { fields } = model;

const schema = new FormFilterSchema([
  fields.score,
  fields.dataType,
  fields.timeStart,
  fields.timeEnd,
  fields.patientName,
  fields.patientId,
]);

class ScoredDataListFilter extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(this.initialFilter()));
  }

  initialFilter = () => {
    return schema.initialValues(
      this.props.filter,
      this.props.location,
    );
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doFetch(values));
  };

  handleReset = (form) => {
    form.setValues({});
    const { dispatch } = this.props;
    dispatch(actions.doReset());
  };

  render() {
    const { loading } = this.props;

    return (
      <FilterWrapper>
        <Formik
          initialValues={this.initialFilter()}
          validationSchema={schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <Row gutter={24}>
                  <Col md={24} lg={12}>
                    <InputNumberFormItem
                      name={fields.score.name}
                      label={fields.score.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.dataType.name}
                      label={fields.dataType.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.timeStart.name}
                      label={fields.timeStart.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.timeEnd.name}
                      label={fields.timeEnd.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.patientName.name}
                      label={fields.patientName.label}
                      layout={formItemLayout}
                    />
                  </Col>
                  <Col md={24} lg={12}>
                    <InputFormItem
                      name={fields.patientId.name}
                      label={fields.patientId.label}
                      layout={formItemLayout}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="filter-buttons" span={24}>
                    <Button
                      loading={loading}
                      icon="search"
                      type="primary"
                      htmlType="submit"
                    >
                      {i18n('common.search')}
                    </Button>
                    <Button
                      loading={loading}
                      onClick={() => this.handleReset(form)}
                      icon="undo"
                    >
                      {i18n('common.reset')}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        />
      </FilterWrapper>
    );
  }
}

function select(state) {
  return {
    filter: selectors.selectFilter(state),
  };
}

export default withRouter(
  connect(select)(ScoredDataListFilter),
);
