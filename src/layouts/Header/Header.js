import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/thunkFunctions";

function Header() {
    const isAuth = useSelector((state) => {
        return state.user?.isAuth;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser()).then(() => {
            console.log("로그아웃");
            navigate("/");
        });
    }

    const routes = [
        { to: "/login", name: "로그인", auth: false },
        { to: "/register", name: "회원가입", auth: false },
        { to: "/account/:userId", name: "계정", auth: true },
    ];

    return (
        <div className="w-full shadow-md">
            <div className="container m-auto flex justify-between">
                <h1 className="font-semibold p-4">
                    <Link to="/"></Link>
                </h1>
                <ul className="flex">
                    {routes.map(({ to, name, auth }) => {
                        if (isAuth !== auth) return null;
                        if (name === "로그아웃") {
                            return (
                                <li key={name}>
                                    <Link
                                        onClick={handleLogout}
                                        className="h-full flex px-4 justify-center items-center"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            );
                        } else {
                            return (
                                <li key={name}>
                                    <Link
                                        to={to}
                                        className="h-full flex px-4 justify-center items-center"
                                    >
                                        {name}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
        // <>
        //     <nav className="flex justify-center h-[50px] bg-slate-400">
        //         <h1 className="flex justify-center items-center bg-sb-100 w-[100px]">
        //             <Link to="/">logo</Link>
        //         </h1>
        //         <div className="flex h-[100%]">
        //             <ul className="flex justify-center items-center px-5 gap-5">
        //                 <li className="flex h-[100%] justify-center bg-sb-100 w-[400px] items-center">
        //                     <Link to="/">search bar</Link>
        //                 </li>
        //                 <li className="flex h-[100%] justify-center bg-sb-100 items-center px-5">
        //                     <Link to="/register">register</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </nav>
        // </>
    );
}

export default Header;
