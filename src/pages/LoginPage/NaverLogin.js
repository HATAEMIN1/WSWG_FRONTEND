import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useEffect } from "react"; //, useRef
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/userSlice";
import { oauthLogin } from "../../store/thunkFunctions";
import { styled } from "styled-components";

const NaverLogin = () => {
    // 여기서 useRef는 네이버 커스텀 버튼을 클릭하면 가려진 기존 네이버 버튼이
    // 클릭되도록 하기 위해 사용한다. used for direct DOM manipulation.
    // const naverRef = useRef();
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

    // const handleCustomNaverLogin = () => {
    //     naverRef.current.children[0].click();
    // };

    return (
        // <button
        //     onClick={LoginWithNaver}
        //     ref={naverRef}
        //     className="w-[400px] px-2.5 mb-4 rounded-[12px] block"
        //     style={{ display: "none" }}
        // >
        // {/* <img src="./images/naver_login.png" alt="naver login" /> */}
        <CustomNaverLoginBtn onClick={LoginWithNaver}>
            <NaverIcon alt="naver icon" />
            <NaverLoginText>네이버로 로그인</NaverLoginText>
        </CustomNaverLoginBtn>
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
