import React from 'react';

const ErrorHandler = ({isError, errorMessage}) =>{
    const error = <div>
        {errorMessage}
    </div>
    console.log(isError)
    return (
        isError ? error : null
    )
}
export default ErrorHandler