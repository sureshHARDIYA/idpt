import { i18n } from 'i18n';
import { Table } from 'antd';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import ButtonLink from 'view/shared/styles/ButtonLink';
import TableWrapper from 'view/shared/styles/TableWrapper';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';
import model from 'modules/assignmentResponse/assignmentResponseModel';
import casedSelectors from 'modules/assignmentResponse/assignmentResponseSelectors';
import selectors from 'modules/assignmentResponse/list/assignmentResponseListSelectors';
import actions from 'modules/assignmentResponse/list/assignmentResponseListActions';

const { fields } = model;

class AssignmentResponseListTable extends Component {
  state = {
    selectedValues: null,
  };

  onAuditLogViewModalClose() {
    this.setState({ selectedValues: null });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      actions.doFetch(),
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  columns = [
    fields.id.forTable(),
    {
      title: 'Assignment',
      dataIndex: 'assignmentID',
      render: (_, record) => {
        const assignmentID = _get(record, 'assignmentID[0]')

        return assignmentID ? (<div><Link to={`/assignments/${assignmentID.id}/edit`}>{assignmentID.title}</Link></div>) : null;
       }
    },
    fields.createdAt.forTable(),
    fields.formData.forTable({
      title: null,
      render: (values) => {
        return (
          <ButtonLink
            onClick={() =>
              this.setState({
                selectedValues: values
              })
            }
          >
            {i18n('common.view')}
          </ButtonLink>
        );
      },
    }),
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
      <React.Fragment>
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
      <AuditLogViewModal
        visible={!!this.state.selectedValues}
        code={this.state.selectedValues}
        onCancel={() => this.onAuditLogViewModalClose()}
      />
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: casedSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: casedSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(AssignmentResponseListTable);
