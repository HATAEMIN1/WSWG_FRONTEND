import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRouter = ({ isAuth }) => {
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRouter;
