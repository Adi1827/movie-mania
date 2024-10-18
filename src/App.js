import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact'
import Error from './Components/Error';
import MovieInfo from './Components/MovieInfo';
import Login from './Components/Login';
import Profile from './Components/Profile';
import ProfileClass from './Components/ProfileClass';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { Outlet } from "react-router-dom";

const AppLayout = () =>{
    return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
)
}

const routerConfig = createBrowserRouter([
  {
    path:'/',
    element : <AppLayout/>,
    errorElement : <Error/>,
    children : [
      {
        path:'/',
        element:<Body/>
      },
      {
        path:'/about',
        element:<About/>,
        children:[
          {
          path:'profile',
          element:<Profile/>
        }
        ,{
          path:"profileclass",
          element:<ProfileClass/>
        }
      ]
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:'/movies/:id',
        element : <MovieInfo/>
      },
      {
        path:'login',
        element : <Login/>
      }
    ] 
  }
]
)

const root = ReactDOM.createRoot(document.getElementById("demo"))
root.render(<RouterProvider router={routerConfig}/>);