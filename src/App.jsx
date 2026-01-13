import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Body from "./Components/Body";
import Error from "./Components/Error";
import Footer from "./Components/Footer";
import MovieDetailsSkeleton from "./Components/MovieDetailsSkeleton";
import MovieInfo from "./Components/MovieInfo";
import Navbar from "./Components/Navbar";
import RecommendationsSkeleton from "./Components/RecommendationsSkeleton";

const Login = lazy(() => import("./Components/Login"));
const About = lazy(() => import("./Components/About"));
const Contact = lazy(() => import("./Components/Contact"));
const Profile = lazy(() => import("./Components/Profile"));
const ProfileClass = lazy(() => import("./Components/ProfileClass"));

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "about",
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: "profileclass",
            element: (
              <Suspense>
                <ProfileClass />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "contact",
        element: (
          <Suspense>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/movies/:id",
        element: <MovieInfo />,
      },
      {
        path: "login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "skeleton",
        element: <MovieDetailsSkeleton />,
        errorElement: <Error />,
        children: [
          {
            path: "recommendations",
            element: (
              <Suspense>
                <RecommendationsSkeleton />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("demo"));
root.render(<RouterProvider router={routerConfig} />);
