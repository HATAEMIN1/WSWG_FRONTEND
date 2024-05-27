import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NotAuthRouter = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return !isAuth ? <Outlet /> : <Navigate to="/" />;
    // return !isAuth && <Outlet />;
};

export default NotAuthRouter;
