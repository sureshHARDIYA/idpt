import React, { useState } from 'react';
import { Tabs } from 'antd';

import FormBuilder from './FormBuilder/builder';
import FormRenderer from './FormRenderer';

const { TabPane } = Tabs;

const App = (props) => {
  const [formSchema, setFormSchema] = useState({});
  const [data, setData] = useState({});

  return (
    <Tabs type="card">
      <TabPane tab="Form Builder" key="1">
        <FormBuilder
          formStructure={formSchema}
          onSave={(schema) => {
            setFormSchema(schema);
          }}
          onError={(error) => console.log(error)}
          {...props}
        />
      </TabPane>
      <TabPane tab="Form Preview" key="2">
        {props.record && (
          <FormRenderer
            allowDraft
            formStructure={props.record && props.record}
            data={data}
            onSave={(changedData) => {
              setData(changedData);
            }}
            onError={(error) => console.log(error)}
            {...props}
          />
        )}
        {!props.record && (
          <span>
            First create form and save to preview it.
          </span>
        )}
      </TabPane>
      <TabPane tab="JSON Schema viewer" key="3">
        <div className="column">
          <div>
            <h1>Submitted form data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <div>
            <h1>Form schema</h1>
            <pre>
              {JSON.stringify(
                props.record && props.record.formSchema,
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default App;
