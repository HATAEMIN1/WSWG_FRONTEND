import { Navigate, Outlet } from "react-router-dom";
const NotAuthenticatedRouter = ({ isAuth }) => {
    return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthenticatedRouter;
