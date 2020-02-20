import { Table, Popconfirm } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/task/list/taskListActions';
import destroyActions from 'modules/task/destroy/taskDestroyActions';
import selectors from 'modules/task/list/taskListSelectors';
import destroySelectors from 'modules/task/destroy/taskDestroySelectors';
import model from 'modules/task/taskModel';
import taskSelectors from 'modules/task/taskSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import ModuleListItem from 'view/module/list/ModuleListItem';
import DocumentListItem from 'view/document/list/DocumentListItem';

const { fields } = model;

class TaskListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.name.forTable(),
    fields.description.forTable(),
    fields.status.forTable(),
    fields.tags.forTable(),
    fields.points.forTable(),
    fields.completionRequired.forTable(),
    fields.complexityLevel.forTable(),
    fields.type.forTable(),
    fields.owner.forTable({
      render: (value) => <ModuleListItem value={value} />,
    }),
    fields.elements.forTable({
      render: (value) => <DocumentListItem value={value} />,
    }),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/task/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/task/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: taskSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: taskSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(TaskListTable);
