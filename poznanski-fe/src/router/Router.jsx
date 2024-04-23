import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import Order from "../pages/dashboard/user/Order";
import UserProfile from "../pages/dashboard/user/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import CCNA from "../pages/home/CCNA";
import FAQ from "../pages/home/FAQ";
import AboutUs from "../pages/home/AboutUs";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>
        },
        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path: "/process-checkout",
          element: <Payment/>
        },
        {
          path: "/CCNA",
          element: <CCNA/>
        },
        {
          path: "/FAQ",
          element: <FAQ/>
        },
        {
          path: "/AboutUs",
          element: <AboutUs/>
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'update-menu/:id',
          element: <UpdateMenu/>,
          loader: ({ params }) => fetch(`https://poznanski-server.onrender.com/menu/${params.id}`)
        },
        {
          path: 'bookings',
          element: <ManageBookings/>
        }
      ]
    }
  ]);

  export default router;