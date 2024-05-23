import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRouter = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRouter;
