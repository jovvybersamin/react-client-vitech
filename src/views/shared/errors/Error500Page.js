import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ErrorWrapper from 'views/shared/errors/styles/ErrorWrapper';

const Error500Page = () => {
    return (
        <ErrorWrapper>
            <div className="exception">
                <div className="imgBlock">
                    <div
                        className="imgEle"
                        style={{
                            backgroundImage: `url(/images/500.svg)`,
                        }}
                    />
                </div>
                <div className="content">
                    <h1>500</h1>
                    <div className="desc">Sorry, the server is reporting an error</div>
                    <div className="actions">
                        <Link to="/">
                            <Button type="primary">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </ErrorWrapper>
    );
};

export default Error500Page;
