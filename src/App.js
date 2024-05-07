// import "./assets/css/tStyle.scss";
import "./assets/css/style.scss";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/MainPage/Home";
import {Header, HeaderMom} from "./layouts/Header/Header";
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

function Layout() {
  return (
    <>
      <Header />
      {/* <HeaderMom /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
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
      </Routes>
    </>
  );
}

export default App;
