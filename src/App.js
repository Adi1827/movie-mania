import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Error from './Components/Error';
import MovieInfo from './Components/MovieInfo';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { Outlet } from "react-router-dom";

const Login = React.lazy(()=>import('./Components/Login'));
const About = React.lazy(()=>import('./Components/About'));
const Contact = React.lazy(()=>import('./Components/Contact'));
const Profile = React.lazy(()=>import('./Components/Profile'));
const ProfileClass = React.lazy(()=>import('./Components/ProfileClass'));
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
        element:<Suspense><About/></Suspense>,
        children:[
          {
          path:'profile',
          element:<Suspense><Profile/></Suspense>
        }
        ,{
          path:"profileclass",
          element:<Suspense><ProfileClass/></Suspense>
        }
      ]
      },
      {
        path:'contact',
        element:<Suspense><Contact/></Suspense>
      },
      {
        path:'/movies/:id',
        element : <MovieInfo/>
      },
      {
        path:'login',
        element : <Suspense><Login/></Suspense>
      }
    ] 
  }
]
)

const root = ReactDOM.createRoot(document.getElementById("demo"))
root.render(<RouterProvider router={routerConfig}/>);