import React, { Component } from "react";
import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { connect } from "react-redux";
import actions from "modules/customer/form/customerFormActions";
import selectors from "modules/customer/form/customerFormSelectors";
import FormWrapper, { tailFormItemLayout } from "views/shared/styles/FormWrapper";
import Spinner from 'views/shared/Spinner';
import InputFormItem, { InputFormItemNotFast } from 'views/shared/forms/items/InputFormItem';
import ViewFormItem from "views/shared/forms/items/ViewFormItem";
import * as yup from 'yup';

class CustomerForm extends Component {
    schema = yup.object().shape({
        name: yup.string().trim().label('Name').required().min(3),
        email: yup.string().trim().label('Email').email().required()
    });

    componentDidMount() {
        const { dispatch, match } = this.props;

        if (this.isEditing()) {
            dispatch(actions.doFind(match.params.id));
        } else {
            dispatch(actions.doNew());
        }
    }

    isEditing = () => {
        const { match } = this.props;
        return !!match.params.id;
    }

    handleSubmit = (values) => {
        const { dispatch } = this.props;
        const { id, ...data } = this.schema.cast(values);

        if (this.isEditing()) {
            dispatch(actions.doUpdate(id, data));
        } else {
            dispatch(actions.doCreate(data));
        }
    }

    initialValues = () => {
        const record = this.props.record;

        if (this.isEditing() && record) {
            return {
                ...record
            }
        } else {
            return {
                id: 0,
                name: '',
                email: ''
            }
        }
    }

    renderForm = () => {
        const { saveLoading } = this.props;
        return (
            <FormWrapper>
                <Formik
                    initialValues={this.initialValues()}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.schema}
                >
                    {(form) => (
                        <Form onSubmit={form.handleSubmit}>
                            {this.isEditing() && (
                                <ViewFormItem
                                    name="id"
                                    label="Id"
                                />
                            )}

                            <InputFormItem
                                name="name"
                                label="Name"
                                required={true}
                            />

                            <InputFormItem
                                type="email"
                                name="email"
                                label="Email"
                                required={true}
                            />

                            <Form.Item className="form-buttons" {...tailFormItemLayout}>
                                <Button
                                    disabled={saveLoading}
                                    type="primary"
                                    htmlType="submit"
                                    icon="save"
                                >
                                    Save
                                    </Button>

                                <Button
                                    disabled={saveLoading}
                                    icon="undo"
                                    onClick={form.handleReset}
                                >
                                    Reset
                                    </Button>
                            </Form.Item>

                        </Form>
                    )}
                </Formik>
            </FormWrapper>
        )
    }

    render() {
        const { findLoading, record } = this.props;

        if (findLoading) {
            return <Spinner />
        }

        if (this.isEditing() && !record) {
            return <Spinner />
        }

        return this.renderForm();
    }
}

function select(state) {
    return {
        record: selectors.selectRecord(state),
        findLoading: selectors.selectFindLoading(state),
        saveLoading: selectors.selectSaveLoading(state)
    }
}

export default connect(select)(CustomerForm);