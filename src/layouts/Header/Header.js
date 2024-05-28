import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/thunkFunctions";
import { useState } from "react";

function Header({ ...props }) {
    const [search, setSearch] = useState("");
    // const [filename, setFilename] = useState("");
    const isAuth = useSelector((state) => {
        return state.user.isAuth;
    });
    const retrievedImage = useSelector(
        (state) => state.user.userData.image?.filename
    );
    console.log("isAuth", isAuth);
    console.log("retrievedImage", retrievedImage);
    console.log(
        "full img url:",
        process.env.REACT_APP_NODE_SERVER_UPLOAD_URL + retrievedImage
    );
    // if (retrievedImage) {
    //     setFilename(retrievedImage);
    // }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logoutUser());
    }
    function handleSearch(e) {
        setSearch(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search?q=${search}`);
        setSearch("");
    }
    return (
        <>
            <header className="w-full h-[120px] md:h-[82px] bg-white shadow fixed top-0 z-[2] ">
                <div className="md:container container flex-wrap md:flex-nowrap m-auto h-[100%] flex justify-between items-center gap-x-2">
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
                        className="flex flex-auto order-last md:order-none w-full inputSearch gap-2"
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
                    <div className="flex-none userProfile pt-1 md:pt-0">
                        {isAuth ? (
                            <div className="flex w-[150px] gap-4 justify-center items-center">
                                <Link to="/account">
                                    {retrievedImage ? (
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
                                            src={`${process.env.PUBLIC_URL}/assets/profileDefult.png`}
                                            alt="profileImage"
                                        />
                                    )}
                                </Link>
                                <Link className="" onClick={handleLogout}>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/iconLogout.png`}
                                        alt="logout"
                                    />
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
