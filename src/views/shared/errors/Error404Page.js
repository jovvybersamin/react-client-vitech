import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'views/shared/errors/styles/ErrorWrapper';


const Error404Page = () => {
    return (
        <ErrorWrapper>
            <div className="exception">
                <div className="imgBlock">
                    <div
                        className="imgEle"
                        style={{
                            backgroundImage: `url(/images/404.svg)`,
                        }}
                    />
                </div>
                <div className="content">
                    <h1>404</h1>
                    <div className="desc">Sorry, the page you visited does not exist</div>
                    <div className="actions">
                        <Link to="/">
                            <Button type="primary">
                                Back to Home.
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ErrorWrapper>
    );
};

export default Error404Page;
