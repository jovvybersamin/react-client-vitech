import React, { Component } from "react";
import { Button, Col, Form, Row } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import FilterWrapper from 'views/shared/styles/FilterWrapper';
import actions from "modules/customer/list/customerListActions";
import InputFormItem from 'views/shared/forms/items/InputFormItem';
import selectors from "modules/customer/list/customerListSelectors";


class CustomerListFilter extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.doFetch(this.initialFilter()));
    }

    initialFilter = () => {
        const { filter } = this.props;
        return {
            ...filter
        }
    }

    handleReset = (form) => {
        form.setValues({});
        const { dispatch } = this.props;
        dispatch(actions.doReset());
    }

    handleSubmit = (values) => {
        const { dispatch } = this.props;
        dispatch(actions.doFetch(values));
    }

    render() {
        const { loading } = this.props;
        return (
            <FilterWrapper>
                <Formik
                    initialValues={this.initialFilter()}
                    onSubmit={this.handleSubmit}
                >
                    {(form) => (
                        <Form onSubmit={form.handleSubmit}>
                            <Row gutter={24}>
                                <Col md={24} lg={12}>
                                    <InputFormItem
                                        name="search_query"
                                        label="Search"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="filter-buttons" span={24}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon="search"
                                        loading={loading}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        htmlType="submit"
                                        onClick={() => this.handleReset(form)}
                                        icon="undo"
                                        loading={loading}
                                    >
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </FilterWrapper>
        )
    }
}


function select(state) {
    return {
        loading: selectors.selectLoading(state),
        filter: selectors.selectFilter(state)
    }
}

export default withRouter(connect(select)(CustomerListFilter));