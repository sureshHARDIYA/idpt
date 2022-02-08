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
import { Redirect, Link, useNavigate, Route } from 'react-router-dom';
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

  constructor() {    
    this.state = {      
      fififi: null,      
      pappaBolle: false    
    }; 
  }

  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    formValues = values.patient;
    //this.fififi = values.patient;
    this.setState({fififi : values.patient,
                   pappaBolle : true }, () => { this.forceUpdate(); });
    console.log(this.state.fififi);
    console.log("YOOOO");
    papabool = true;
    //this.pappaBolle = true;
    console.log("3 " + papabool);
    console.log("4 " + this.state.pappaBolle);
    
    /*history.push('/bioAnalyzed/bioGraph', {state: { hei: "yo", 
                                                    patient: this.formValues }, 
                                           replace: false});*/
  };

  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };

  damn = () => {
    const { saveLoading, isEditing } = this.props;
    console.log("1 " + papabool);
    console.log("2 " + this.state.pappaBolle);
    if (this.state.pappaBolle) {
      console.log("HEEEI");
      return(
      <Redirect
        to={{
          pathname: '/bioAnalyzed/bioGraph',
          state: { hei: "yo", 
                   patient: this.state.fififi },
        }}
      />
      );
    } else {
      return(
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
                                                                         patient: this.fififi }}}>
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
      );
    }
  };

  renderForm() {
    const { saveLoading, isEditing } = this.props;
    return (
      this.damn()
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
