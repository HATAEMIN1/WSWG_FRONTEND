import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const NotAuthRouter = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default NotAuthRouter;
