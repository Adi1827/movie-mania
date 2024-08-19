import { useRouteError } from 'react-router-dom';

const Error = (err) =>{
    const errors = err;
    console.log(useRouteError());
    console.log(errors);
    const { status , statusText } = useRouteError();
    return (
    <>
        <h1>Oops!</h1>
        <h3>{status}:{statusText}</h3>
    </>
)
}

export default Error;