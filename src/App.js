// import "./assets/css/tStyle.scss";
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/css/style.scss";
import Footer from "./layouts/Footer/Footer";
import { Header, HeaderMom } from "./layouts/Header/Header";
import Account from "./pages/AccountPage/Account";
import AccountEdit from "./pages/AccountPage/AccountEdit";
import AccountPwdEdit from "./pages/AccountPage/AccountPwdEdit";
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
import Review from "./pages/ReviewPage/Review";
import ReviewAdd from "./pages/ReviewPage/ReviewAdd";
import GlobalNav from "./layouts/Navigation/GlobalNav";
import { useDispatch, useSelector } from "react-redux";
import { Modal, MapModal, FilterModal, MapModalSelect } from "./components/Modal/Modal";
import { authUser } from "./store/thunkFunctions";
import KakaoLogin from "./pages/LoginPage/KakaoLogin";
import KakaoLoginRedirect from "./pages/LoginPage/KakaoLoginRedirect";

function Layout({modalOpen}) {
    return (
        <>
            <Header modalOpen={modalOpen}/>
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
    const [modalNum,setModalNum] = useState(0);
    const [modalView,setModalView] = useState(false);
    const modalData =([
        <MapModalSelect  modalOpen={modalOpen}/>,
        <MapModal />,
        <FilterModal />
    ])
    function modalOpen(idx) {
        setModalView(true);
        setModalNum(idx);
    }
    function modalClsose (){
        setModalView(false);
    }
    useEffect(()=>{
        if(modalView){
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
            {modalData.map((item,idx)=>{
                return (
                modalView === true ? (<Modal onClick={modalClsose} viewlistData={modalData} modalNum={modalNum} />) : null
                )
            })}
            <Routes>
                <Route path="/" element={<Layout modalOpen={modalOpen} />}>
                    <Route path="/styleGuide" element={<StyleGuide modalOpen={modalOpen} />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route> */}
                    <Route path="/users/kakao-login" element={<KakaoLogin />} />
                    <Route
                        path="/users/kakao-login/redirect"
                        element={<KakaoLoginRedirect />}
                    />
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
                        path="/mate/restaurants/:rtId/review-post/new"
                        element={<ReviewAdd />}
                    ></Route>
                    <Route
                        path="/mate/restaurants/:rtId/review-post/:rpId"
                        element={<Review />}
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
                    <Route
                        path="/account/:userId"
                        element={<Account />}
                    ></Route>
                    <Route
                        path="/account/:userId/edit"
                        element={<AccountEdit />}
                    ></Route>
                    <Route
                        path="/account/:userId/pwd-edit"
                        element={<AccountPwdEdit />}
                    ></Route>
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
