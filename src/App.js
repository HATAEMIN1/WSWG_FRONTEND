// import "./assets/css/tStyle.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import "./assets/css/style.scss";
import Footer from "./layouts/Footer/Footer";
import { Header, HeaderMom } from "./layouts/Header/Header";
import Account from "./pages/AccountPage/Account";
import AccountEdit from "./pages/AccountPage/AccountEdit";
import AccountPwdEdit from "./pages/AccountPage/AccountPwdEdit";
<<<<<<< HEAD
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

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <GlobalNav />
      <Footer />
    </>
  );
=======
import MyMap from "./components/Map/MyMap";

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
>>>>>>> main
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
<<<<<<< HEAD
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<StyleGuide />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route> */}
          <Route path="/mate" element={<MateList />}></Route>
          <Route path="/mate/:cateId" element={<RestaurantList />}></Route>
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
          <Route path="/meet-posts/new" element={<MeetingAdd />}></Route>
          <Route path="/meet-posts/:mpId" element={<MeetingView />}></Route>
          <Route path="/account/:userId" element={<Account />}></Route>
          <Route path="/account/:userId/edit" element={<AccountEdit />}></Route>
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
=======
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
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
            </Routes>
        </>
    );
>>>>>>> main
}

export default App;
