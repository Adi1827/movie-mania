import { Link } from "react-router-dom";
import logo from "../assets/img/moviemania_Logo.webp"

const Navbar = () =>{
    const Title = () =>(
        <Link to="./">
            <img src={logo} className="w-20 rounded-full shadow-xl" alt="Image"/>
        </Link>
    )
    
    return (
        <>
    <div className="flex m-2">
        <Title/>
     <div> {/* This is the Navbar */}
      <ul className="flex mx-8 my-4 space-x-6 font-extrabold text-3xl">
        <li className="ease-in-out duration-500 hover:[text-shadow:1px_0_10px]"><Link to='/'>Home</Link></li>
        <li className="ease-in-out duration-500 hover:[text-shadow:1px_0_10px]"><Link to='./About'>About</Link></li>
        <li className="ease-in-out duration-500 hover:[text-shadow:1px_0_10px]"><Link to='./Contact'>Contact</Link></li>
      </ul>
     </div>
    </div>
    </>
    );
}
    
    export default Navbar;