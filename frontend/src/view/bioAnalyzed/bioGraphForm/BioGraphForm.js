import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import ViewFormItem from 'view/shared/form/items/ViewFormItem';
import Spinner from 'view/shared/Spinner';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import FormSchema from 'view/shared/form/formSchema';
import { Redirect } from 'react-router-dom';
import PatientAutocompleteFormItem from 'view/patient/autocomplete/PatientAutocompleteFormItem';
import RelationToOneField from 'modules/shared/fields/relationToOneField';

const fields = {
  patient: new RelationToOneField('patient', 'Patient', {
    required: true
  }),
}

class BioGraphForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.patient,
  ]);
  
  constructor(props) {
    super(props);
    this.state = {
      toRedirect: false,
      patientInfo: null
    };
  }
  
  handleSubmit = (values) => {
    const { id, ...data } = this.schema.cast(values);
    this.setState({ 
      toRedirect : true,
      patientInfo: {
        id: values.patient['id'],
        fullName: values.patient['label'].split(' ')[0]
      }
    });
  };
  
  initialValues = () => {
    const record = this.props.record;
    return this.schema.initialValues(record || {});
  };
  
  redirectToGraph = () => {
    return(
      <Redirect
      to={{
        pathname: '/bioAnalyzed/bioGraph',
        state: { 
          patient: this.state.patientInfo,
          userIsPatient: false,
        },
      }}
      />
      );
    };

    renderForm() {
      const { saveLoading, isEditing } = this.props;
      if (this.state.toRedirect) {
        return(
          this.redirectToGraph()
          );
        }
        else {
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
                  icon="search"
                  >
                  {i18n('common.search')}
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
            