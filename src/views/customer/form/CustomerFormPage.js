import React, { Component } from "react";
import Layout from 'views/layout/Layout';
import ContentWrapper from 'views/layout/styles/ContentWrapper';
import PageTitle from 'views/shared/styles/PageTitle';
import Breadcrumb from "views/shared/Breadcrumb";
import CustomerForm from "views/customer/form/CustomerForm";

class CustomerFormPage extends Component {
    isEditing = () => {
        const { match } = this.props;
        return !!match.params.id;
    }

    title = () => {
        return this.isEditing() ? 'Edit Customer' : 'New Customer';
    }

    render() {
        return (
            <React.Fragment>
                <Breadcrumb items={[
                    ['Home', '/'],
                    ['Customers', '/customers'],
                    [this.title()]
                ]} />
                <ContentWrapper>
                    <PageTitle>{this.title()}</PageTitle>

                    <CustomerForm match={this.props.match} />
                </ContentWrapper>
            </React.Fragment>
        )
    }
}

export default Layout(CustomerFormPage);