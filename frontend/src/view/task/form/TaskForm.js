import {
  Button,
  Form,
  Tabs,
  Row,
  Col,
  Divider,
  Popconfirm,
} from 'antd';
import { Formik, FieldArray } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/task/taskModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import Editor from 'view/shared/form/items/Editor';
import FormSchema from 'view/shared/form/formSchema';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'view/shared/form/items/InputNumberFormItem';
import SwitchFormItem from 'view/shared/form/items/SwitchFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TaskAutocompleteFormItem from 'view/task/autocomplete/TaskAutocompleteFormItem';
import ModuleAutocompleteFormItem from 'view/module/autocomplete/ModuleAutocompleteFormItem';
import AssignmentAutocompleteFormItem from 'view/assignments/autocomplete/AssignmentAutocompleteFormItem';
import TaxonomyAutocompleteFormItem from 'view/taxonomy/autocomplete/TaxonomyAutocompleteFormItem';

import _get from 'lodash/get';

const { fields } = model;

class TaskForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.name,
    fields.description,
    fields.status,
    fields.tags,
    fields.points,
    fields.completionRequired,
    fields.complexityLevel,
    fields.owner,
    fields.taxonomies,
    fields.prerequisite,
    fields.next,
    fields.documents,
    fields.videos,
    fields.audios,
    fields.assignments,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.props.onSubmit(id, data);
  };

  initialValues = () => {
    const record = this.props.record || {};
    return this.schema.initialValues(record);
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}

                <Tabs defaultActiveKey="1">
                  <Tabs.TabPane
                    key="1"
                    tab="Generate Information"
                  >
                    <InputFormItem
                      name={fields.name.name}
                      label={fields.name.label}
                      required={fields.name.required}
                      autoFocus
                    />
                    <Editor
                      name={fields.description.name}
                      label={fields.description.label}
                      required={fields.description.required}
                    />
                    <SelectFormItem
                      name={fields.status.name}
                      label={fields.status.label}
                      options={fields.status.options.map(
                        (item) => ({
                          value: item.id,
                          label: item.label,
                        }),
                      )}
                      required={fields.status.required}
                    />
                    <InputFormItem
                      name={fields.tags.name}
                      label={fields.tags.label}
                      required={fields.tags.required}
                    />
                    <InputNumberFormItem
                      name={fields.points.name}
                      label={fields.points.label}
                      required={fields.points.required}
                    />
                    <InputNumberFormItem
                      name={fields.complexityLevel.name}
                      label={fields.complexityLevel.label}
                      required={
                        fields.complexityLevel.required
                      }
                    />
                    <TaskAutocompleteFormItem
                      name={fields.next.name}
                      label={fields.next.label}
                      required={fields.next.required}
                      form={form}
                      mode="multiple"
                    />
                    <ModuleAutocompleteFormItem
                      name={fields.owner.name}
                      label={fields.owner.label}
                      required={fields.owner.required}
                      showCreate={!this.props.modal}
                      form={form}
                      mode="multiple"
                    />
                    <AssignmentAutocompleteFormItem
                      name={fields.assignments.name}
                      label={fields.assignments.label}
                      required={fields.assignments.required}
                      showCreate={false}
                      form={form}
                      mode="multiple"
                    />
                    <TaxonomyAutocompleteFormItem
                      name={fields.taxonomies.name}
                      label={fields.taxonomies.label}
                      required={fields.taxonomies.required}
                      showCreate={!this.props.modal}
                      form={form}
                      mode="multiple"
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    key="2"
                    tab="Multimedia"
                  >

                    <Tabs defaultActiveKey="1">
                      <Tabs.TabPane
                        key="1"
                        tab="Documents Element"
                      >
                        <FieldArray
                          name="documents"
                          render={(arrayHelpers) => {
                            const documents = _get(
                              form,
                              'values.documents',
                              [],
                            );

                            if (!documents.length) {
                              return (
                                <Form.Item
                                  {...formItemLayout}
                                  label="No document"
                                >
                                  <Button
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: `D${Date.now()}`,
                                      })
                                    }
                                    style={{marginRight: 10}}
                                    type="primary"
                                    icon="plus"
                                  />
                                </Form.Item>
                              );
                            }

                            return documents.map(
                              (item, index, items) => (
                                <div
                                  key={item.id}
                                  style={{ marginBottom: 20 }}
                                >
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Document"
                                  >
                                    <Row
                                      type="flex"
                                      justify="start"
                                    >
                                      <Col span={8}>
                                        #{item.id}
                                      </Col>
                                      <Col
                                        span={16}
                                        style={{
                                          textAlign: 'right',
                                        }}
                                      >
                                        {index ===
                                        items.length - 1 && (
                                          <Button
                                            onClick={() =>
                                              arrayHelpers.push(
                                                {
                                                  id: `D${Date.now()}`,
                                                },
                                              )
                                            }
                                            style={{
                                              marginRight: 10,
                                            }}
                                            type="primary"
                                            icon="plus"
                                          />
                                        )}
                                        <Popconfirm
                                          placement="top"
                                          onConfirm={() =>
                                            arrayHelpers.remove(
                                              index,
                                            )
                                          }
                                          okText="Yes"
                                          cancelText="No"
                                          title={`Are you sure delete this document?`}
                                        >
                                          <Button
                                            type="danger"
                                            icon="delete"
                                          />
                                        </Popconfirm>
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                  <Editor
                                    name={`documents.${index}.contentHTML`}
                                    label={
                                      fields.documents.fields
                                        .contentHTML.label
                                    }
                                    required={
                                      fields.documents.fields
                                        .contentHTML.required
                                    }
                                  />
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Evaluation criteria"
                                  >
                                    {`(>=)`}
                                  </Form.Item>
                                  <InputFormItem
                                    name={`documents.${index}.evaluation`}
                                    label={
                                      fields.documents.fields
                                        .evaluation.label
                                    }
                                    required={
                                      fields.documents.fields
                                        .evaluation.required
                                    }
                                  />
                                  <Divider />
                                </div>
                              ),
                            );
                          }}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key="2"
                        tab="Audios Element"
                      >
                        <FieldArray
                          name="audios"
                          render={(arrayHelpers) => {
                            const audios = _get(
                              form,
                              'values.audios',
                              [],
                            );

                            if (!audios.length) {
                              return (
                                <Form.Item
                                  {...formItemLayout}
                                  label="No audio"
                                >
                                  <Button
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: `A${Date.now()}`,
                                      })
                                    }
                                    style={{marginRight: 10}}
                                    type="primary"
                                    icon="plus"
                                  />
                                </Form.Item>
                              );
                            }

                            return audios.map(
                              (item, index, items) => (
                                <div
                                  key={item.id}
                                  style={{ marginBottom: 20 }}
                                >
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Audio"
                                  >
                                    <Row
                                      type="flex"
                                      justify="start"
                                    >
                                      <Col span={8}>
                                        #{item.id}
                                      </Col>
                                      <Col
                                        span={16}
                                        style={{
                                          textAlign: 'right',
                                        }}
                                      >
                                        {index ===
                                        items.length - 1 && (
                                          <Button
                                            onClick={() =>
                                              arrayHelpers.push(
                                                {
                                                  id: `A${Date.now()}`,
                                                },
                                              )
                                            }
                                            style={{
                                              marginRight: 10,
                                            }}
                                            type="primary"
                                            icon="plus"
                                          />
                                        )}
                                        <Popconfirm
                                          placement="top"
                                          onConfirm={() =>
                                            arrayHelpers.remove(
                                              index,
                                            )
                                          }
                                          okText="Yes"
                                          cancelText="No"
                                          title={`Are you sure delete this audio?`}
                                        >
                                          <Button
                                            type="danger"
                                            icon="delete"
                                          />
                                        </Popconfirm>
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                  <InputFormItem
                                    name={`audios.${index}.url`}
                                    label={
                                      fields.audios.fields.url
                                        .label
                                    }
                                    required={
                                      fields.audios.fields.url
                                        .required
                                    }
                                  />
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Evaluation criteria"
                                  >
                                    {`(>=)`}
                                  </Form.Item>
                                  <InputFormItem
                                    name={`audios.${index}.evaluation`}
                                    label={
                                      fields.audios.fields
                                        .evaluation.label
                                    }
                                    required={
                                      fields.audios.fields
                                        .evaluation.required
                                    }
                                  />
                                  <Divider />
                                </div>
                              ),
                            );
                          }}
                        />
                      </Tabs.TabPane>
                      <Tabs.TabPane
                        key="3"
                        tab="Videos Element"
                      >
                        <FieldArray
                          name="videos"
                          render={(arrayHelpers) => {
                            const videos = _get(
                              form,
                              'values.videos',
                              [],
                            );

                            if (!videos.length) {
                              return (
                                <Form.Item
                                  {...formItemLayout}
                                  label="No video"
                                >
                                  <Button
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: `V${Date.now()}`,
                                      })
                                    }
                                    style={{marginRight: 10}}
                                    type="primary"
                                    icon="plus"
                                  />
                                </Form.Item>
                              );
                            }

                            return videos.map(
                              (item, index, items) => (
                                <div
                                  key={item.id}
                                  style={{ marginBottom: 20 }}
                                >
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Video"
                                  >
                                    <Row
                                      type="flex"
                                      justify="start"
                                    >
                                      <Col span={8}>
                                        #{item.id}
                                      </Col>
                                      <Col
                                        span={16}
                                        style={{
                                          textAlign: 'right',
                                        }}
                                      >
                                        {index ===
                                        items.length - 1 && (
                                          <Button
                                            onClick={() =>
                                              arrayHelpers.push(
                                                {
                                                  id: `V${Date.now()}`,
                                                },
                                              )
                                            }
                                            style={{
                                              marginRight: 10,
                                            }}
                                            type="primary"
                                            icon="plus"
                                          />
                                        )}
                                        <Popconfirm
                                          placement="top"
                                          onConfirm={() =>
                                            arrayHelpers.remove(
                                              index,
                                            )
                                          }
                                          okText="Yes"
                                          cancelText="No"
                                          title={`Are you sure delete this video?`}
                                        >
                                          <Button
                                            type="danger"
                                            icon="delete"
                                          />
                                        </Popconfirm>
                                      </Col>
                                    </Row>
                                  </Form.Item>
                                  <InputFormItem
                                    name={`videos.${index}.url`}
                                    label={
                                      fields.videos.fields.url
                                        .label
                                    }
                                    required={
                                      fields.videos.fields.url
                                        .required
                                    }
                                  />
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Evaluation criteria"
                                  >
                                    {`(>=)`}
                                  </Form.Item>
                                  <InputFormItem
                                    name={`videos.${index}.evaluation`}
                                    label={
                                      fields.videos.fields
                                        .evaluation.label
                                    }
                                    required={
                                      fields.videos.fields
                                        .evaluation.required
                                    }
                                  />
                                  <Divider />
                                </div>
                              ),
                            );
                          }}
                        />
                      </Tabs.TabPane>
                    </Tabs>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    key="3"
                    tab="Constraints"
                  >
                    <SwitchFormItem
                      name={fields.completionRequired.name}
                      label={
                        fields.completionRequired.label
                      }
                    />
                    <TaskAutocompleteFormItem
                      name={fields.prerequisite.name}
                      label={fields.prerequisite.label}
                      required={fields.prerequisite.required}
                      showCreate={!this.props.modal}
                      form={form}
                      mode="multiple"
                    />
                  </Tabs.TabPane>
                </Tabs>

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    onClick={form.handleSubmit}
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>

                  {this.props.onCancel ? (
                    <Button
                      disabled={saveLoading}
                      onClick={() => this.props.onCancel()}
                      icon="close"
                    >
                      {i18n('common.cancel')}
                    </Button>
                  ) : null}
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }

  render() {
    const { isEditing, findLoading, record } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (isEditing && !record) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

export default TaskForm;
