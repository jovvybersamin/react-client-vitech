import React from "react";

import ContentWrapper from 'views/layout/styles/ContentWrapper';
import PageTitle from "views/shared/styles/PageTitle";
import Layout from "views/layout/Layout";
import Breadcrumb from "views/shared/Breadcrumb";
import CustomerListTable from "views/customer/list/CustomerListTable";
import CustomerListFilter from 'views/customer/list/CustomerListFilter';
import CustomerListToolbar from 'views/customer/list/CustomerListToolbar';

const CustomerListPage = (props) => {
    return (
        <React.Fragment>
            <Breadcrumb items={[
                ['Home', '/'],
                ['Customers']
            ]} />

            <ContentWrapper>
                <PageTitle>
                    Customers
                </PageTitle>

                <CustomerListToolbar />
                <CustomerListFilter />
                <CustomerListTable />
            </ContentWrapper>
        </React.Fragment>
    )
}

export default Layout(CustomerListPage);