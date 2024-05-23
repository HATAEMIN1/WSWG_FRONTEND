// import "./assets/css/tStyle.scss";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/css/style.scss";
import Footer from "./layouts/Footer/Footer";
import { Header, HeaderMom } from "./layouts/Header/Header";
import Account from "./pages/AccountPage/Account";
import AccountEdit from "./pages/AccountPage/AccountEdit";
import AccountDelete from "./pages/AccountPage/AccountDelete";
import MateList from "./pages/GoingWithPage/MateList";
import Login from "./pages/LoginPage/Login";
import Home from "./pages/MainPage/Home";
import StyleGuide from "./pages/MainPage/StyleGuide";
import MeetingAdd from "./pages/MeetingPage/MeetingAdd";
import MeetingList from "./pages/MeetingPage/MeetingList";
import MeetingView from "./pages/MeetingPage/MeetingView";
import Register from "./pages/RegisterPage/Register";
import RestaurantList from "./pages/RestaurantPage/RestaurantList";
import RestaurantView from "./pages/RestaurantPage/RestaurantView";
import ReviewView from "./pages/ReviewPage/ReviewView";
import ReviewAdd from "./pages/ReviewPage/ReviewAdd";
import GlobalNav from "./layouts/Navigation/GlobalNav";
import { useDispatch, useSelector } from "react-redux";
import {FilterModal, MapModal, MapModalSelect, Modal} from "./components/Modal/Modal";
import KakaoLogin from "./pages/LoginPage/KakaoLogin";
import NaverLogin from "./pages/LoginPage/NaverLogin";
import { authUser } from "./store/thunkFunctions";
import DefualtModal from "./components/Modal/DefualtModal";
import Search from "./pages/SearchPage/Search";
import NotAuthRouter from "./components/Router/NotAuthRouter";
import AuthRouter from "./components/Router/AuthRouter";

function Layout({ modalOpen }) {
    return (
        <>
            <Header modalOpen={modalOpen} />
            <main>
                <Outlet />
            </main>
            <GlobalNav />
            <Footer />
        </>
    );
}

function LayoutEtc() {
    return (
        <>
            <HeaderMom />
            <main>
                <Outlet />
            </main>
        </>
    );
}
function App() {
    const [modalNum, setModalNum] = useState(0);
    const [modalView, setModalView] = useState(false);
    const modalData = [
        <MapModalSelect modalOpen={modalOpen} />,
        <MapModal />,
        <FilterModal />,
    ];
    function modalOpen(idx) {
        setModalView(true);
        setModalNum(idx);
    }

    function modalClose() {
        setModalView(false);
    }
    useEffect(() => {
        if (modalView) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    });

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);
    useEffect(() => {
        if (isAuth) {
            dispatch(authUser());
        }
    }, [isAuth, dispatch]);
    return (
        <>
            {/* Modal layer */}
            {modalView && (
                <Modal onClick={modalClose} viewlistData={modalData} modalNum={modalNum} />
            )}
            <Routes>
                <Route path="/" element={<Layout modalOpen={modalOpen} />}>
                    <Route element={<AuthRouter />}>
                        <Route path="/account" element={<Account />} />
                        <Route path="/account/edit" element={<AccountEdit />} />
                        <Route
                            path="/account/delete"
                            element={<AccountDelete />}
                        />
                    </Route>

                    <Route index element={<Home modalOpen={modalOpen} />} />

                    <Route path="/users/kakao-login" element={<KakaoLogin />} />
                    <Route path="/users/naver-login" element={<NaverLogin />} />
                    <Route path="/mate" element={<MateList />}></Route>
                    <Route
                        path="/mate/:cateId"
                        element={<RestaurantList />}
                    ></Route>
                    <Route
                        path="/mate/:cateId/restaurants/:rtId"
                        element={<RestaurantView />}
                    ></Route>
                    <Route
                        path="/mate/:cateId/restaurants/:rtId/review-post/new"
                        element={<ReviewAdd />}
                    ></Route>
                    <Route
                        path="/mate/restaurants/:rtId/review-post/:rpId"
                        element={<ReviewView />}
                    ></Route>

                    <Route path="/meet-posts" element={<MeetingList />}></Route>
                    <Route
                        path="/meet-posts/new"
                        element={<MeetingAdd />}
                    ></Route>
                    <Route
                        path="/meet-posts/:mpId"
                        element={<MeetingView />}
                    ></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route
                        path="/account/edit"
                        element={<AccountEdit />}
                    ></Route>
                    <Route
                        path="/account/delete"
                        element={<AccountDelete />}
                    ></Route>
                    <Route path="/search" element={<Search />}></Route>
                    <Route path="/styleguide" element={<StyleGuide />}></Route>
                </Route>
                <Route element={<LayoutEtc />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Route>
            </Routes>
        </>
    );
}
export default App;
