import { Link } from "react-router-dom";

function Header(props) {
    return (
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
