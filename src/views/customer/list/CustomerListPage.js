import React from "react";

import ContentWrapper from 'views/layout/styles/ContentWrapper';
import PageTitle from "views/shared/styles/PageTitle";
import Layout from "views/layout/Layout";
import CustomerListTable from "views/customer/list/CustomerListTable";
import CustomerListFilter from 'views/customer/list/CustomerListFilter';

const CustomerListPage = (props) => {
    return (
        <React.Fragment>
            <ContentWrapper>
                <PageTitle>
                    Customers
                </PageTitle>

                <CustomerListFilter />
                <CustomerListTable />
            </ContentWrapper>
        </React.Fragment>
    )
}

export default Layout(CustomerListPage);