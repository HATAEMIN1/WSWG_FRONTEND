import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/thunkFunctions";
import { useState } from "react";

function Header({ ...props }) {
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState(""); // 새로운 상태 추가
    // const [filename, setFilename] = useState("");
    const isAuth = useSelector((state) => {
        return state.user.isAuth;
    });
    const retrievedImage = useSelector(
        (state) => state.user.userData.image?.filename
    );
    const oauthLogin = useSelector((state) => {
        return state.user.oauthLogin;
    });
    const retrievedImageOauth = useSelector(
        (state) => state.user.userData.image?.originalname
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser());
    }
    function handleSearch(e) {
        setSearch(e.target.value);
        setTag(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        // navigate(`/search?q=${search}`);
        // setSearch("");
        const queryString = `?q=${search}&tag=${tag}`; // q와 tag를 함께 URL에 포함
        navigate(`/search${queryString}`); // 수정된 URL로 이동
        setSearch("");
        setTag(""); // 검색 후 태그 초기화
    }
    return (
        <>
            <header className="w-full h-[120px] md:h-[82px] bg-white shadow fixed top-0 z-[2] ">
                <div className="container flex-wrap md:flex-nowrap m-auto h-[100%] flex justify-between items-center gap-x-2">
                    <h1 className="headerLogo flex-none items-end pt-4 md:pt-3">
                        <Link to="/">
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
                                alt="logo"
                            />
                        </Link>
                    </h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex order-last md:order-none inputSearch gap-2 w-full flex-1"
                    >
                        <div
                            className="flex-none icon iconFillter"
                            onClick={() => {
                                props.modalOpen(2);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            검색필터
                        </div>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="flex-auto"
                            onChange={handleSearch}
                            value={search}
                        ></input>
                        <button className="icon iconSearch">검색</button>
                    </form>

                    {isAuth ? (
                        <div className="flex w-auto gap-4 justify-between items-center">
                            <Link to="/account">
                                {oauthLogin ? (
                                    <div className="w-[50px] h-[50px]">
                                        <img
                                            className="rounded-full w-full h-full object-cover"
                                            src={retrievedImageOauth}
                                            alt="profileImageFromOauthProfile"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        {retrievedImage !== "noimage.jpg" ? (
                                            <div className="w-[50px] h-[50px]">
                                                <img
                                                    className="rounded-full w-full h-full object-cover"
                                                    src={
                                                        process.env
                                                            .REACT_APP_NODE_SERVER_UPLOAD_URL +
                                                        retrievedImage
                                                    }
                                                    alt="profileImage"
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                className="w-full h-full object-cover"
                                                src="/images/profileDefault.png"
                                                alt="defaultPic"
                                            />
                                        )}
                                    </>
                                )}
                            </Link>
                            <Link className="flex-none" onClick={handleLogout}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/iconLogout.png`}
                                    alt="logout"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex-none userProfile pt-1 md:pt-0">
                            <Link to="/login">
                                <img
                                    src="/images/profileDefault.png"
                                    alt="defaultPic"
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

function HeaderMom() {
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
