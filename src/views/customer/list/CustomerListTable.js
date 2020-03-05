import React, { Component } from "react";
import { connect } from 'react-redux';
import selectors from "modules/customer/list/customerListSelectors";
import actions from "modules/customer/list/customerListActions";
import { Table, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import TableWrapper from 'views/shared/styles/TableWrapper';

class CustomerListTable extends Component {

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
        loading: selectors.selectLoading(state),
        rows: selectors.selectRows(state),
        pagination: selectors.selectPagination(state)
    }
}

export default connect(select)(CustomerListTable);