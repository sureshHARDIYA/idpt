import React from 'react'
import { SortableElement, sortableHandle } from 'react-sortable-hoc'
import { Card, Switch, Row, Icon, Input, Form, Col, Select } from 'antd'
import { find } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTextWidth,
  faAlignLeft,
  faCheckSquare,
  faChevronCircleDown,
  faDotCircle,
  faCheck,
  faCalendarAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import RenderOptions from './RenderOptions'

const DragHandleWrapper = styled.div`
  display: flex;
  justify: space-between;
  align-items: middle;

  &:hover {
    cursor: pointer;
  }
`

const DragHandle = sortableHandle(() => (
  <DragHandleWrapper>
    <span>:::</span>
  </DragHandleWrapper>
))

const getRule = rules => {
  let required = false
  if (rules && rules.length) {
    required = find(rules, r => r.required === true || r.required === false)
  }
  return required
}

const SortableCard = SortableElement((
  { value: { index, items, ...value }, onDelete, onChange }
) => {
    // Bubble up changes to parent.
  const handleChange = (field = '', change) => {
      // Updated schema with changes.
    const allFields = items
      // Update specific property.
    if (field) {
      allFields[index] = { ...value, [field]: change }
    } else {
        // replace property
      allFields[index] = { ...change, field: value.field }
    }
    if (onChange) onChange(allFields)
  }

  const handleOptionChange = change => {
    handleChange('options', change)
  }

  return (
    <Row type='flex' style={{ zIndex: 1000, margin: 10 }}>
      <Card
        title={<DragHandle />}
        style={{ width: '100%' }}
        actions={[
              (
                <Icon
            type='delete'
            key='delete'
            onClick={() => {
                    if (onDelete) onDelete(value)
                  }}
                />
              ),
              (
                <Switch
            checkedChildren='Required'
            unCheckedChildren='Not required'
            checked={getRule(value.rules).required}
            onChange={checked => {
                    if (value && value.rules && value.rules.length) {
                const ruleIndex = value.rules.indexOf(
                          getRule(value.rules)
                        )
                if (ruleIndex > -1) {
                          // Copy previous rule.
                        const updatedRules = value.rules
                          // Update rule
                        updatedRules[ruleIndex].required = checked
                        updatedRules[ruleIndex].message = 'Field is required'
                        handleChange('schema', updatedRules)
                      }
              }
                  }}
                />
              ),
          <Icon type='ellipsis' key='ellipsis' />
        ]}
        >
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item required label='Question'>
              {value && value.type === 'textarea' ? <Input.TextArea
                placeholder='Add Question Here'
                value={value.label || ''}
                autosize={{ minRows: 2, maxRows: 6 }}
                onChange={e => {
                  handleChange('label', e.target.value)
                }}
                    /> : <Input
                      value={value.label || ''}
                      placeholder='Add Question Here'
                      onChange={e => {
                        handleChange('label', e.target.value)
                      }}
                    />}
            </Form.Item>
            {}
            <Form.Item>
              <RenderOptions value={value} onChange={handleOptionChange} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Row>
              <Form.Item required label='Type'>
                <Select
                  value={value.type || ''}
                  style={{ width: '100%' }}
                  onSelect={selected => {
                        // On change, reset.
                    const newField = {
                        label: value.label || ``,
                        placeholder: 'Add Question Here',
                        field: value.field,
                        type: selected,
                        rules: [
                            { required: false, message: 'Field is required' }
                        ]
                      }
                    if (
                          selected === 'checkbox' ||
                            selected === 'radio' ||
                            selected === 'select'
                        ) {
                        newField.options = []
                      }
                    handleChange('', newField)
                  }}
                  >
                  <Select.Option key='input' value='input'>
                    <FontAwesomeIcon icon={faTextWidth} />
                    <span style={{ marginLeft: 10 }}>Short answer</span>
                  </Select.Option>
                  <Select.Option key='textarea' value='textarea'>
                    <FontAwesomeIcon icon={faAlignLeft} />
                    <span style={{ marginLeft: 10 }}>Paragraph</span>
                  </Select.Option>
                  <Select.Option key='radio' value='radio'>
                    <FontAwesomeIcon icon={faDotCircle} />
                    <span style={{ marginLeft: 10 }}>Multiple choice</span>
                  </Select.Option>
                  <Select.Option key='checkbox' value='checkbox'>
                    <FontAwesomeIcon icon={faCheckSquare} />
                    <span style={{ marginLeft: 10 }}>Checkboxes</span>
                  </Select.Option>
                  <Select.Option key='select' value='select'>
                    <FontAwesomeIcon icon={faChevronCircleDown} />
                    <span style={{ marginLeft: 10 }}>Dropdown</span>
                  </Select.Option>
                  <Select.Option key='date' value='date'>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span style={{ marginLeft: 10 }}>Date</span>
                  </Select.Option>
                  <Select.Option key='time' value='time'>
                    <FontAwesomeIcon icon={faClock} />
                    <span style={{ marginLeft: 10 }}>Time</span>
                  </Select.Option>
                  <Select.Option key='confirm' value='confirm'>
                    <FontAwesomeIcon icon={faCheck} />
                    <span style={{ marginLeft: 10 }}>Confirm</span>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Card>
    </Row>
  )
})

export default React.memo(SortableCard)
