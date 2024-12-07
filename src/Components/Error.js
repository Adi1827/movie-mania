import { useRouteError } from 'react-router-dom';

const Error = () =>{
    const { status , statusText } = useRouteError();
    return (
    <>
        <h1>Oops!</h1><br/>
        <h3>{status}:{statusText}</h3>
    </>
)
}

export default Error;