import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Row, Col, Card } from 'antd';
import Layout from 'views/layout/Layout';

const HomePage = (props) => {
    return (
        <Row>
            <Col md={12}>
                <Card>
                    <h1>Home</h1>
                </Card>
            </Col>
        </Row>
    )
}

export default withRouter(connect()(Layout(HomePage)));