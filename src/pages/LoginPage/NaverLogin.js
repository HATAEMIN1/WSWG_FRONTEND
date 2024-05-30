import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { oauthLogin } from "../../store/thunkFunctions";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import naverIcon from "../../assets/images/iconNaver.png";
const NaverLogin = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    // package.json proxy에 https://nid.naver.com
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize
?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}
&client_secret=${process.env.REACT_APP_NAVER_CLIENT_SECRET}
&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}
&response_type=code`;

    const code = searchParams.get("code");

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
                    // get accessToken and userData from existingUser from userDataResponse
                    console.log("userDataResponse", userDataResponse);
                    if (userDataResponse.status === 200) {
                        const accessToken = userDataResponse.data.accessToken;
                        const existingUser = userDataResponse.data.existingUser;

                        const body = {
                            user: {
                                email: existingUser.email,
                                name: existingUser.name,
                                _id: existingUser._id,
                                role: existingUser.role,
                            },
                            accessToken,
                        };
                        dispatch(oauthLogin(body));

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
        <>
            {!isAuth && (
                <button onClick={LoginWithNaver} className="w-full flex justify-center gap-[16px] items-center rounded-md h-11 text-white bg-[#03c75a]">
                    <img src={naverIcon}  className=" w-[18px]" />네이버 로그인
                </button>
            )}
        </>
        // </button>
    );
};

export default NaverLogin;