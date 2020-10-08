import React, { useState } from 'react';
import { Radio, Button, Checkbox, Input, Col, Row } from 'antd';
import { filter, uniqBy } from 'lodash';

const RenderOptions = ({ value: { type, options = [] }, onChange }) => {
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');

  const addNewButton = (
    <Button
      type="ghost"
      title="Add"
      icon="plus"
      size="small"
      style={{ marginTop: 10 }}
      onClick={() => {
        const newOptions = [
          ...options,
          {
            field: `Option ${options.length + 1}`,
            value: ``,
            label: ``,
          },
        ];
        setClickedIndex(-1);
        onChange(newOptions);
      }}
    >
      ADD NEW
    </Button>
  );

  const onOptionsChange = newOptions => {
    newOptions.forEach((e, index) => {
      e.field = `Option ${index + 1}`;
    });
    onChange(newOptions);
  };

  const removeButton = removed => (
    <Button
      type="link"
      icon="close"
      size="small"
      style={{ marginLeft: 10 }}
      onClick={() => {
        const newOptions = filter(options, o => {
          return o.field !== removed.field;
        });
        onOptionsChange(newOptions);
      }}
    />
  );

  return (
    <div>
      {options.map((option, index) => {
        return (
          <div style={{ marginTop: '5px' }} key={index}>
            <Row type="flex" justify="start" align="middle" gutter={16}>
              <Col span={1}>
                {type === 'radio' && <Radio disabled />}
                {type === 'checkbox' && <Checkbox disabled />}
                {type === 'select' && <span>{index + 1}</span>}
              </Col>
              <Col span={10}>
                {index !== clickedIndex && (
                  <Button
                    type="dashed"
                    block
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                    onClick={() => {
                      setInputValue(option.value);
                      setClickedIndex(index);
                    }}
                  >
                    {option.value ? (
                      option.value
                    ) : (
                      <span style={{ color: '#ccc' }}>
                        {`Click to edit ${option.field}`}
                      </span>
                    )}
                  </Button>
                )}
                {index === clickedIndex && (
                  <Input
                    value={inputValue}
                    autoFocus
                    placeholder={options[clickedIndex].field}
                    style={{
                      width: 300,
                    }}
                    onBlur={() => {
                      let newOptions = options;
                      newOptions[index].value = inputValue;
                      newOptions[index].label =
                        inputValue || newOptions[index].field;
                      setClickedIndex(-1);
                      setInputValue('');
                      newOptions = uniqBy(newOptions, checkOption => {
                        if (checkOption.value === '') {
                          return checkOption.field;
                        }
                        return checkOption.value;
                      });
                      onOptionsChange(newOptions);
                    }}
                    onChange={e => {
                      setInputValue(e.target.value);
                    }}
                  />
                )}
              </Col>
              <Col span={1}>
                {index !== clickedIndex && removeButton(option)}
              </Col>
            </Row>
          </div>
        );
      })}
      {(type === 'checkbox' || type === 'radio' || type === 'select') &&
        addNewButton}
    </div>
  );
};

export default React.memo(RenderOptions);
