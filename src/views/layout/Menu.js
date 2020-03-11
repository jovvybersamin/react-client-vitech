import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    Layout as AntLayout,
    Menu as AntMenu,
    Icon,
} from 'antd';
import { Link } from "react-router-dom";
import SideWrapper from './styles/SideWrapper';
import routes from "views/routes";
const { Sider } = AntLayout;



const Menu = (props) => {

    const selectedKeys = () => {
        const url = props.url;

        const match = routes.privateRoutes.find((option) => {

            if (option.menu.exact) {
                return url === option.path;
            }

            return url.startsWith(option.path);
        });



        if (match) {

            // if (match.parent) {
            //     return [match.parent];
            // }

            return [match.path];
        }

        return null;
    }

    return (
        <SideWrapper
            style={{
                display: props.menuVisible ? 'block' : 'none'
            }}
        >
            <Sider theme="light" trigger={null}>
                <div className="logo">
                    <h2>Vitech</h2>
                </div>
                <AntMenu
                    theme="light"
                    mode="inline"
                    selectedKeys={selectedKeys()}
                >
                    {routes.privateRoutes
                        .filter((privateRoute) => !!privateRoute.menu)
                        .map((privateRoute) => (
                            <AntMenu.Item key={privateRoute.path}>
                                <Link to={privateRoute.path}>
                                    <Icon type={privateRoute.icon} />
                                    <span>{privateRoute.label}</span>
                                </Link>
                            </AntMenu.Item>
                        ))
                    }
                </AntMenu>
            </Sider>
        </SideWrapper>
    )
}

const mapStateToProps = ({ layout }) => ({
    menuVisible: layout.menuVisible
});

export default connect(mapStateToProps)(Menu);