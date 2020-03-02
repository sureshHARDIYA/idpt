import React, { Component } from 'react'
import ContentWrapper from 'view/layout/styles/ContentWrapper'
import Breadcrumb from 'view/shared/Breadcrumb'
import { i18n } from 'i18n'
import actions from 'modules/record/view/recordViewActions'
import { connect } from 'react-redux'
import selectors from 'modules/record/view/recordViewSelectors'
import RecordTaskView from 'view/record/task/RecordTaskView'
import BoxWrapper from 'view/shared/styles/BoxWrapper'

import _get from 'lodash/get'
import _find from 'lodash/find'

class RecordPage extends Component {
  componentDidMount () {
    const { dispatch, match } = this.props
    dispatch(actions.doFind(match.params.id, { task: match.params.taskId }))
  }

  render () {
    const { match, record, loading } = this.props
    const casedName = _get(record, 'host.name')
    const { taskId: id } = match.params

    const module = _get(record, 'roadmap', []).find(
      m => _find(m.children, { id })
    )
    const moduleName = _get(module, 'host.name')
    const task = _find(_get(module, 'children', []), { id })

    if (module) {
      module.parent = record
    }

    if (task) {
      task.parent = module
    }

    return (
      <React.Fragment>
        <Breadcrumb
          items={
            [
              [ i18n('home.menu'), '/' ],
              [ i18n('entities.record.menu'), '/record' ],
              !!casedName && [ casedName, `/record/${match.params.id}` ],
              !!moduleName &&
                [
                  moduleName,
                  `/record/${match.params.id}/module/${module.id}`
                ],
              [ i18n('entities.record.task.title') ]
            ].filter(i => i)
          }
        />
        <ContentWrapper>
          <RecordTaskView task={task} loading={loading} />
          <p>
            Show all element and content of task in below
          </p>
          <BoxWrapper>
            Text: put content
          </BoxWrapper>
          <BoxWrapper>
            Audio: put content
          </BoxWrapper>
          <BoxWrapper>
            Video: put content
          </BoxWrapper>
          <BoxWrapper>
            Activity: put content
          </BoxWrapper>
          <BoxWrapper>
            Assignment: put content
          </BoxWrapper>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}

function select (state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state)
  }
}

export default connect(select)(RecordPage)
