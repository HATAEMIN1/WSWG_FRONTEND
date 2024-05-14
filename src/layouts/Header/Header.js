import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/thunkFunctions";
// import { setAuth } from "../../store/userSlice";

function Header({ ...props }) {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser()).then(() => {
            // dispatch(setAuth(false));
            alert("로그아웃");
            navigate("/");
        });
    }
    console.log("isAuth when redirected to homepage:", isAuth);
    return (
        <>
            <header className="w-full h-[120px] md:h-[82px] bg-white shadow">
                <div className="md:container container flex-wrap md:flex-nowrap m-auto h-[100%] flex justify-between items-center gap-x-2">
                    <h1 className="headerLogo flex-none items-end pt-4 md:pt-3">
                        <Link to="/">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                                alt="logo"
                            />
                        </Link>
                    </h1>
                    <div className="flex flex-auto order-last md:order-none w-full inputSearch gap-2">
                        <button
                            className="flex-none icon iconFillter"
                            onClick={() => {
                                props.modalOpen(2);
                            }}
                        >
                            검색필터
                        </button>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="flex-auto"
                        ></input>
                        <button className="icon iconSearch">검색</button>
                    </div>
                    <div className="flex-none userProfile pt-1 md:pt-0">
                        {isAuth ? (
                            <div className="flex w-[150px] gap-4 justify-center items-center">
                                <Link to="/account">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/assets/profileDefult.png`}
                                        alt="profileImage"
                                    />
                                </Link>
                                <Link className="" onClick={handleLogout}>
                                    로그아웃
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/profileDefult.png`}
                                    alt="profileImage"
                                />
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

function HeaderMom(props) {
    return (
        <header className="w-full h-[60px] md:h-[82px] bg-white shadow">
            <div className="container m-auto h-[100%] flex justify-center">
                <h1 className="headerLogo flex-none pt-3">
                    <Link to="/">
                        <img
                            src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                            alt="logo"
                        />
                    </Link>
                </h1>
            </div>
        </header>
    );
}
export { Header, HeaderMom };
