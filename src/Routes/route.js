import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Accounts/Login/Login";
import Register from "../pages/Accounts/Register/Register";
import Home from "../pages/Home/Home";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: ([
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/billing",
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ])
    }
])