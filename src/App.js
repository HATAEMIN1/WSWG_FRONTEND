import "./assets/css/tStyle.scss";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/MainPage/Home";
import Header from "./layouts/Header/Header";
import Footer from "./layouts/Footer/Footer";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import MateList from "./pages/GoingWithPage/MateList";
import RestaurantList from "./pages/RestaurantPage/RestaurantList";
import RestaurantView from "./pages/RestaurantPage/RestaurantView";
import ReviewAdd from "./pages/ReviewPage/ReviewAdd";
import Review from "./pages/ReviewPage/Review";
import MeetingList from "./pages/MeetingPage/MeetingList";
import MeetingAdd from "./pages/MeetingPage/MeetingAdd";
import MeetingView from "./pages/MeetingPage/MeetingView";
import Account from "./pages/AccountPage/Account";
import AccountEdit from "./pages/AccountPage/AccountEdit";
import AccountPwdEdit from "./pages/AccountPage/AccountPwdEdit";
import MyMap from "./components/MyMap";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import { useEffect } from "react";
import AuthenticatedRouter from "./components/AuthenticatedRouter";
import NotAuthenticatedRouter from "./components/NotAuthenticatedRouter";

function Layout() {
    return (
        <>
            <Header />
            <MyMap />
            <div className="container m-auto">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);
    const { pathname } = useLocation();
    useEffect(() => {
        if (isAuth) {
            dispatch(authUser());
        }
    }, [isAuth, dispatch, pathname]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route element={<NotAuthenticatedRouter isAuth={isAuth} />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<AuthenticatedRouter isAuth={isAuth} />}>
                        <Route path="/mate" element={<MateList />} />
                        <Route
                            path="/mate/:cateId"
                            element={<RestaurantList />}
                        />
                        <Route
                            path="/mate/:cateId/restaurants/:rtId"
                            element={<RestaurantView />}
                        />
                        <Route
                            path="/mate/restaurants/:rtId/review-post/new"
                            element={<ReviewAdd />}
                        />
                        <Route
                            path="/mate/restaurants/:rtId/review-post/:rpId"
                            element={<Review />}
                        />
                        <Route path="/meet-posts" element={<MeetingList />} />
                        <Route
                            path="/meet-posts/new"
                            element={<MeetingAdd />}
                        />
                        <Route
                            path="/meet-posts/:mpId"
                            element={<MeetingView />}
                        />
                        <Route path="/account/:userId" element={<Account />} />
                        <Route
                            path="/account/:userId/edit"
                            element={<AccountEdit />}
                        />
                        <Route
                            path="/account/:userId/pwd-edit"
                            element={<AccountPwdEdit />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
