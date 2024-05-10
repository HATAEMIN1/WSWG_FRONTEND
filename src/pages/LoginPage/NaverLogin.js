import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/userSlice";

const NaverLogin = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // package.json proxy에 https://nid.naver.com
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize
?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}
&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}
&response_type=code`;

    const code = searchParams.get("code");
    console.log("naver oauth - code from query string", code);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                if (code) {
                    const userDataResponse = await axiosInstance.post(
                        "/users/naver-login",
                        {
                            code,
                        }
                    );
                    console.log("userDataResponse", userDataResponse);
                    if (userDataResponse.status === 200) {
                        dispatch(setAuth(true));
                        alert("로그인 성공");
                        navigate("/");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAccessToken();
    }, [code]);

    const LoginWithNaver = () => {
        try {
            window.location.href = NAVER_AUTH_URL;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <button
            onClick={LoginWithNaver}
            className="w-[400px] px-2.5 py-[5px] mb-4 rounded-[12px] block"
        >
            <img src="./images/naver_login.png" alt="naver login" />
        </button>
    );
};

export default NaverLogin;
