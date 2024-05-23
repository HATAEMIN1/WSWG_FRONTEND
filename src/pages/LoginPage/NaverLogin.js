import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useEffect } from "react"; //, useRef
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/userSlice";
import { oauthLogin } from "../../store/thunkFunctions";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

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
                        dispatch(setAuth(true));
                        // alert("로그인 성공");
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
                <CustomNaverLoginBtn onClick={LoginWithNaver}>
                    <NaverIcon alt="naver icon" />
                    <NaverLoginText>네이버로 로그인</NaverLoginText>
                </CustomNaverLoginBtn>
            )}
        </>
        // </button>
    );
};

export default NaverLogin;

const NaverIcon = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 14px;
    background: url("/images/naverIcon.png") no-repeat center;
    background-size: 30px;
`;

const NaverLoginText = styled.span`
    margin-left: 90px;
    color: white;
    font: initial;
    font-size: 17px;
`;

const CustomNaverLoginBtn = styled.button`
    display: flex;
    align-items: center;
    width: 380px;
    height: 57px;
    background-color: #03c75a;
    border-radius: 8px;
    margin: 0 0.625rem;
    margin-bottom: 1rem;
`;
