import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import taskSelectors from 'modules/task/taskSelectors';
import selectors from 'modules/task/list/taskListSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/task/list/taskListActions';
import destroyActions from 'modules/task/destroy/taskDestroyActions';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import destroySelectors from 'modules/task/destroy/taskDestroySelectors';

class TaskToolbar extends Component {
  doExport = () => {
    const { dispatch } = this.props;
    dispatch(actions.doExport());
  };

  doDestroyAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(
      destroyActions.doDestroyAll(this.props.selectedKeys),
    );
  };

  renderExportButton() {
    const { hasRows, loading, exportLoading } = this.props;

    const disabled = !hasRows || loading;

    const button = (
      <Button
        disabled={disabled}
        icon="file-excel"
        onClick={this.doExport}
        loading={exportLoading}
        size="large"
      >
        {i18n('common.export')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.noDataToExport')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  renderDestroyButton() {
    const {
      selectedKeys,
      destroyLoading,
      loading,
      hasPermissionToDestroy,
    } = this.props;

    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        disabled={disabled}
        loading={destroyLoading}
        type="primary"
        icon="delete"
        size="large"
      >
        {i18n('common.destroy')}
      </Button>
    );

    const buttonWithConfirm = (
      <Popconfirm
        title={i18n('common.areYouSure')}
        onConfirm={() => this.doDestroyAllSelected()}
        okText={i18n('common.yes')}
        cancelText={i18n('common.no')}
      >
        {button}
      </Popconfirm>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return buttonWithConfirm;
  }

  render() {
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/task/new">
            <Button type="primary" icon="plus" size="large">
              {i18n('common.new')}
            </Button>
          </Link>
        )}

        {this.props.hasPermissionToImport && (
          <Link to="/task/importer">
            <Button type="primary" icon="upload" size="large">
              {i18n('common.import')}
            </Button>
          </Link>
        )}

        {this.renderDestroyButton()}

        {this.props.hasPermissionToAuditLogs && (
          <Link to="/audit-logs?entityNames=task">
            <Button icon="file-search" size="large">
              {i18n('auditLog.menu')}
            </Button>
          </Link>
        )}

        {this.renderExportButton()}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    selectedKeys: selectors.selectSelectedKeys(state),
    loading: selectors.selectLoading(state),
    destroyLoading: destroySelectors.selectLoading(state),
    exportLoading: selectors.selectExportLoading(state),
    hasRows: selectors.selectHasRows(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEdit: taskSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: taskSelectors.selectPermissionToDestroy(
      state,
    ),
    hasPermissionToCreate: taskSelectors.selectPermissionToCreate(
      state,
    ),
    hasPermissionToImport: taskSelectors.selectPermissionToImport(
      state,
    ),
  };
}

export default connect(select)(TaskToolbar);
