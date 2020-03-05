import React from "react";
import ProgressBar from 'views/shared/ProgressBar';

const LoadingIndicator = () => {

    React.useEffect(() => {
        ProgressBar.start();
        return () => ProgressBar.done();
    }, [])

    return null;
}

export default LoadingIndicator;