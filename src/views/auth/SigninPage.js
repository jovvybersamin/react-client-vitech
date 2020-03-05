import React, { useState } from "react";
import { connect } from "react-redux"
import { Formik } from "formik";
import { Button, Form } from "antd";
import * as yup from 'yup';
import SigninPageWrapper from 'views/auth/styles/SigninPageWrapper';
import InputFormItem, { InputFormItemNotFast } from "views/shared/forms/items/InputFormItem";
import Content from 'views/auth/styles/Content';
import actions from "modules/auth/authActions";


const SigninPage = ({ dispatch, errorMessage, loading }) => {
    const schema = () => {
        return yup.object().shape({
            email: yup
                .string()
                .trim()
                .label('Email')
                .email()
                .required(),
            password: yup
                .string()
                .trim()
                .label('Password')
                .required()
        });
    }

    const initialValues = () => {
        return {
            email: '',
            password: ''
        };
    }

    const handleSubmit = ({ email, password }, { setSubmitting }) => {
        dispatch(actions.doSigninWithEmailAndPassword(email, password));
    }

    return (
        <SigninPageWrapper>
            <Content>
                <h1>Login</h1>
                <p>Enter your System Credentials</p>
                <Formik
                    initialValues={initialValues()}
                    validationSchema={schema()}
                    onSubmit={handleSubmit}
                >
                    {(form) => (
                        <Form onSubmit={form.handleSubmit}>
                            <InputFormItemNotFast
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                                size="large"
                                autoFocus
                                errorMessage={errorMessage}
                                layout={null}
                                form={form}
                            />

                            <InputFormItem
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="password"
                                size="large"
                                layout={null}
                            />

                            <Button
                                disabled={form.isValid === false}
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                                loading={loading}
                            >
                                Sign in
                            </Button>

                            <pre style={{ marginTop: '20px' }}>
                                {JSON.stringify(form.values, null, 2)}
                            </pre>
                        </Form>
                    )}
                </Formik>
            </Content>
        </SigninPageWrapper>
    )
}


const mapStateToProps = ({ auth }) => ({
    errorMessage: auth.errorMessage,
    loading: auth.loading
})

export default connect(mapStateToProps)(SigninPage);