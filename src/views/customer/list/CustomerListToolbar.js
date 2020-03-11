import React from "react";
import Toolbar from "views/shared/styles/Toolbar";
import { Button } from 'antd';
import { Link } from "react-router-dom"
import { connect } from "react-redux";

const CustomerListToolbar = () => {
    return (
        <Toolbar>
            <Link to="/customers/create">
                <Button type="primary" icon="plus">
                    New
                </Button>
            </Link>
        </Toolbar>
    )
}

export default connect()(CustomerListToolbar);
