import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import scoredDataSelectors from 'modules/scoredData/scoredDataSelectors';
import selectors from 'modules/scoredData/list/scoredDataListSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/scoredData/list/scoredDataListActions';
import destroyActions from 'modules/scoredData/destroy/scoredDataDestroyActions';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import destroySelectors from 'modules/scoredData/destroy/scoredDataDestroySelectors';

class ScoredDataToolbar extends Component {
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

        {/*
        Analyzed data should not be manually created

        {this.props.hasPermissionToCreate && (
          <Link to="/scoredData/new">
            <Button type="primary" icon="plus" size="large">
              {i18n('common.new')}
            </Button>
          </Link>
        )}
        */}
        
        {this.props.hasPermissionToImport && (
          <Link to="/scoredData/importer">
            <Button type="primary" icon="upload" size="large">
              {i18n('common.import')}
            </Button>
          </Link>
        )}

        {this.props.hasPermissionToImport && (
          <Link to="/scoredData/wearableDataImporter">
            <Button type="primary" icon="upload" size="large">
              {i18n('common.wearableData')}
            </Button>
          </Link>
        )}

        {this.props.hasPermissionToImport && (
          <Link to="/scoredData/graphForm">
            <Button type="primary" icon="line-chart" size="large">
              {i18n('common.graph')}
            </Button>
          </Link>
        )}

        {this.renderDestroyButton()}

        {this.props.hasPermissionToAuditLogs && (
          <Link to="/audit-logs?entityNames=scoredData">
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
    hasPermissionToEdit: scoredDataSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: scoredDataSelectors.selectPermissionToDestroy(
      state,
    ),
    hasPermissionToCreate: scoredDataSelectors.selectPermissionToCreate(
      state,
    ),
    hasPermissionToImport: scoredDataSelectors.selectPermissionToImport(
      state,
    ),
  };
}

export default connect(select)(ScoredDataToolbar);
