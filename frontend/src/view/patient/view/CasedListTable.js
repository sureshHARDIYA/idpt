import { Table } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/patient/view/patientViewActions';
import destroyActions from 'modules/cased/destroy/casedDestroyActions';
import model from 'modules/cased/casedModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ImagesListView from 'view/shared/list/ImagesListView';

import selectors from 'modules/patient/view/patientViewSelectors';

const { fields } = model;

class CasedListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  columns = [
    fields.name.forTable(),
    fields.status.forTable(),
    fields.featuredImage.forTable({
      render: (value) => <ImagesListView value={value} />,
    }),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/cased/${record.id}`}>
            {i18n('common.view')}
          </Link>
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

const select = (state) => ({
  rows: selectors.selectRows(state),
  filter: selectors.selectFilter(state),
  loading: selectors.selectLoading(state),
  pagination: selectors.selectPagination(state),
  selectedKeys: selectors.selectSelectedKeys(state),
})

export default connect(select)(CasedListTable);
