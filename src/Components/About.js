import { Outlet,Link } from "react-router-dom";

const About = () => {
    return (
        <>
        <h1>About</h1>
        <Link to='profile'>Profile?</Link>
        <Outlet/>
        </>
    )
}
export default About;