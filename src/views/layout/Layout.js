import React from "react";
import { Layout as AntLayout } from 'antd';
import LayoutWrapper from "views/layout/styles/LayoutWrapper";
import Menu from "views/layout/Menu";
import Header from "views/layout/Header";
const { Content } = AntLayout;

const Layout = (WrappedComponent) => (props) => (
    <LayoutWrapper>
        <Menu url={props.match.url} />
        <AntLayout theme="light">
            <Header />
            <Content>
                <WrappedComponent {...props} />
            </Content>
        </AntLayout>
    </LayoutWrapper>

)

export default Layout;