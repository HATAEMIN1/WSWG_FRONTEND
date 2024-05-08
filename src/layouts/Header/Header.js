<<<<<<< HEAD
import React from "react";
=======
>>>>>>> main
import { Link } from "react-router-dom";

function Header(props) {
    return (
<<<<<<< HEAD
        <header className="w-full h-[120px] md:h-[82px] bg-white shadow">
            <div className="md:container container flex-wrap md:flex-nowrap m-auto h-[100%] flex justify-between items-center gap-x-2">
                <h1 className="headerLogo flex-none items-end pt-4 md:pt-3"><Link to="/"><img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} /></Link></h1>
                <div className="flex flex-auto order-last md:order-none w-full inputSearch gap-2">
                    <button className="flex-none icon iconFillter">검색필터</button>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="flex-auto"
                    ></input>
                    <button className="icon iconSearch">검색</button>
                </div>
                <div className="flex-none userProfile pt-1 md:pt-0"><img src={`${process.env.PUBLIC_URL}/assets/profileDefult.png`} /></div>
            </div>
        </header>
    );
}

function HeaderMom(props) {
    return (
        <header className="w-full h-[60px] md:h-[82px] bg-white shadow">
            <div className="container m-auto h-[100%] flex justify-center">
                <h1 className="headerLogo flex-none pt-3"><Link to="/"><img src={`${process.env.PUBLIC_URL}/assets/logo.svg`} /></Link></h1>
            </div>
        </header>
    );
}
export {Header, HeaderMom};
=======
        <>
            <nav className="flex justify-center h-[50px] bg-slate-400">
                <h1 className="flex justify-center items-center bg-sb-100 w-[100px]">
                    <Link to="/">logo</Link>
                </h1>
                <div className="flex h-[100%]">
                    <ul className="flex justify-center items-center px-5 gap-5">
                        <li className="flex h-[100%] justify-center bg-sb-100 w-[400px] items-center">
                            <Link to="/">search bar</Link>
                        </li>
                        <li className="flex h-[100%] justify-center bg-sb-100 items-center px-5">
                            <Link to="/register">register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;
>>>>>>> main
