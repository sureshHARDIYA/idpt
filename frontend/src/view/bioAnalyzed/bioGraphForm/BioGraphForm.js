import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import { Redirect, Link, useNavigate } from 'react-router-dom';
import PatientAutocompleteFormItem from 'view/patient/autocomplete/PatientAutocompleteFormItem';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

//const { fields } = model;
const fields = {
  patient: new RelationToOneField('patient', 'Patient', {
    required: true
  }),
}

var papabool = false;
var formValues;
//const navigate = useNavigate();

class BioGraphForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.patient,
  ]);

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.formValues = values.patient;
    console.log(this.formValues);
    console.log("YOOOO");
    this.papabool = true;
    /*history.push('/bioAnalyzed/bioGraph', {state: { hei: "yo", 
                                                    patient: this.formValues }, 
                                           replace: false});*/
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;
    return (
      <React.Fragment>
        <Route
        render={(props) => {
        if (false) {
          return(
          <Redirect
            to={{
              pathname: '/bioAnalyzed/bioGraph',
              state: { hei: "yo", 
                      patient: this.formValues },
            }}
          />
          );
        }
      }}
      />;
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={ form.handleSubmit }>
                {isEditing && (
                  <ViewFormItem
                    name={fields.id.name}
                    label={fields.id.label}
                  />
                )}
                <PatientAutocompleteFormItem
                  name={fields.patient.name}
                  label={fields.patient.label}
                  required={fields.patient.required}
                  form={form}
                />
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
                
                <Link to = {{pathname: '/bioAnalyzed/bioGraph', state: { hei: "yo", 
                                                                         patient: this.formValues }}}>
                  <Button
                    type="primary"
                    icon="upload"
                  >
                    {i18n('common.bioGraph')}
                  </Button>
                </Link>
                

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
      </React.Fragment>
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

export default BioGraphForm;
