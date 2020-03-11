import React, { Component } from "react";
import { connect } from 'react-redux';
import moment from "moment";
import selectors from "modules/customer/list/customerListSelectors";
import destroySelectors from "modules/customer/destroy/customerDestroySelectors";
import actions from "modules/customer/list/customerListActions";
import destroyActions from "modules/customer/destroy/customerDestroyActions";
import { Table, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import TableWrapper from 'views/shared/styles/TableWrapper';
import ButtonLink from 'views/shared/styles/ButtonLink';

class CustomerListTable extends Component {

    doDestroy = (id) => {
        const { dispatch } = this.props;
        dispatch(destroyActions.doDestroy(id, true));
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: (name, record) => <Link to={`/customers/${record.id}/edit`} >{name}</Link>,
            width: '40%',
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            render: (value) => moment(value).format('YYYY-MM-DD hh:mm a'),
            sorter: true,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            render: (value) => moment(value).format('YYYY-MM-DD hh:mm a'),
            sorter: true,
        },
        {
            title: '',
            dataIndex: '',
            width: '160px',
            render: (_, record) => (
                <div className="table-actions">
                    <Link to={`/customers/${record.id}/edit`}>Edit</Link>
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={() => this.doDestroy(record.id)}
                        okText="Yes"
                        noText="No"
                    >
                        <ButtonLink>
                            Delete
                        </ButtonLink>
                    </Popconfirm>
                </div>
            )
        }
    ];

    handleTableChange = (pagination, filters, sorter) => {
        const { dispatch } = this.props;

        console.log(sorter);

        dispatch(
            actions.doChangePaginationAndSort(pagination, sorter)
        )
    }

    render() {
        const { loading, rows, pagination } = this.props;
        return (
            <TableWrapper>
                <Table
                    rowKey={record => {
                        return record.id;
                    }}
                    loading={loading}
                    columns={this.columns}
                    dataSource={rows}
                    pagination={pagination}
                    onChange={this.handleTableChange}
                    scroll={{ x: true }}


                />
            </TableWrapper>
        )
    }
}

function select(state) {
    return {
        loading: selectors.selectLoading(state) || destroySelectors.selectLoading(state),
        rows: selectors.selectRows(state),
        pagination: selectors.selectPagination(state)
    }
}

export default connect(select)(CustomerListTable);