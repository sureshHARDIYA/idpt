import { Table, Popconfirm } from 'antd';
import { i18n } from 'i18n';
import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { Link, withRouter } from 'react-router-dom';

const { fields } = model;

class RecordModuleTable extends Component {
  columns = (parentId) => [
    fields['roadmap.host'].forTable({
      render: (_, record) => record.host.name
    }),
    fields['roadmap.completionRequired'].forTable({
      width: 150,
      render: (_, record) => record.completionRequired ? 'True' : 'False'
    }),
    fields['roadmap.state'].forTable({
      width: 100,
      render: (_, record) => record.state
    }),
    {
      title: '',
      dataIndex: 'id',
      width: '80px',
      render: (id, record) => ({
        RecorcRoadmapContainer: (
          <div className="table-actions">
            <Link to={`/record/${parentId}/task/${id}`}>
              {i18n('entities.task.single')}
            </Link>
          </div>
        ),
      })[record.__typename],
    }
  ];

  render() {
    const module = this.props.module || {};

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          columns={this.columns(this.props.match.params.id)}
          dataSource={module.children || []}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

export default withRouter(RecordModuleTable)
