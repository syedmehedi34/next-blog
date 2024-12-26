import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import AllBlogs from "../pages/AllBlogs";
import AddBlog from "../pages/AddBlog";
import MyReviews from "../pages/MyReviews";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../private_pages/UpdateProfile";
import ResetPass from "../private_pages/ResetPass";
import SinglePost from "../pages/SinglePost";
import Wishlist from "../private_pages/Wishlist";
import Featured from "../pages/Featured";
import UpdateBlog from "../private_pages/UpdateBlog";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all_blogs",
        element: <AllBlogs />,
      },

      {
        path: "/add_blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs/:id",
        element: <SinglePost />,
      },
      {
        path: "/blogs/update/:id",
        element: <UpdateBlog />,
      },

      //! ---------------------------
      {
        path: "/featured",
        element: <Featured />,
      },

      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPass />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  ////////////
  {
    path: "*",
    element: <Error></Error>,
  },
];
const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export default router;
