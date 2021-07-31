import React from 'react';

const ErrorHandler = ({isError, errorMessage}) =>{
    const error = <div>
        {errorMessage}
    </div>
    return (
        isError ? error : null
    )
}
export default ErrorHandler