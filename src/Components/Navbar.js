import { Link } from "react-router-dom";
import logo from "../assets/img/moviemania_Logo.webp"
import { useState }  from "react";
// import Login from  './LogIn';

const Navbar = () =>{
    const Title = () =>(
        <Link to="./"><img src={logo} className="site-logo" alt="Image"/></Link>
    )
    
    return (
        <>
    <div className="header">
        <Title className="titleImg"/>
     <div className="navbar" >
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='./About'>About</Link></li>
        <li><Link to='./Contact'>Contact</Link></li>
      </ul>
     </div>
    </div>
    </>
    );
}
    
    export default Navbar;