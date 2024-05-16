import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const gnbMenu = [
    {
        name: "홈",
        image: "iconHomeOn",
        link: "/",
        active: "active",
    },
    {
        name: "누구랑 갈까",
        image: "iconTogetherOn",
        link: "/mate",
        active: "active",
    },
    {
        name: "우리 만날까",
        image: "iconMeetOn",
        link: "/meet-posts",
        active: "active",
    },
    {
        name: "내정보",
        image: "iconMyOn",
        link: "/account",
        active: "active",
    },
];
function activeMenu() {
    gnbMenu.active(true);
}
function GlobalNav() {
    const [menuOpen, setMenuOpen] = useState(true);
    const [btnActive, setBtnActive] = useState(false);

    function openMenu() {
        setMenuOpen(!menuOpen);
        setBtnActive(!btnActive);
    }
    return (
        <>
            <div className="container m-auto gnbMenu">
                <button
                    className={`m-auto flex justify-center btnOnOff ${btnActive ? "active" : ""}`}
                    onClick={() => {
                        openMenu();
                    }}
                >
                    클릭
                </button>
                {menuOpen && <MenuItem />}
            </div>
        </>
    );
}
function MenuItem() {
    const isAuth = useSelector((state) => state.user.isAuth);
    return (
        <nav className="shadow-[0px_-2px_5px_rgba(0,0,0,0.2)] rounded-t-lg md:py-5 bg-white">
            <ul className="w-full md:w-[920px] px-10 md:px-[100px] m-auto flex justify-between grid-col-4 gap-10">
                {gnbMenu.map((item, i) => {
                    return (
                        <li
                            key={`gnbmenuitem-${i}`}
                            className={`w-[100px] m-auto flex ${activeMenu}`}
                        >
                            <NavLink
                                to={item.link}
                                className="w-full flex flex-wrap justify-center gap-[5px]"
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${item.image}.svg`}
                                    alt={item.name}
                                />
                                <p className="w-full text-center">
                                    {item.name}
                                </p>
                            </NavLink>
                        </li>
                    );
                })}
                {isAuth ? (
                    <li
                        key="myaccount"
                        className={`w-[100px] m-auto flex ${activeMenu}`}
                    >
                        <NavLink
                            to="/account"
                            className="w-full flex flex-wrap justify-center gap-[5px]"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/images/iconMyOn.svg`}
                                alt="내정보"
                            />
                            <p className="w-full text-center">내정보</p>
                        </NavLink>
                    </li>
                ) : (
                    <li
                        key="myaccount"
                        className={`w-[100px] m-auto flex ${activeMenu}`}
                    >
                        <NavLink
                            to="/login"
                            className="w-full flex flex-wrap justify-center gap-[5px]"
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/images/iconMyOn.svg`}
                                alt="내정보"
                            />
                            <p className="w-full text-center">내정보</p>
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}
export default GlobalNav;
