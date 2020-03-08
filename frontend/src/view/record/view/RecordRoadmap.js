import { Table } from 'antd';
import { i18n } from 'i18n';
import model from 'modules/record/recordModel';
import React, { Component } from 'react';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { Link } from 'react-router-dom';

const { fields } = model;

class RecordListTable extends Component {
  columns = [
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
      render: (_, record) => ({
        RecorcRoadmap: (
          <div className="table-actions">
            <Link to={`/roadmaps/${record.id}`}>
              {i18n('entities.module.single')}
            </Link>
          </div>
        ),
        RecorcRoadmapContainer: (
          <div className="table-actions">
            <Link to={`/epics/${record.id}`}>
              {i18n('entities.task.single')}
            </Link>
          </div>
        ),
      }[record.__typename]),
    }
  ];

  render() {
    const record = this.props.record || {};

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={record.roadmaps || []}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

export default RecordListTable
