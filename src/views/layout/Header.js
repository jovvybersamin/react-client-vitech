import React from "react";
import { Icon, Layout, Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';
import HeaderWrapper from 'views/layout/styles/HeaderWrapper';
import layoutActions from "modules/layout/layoutActions";
import authActions from "modules/auth/authActions";
const { Header: AntHeader } = Layout;

const Header = ({ dispatch }) => {


    const handleToggleMenu = () => {
        dispatch(layoutActions.doToggleMenu());
    }


    const handleLogout = () => {
        dispatch(authActions.doSignout());
    }

    const userMenu = () => (
        <Menu selectedKeys={[]}>
            <Menu.Item
                onClick={null}
                key="userCenter"
            >
                <Icon type="user" />
                Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={handleLogout} key="logout">
                <Icon type="logout" />
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <HeaderWrapper>
            <AntHeader theme="light">
                <Icon
                    className="trigger"
                    type="menu-unfold"
                    onClick={handleToggleMenu}
                />
                <div>

                    <Dropdown
                        className="user-dropdown"
                        overlay={userMenu}
                    >
                        <span>
                            <Avatar
                                className="user-dropdown-avatar"
                                size="small"
                                src={
                                    undefined ||
                                    undefined
                                }
                                alt="avatar"
                            />
                            <span className="user-dropdown-text">
                                Jovvy Bersamin
                            </span>
                        </span>
                    </Dropdown>
                </div>
            </AntHeader>
        </HeaderWrapper >
    )
}


export default connect()(Header);