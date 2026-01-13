import { useRouteError } from 'react-router-dom';

const Error = () => {
    const { status, statusText } = useRouteError();
    return (
        <>
            <h1 className='text-5xl font-bold text-center mt-24'>Oops!</h1><br />
            <h3 className='text-2xl text-center pt-4'>{status} : {statusText}</h3>
        </>
    )
}

export default Error;