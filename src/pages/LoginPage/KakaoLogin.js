// frontend: authentication code request & response
// 프론트에서 인가 코드 요청과 발급함
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { oauthLogin } from "../../store/thunkFunctions";
import kakaoIcon from "../../assets/images/iconKakao.png";
const KakaoLogin = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize
?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}
&client_secret=${process.env.REACT_APP_KAKAO_CLIENT_SECRET}
&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}
&response_type=code`;
    const code = searchParams.get("code");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                if (code) {
                    const response = await axios.post(
                        "https://kauth.kakao.com/oauth/token",
                        null,
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                            params: {
                                grant_type: "authorization_code",
                                client_id:
                                    process.env.REACT_APP_KAKAO_CLIENT_ID,
                                client_secret:
                                    process.env.REACT_APP_KAKAO_CLIENT_SECRET,
                                redirect_uri:
                                    process.env.REACT_APP_KAKAO_REDIRECT_URI, // 카카오 로그인 한 후 인가코드 authCode 받는 용도 -> 인가코드로 access token을 받고 이 access token으로 카카오 유저 정보를 받는다
                                code, // 카카오 서버에서 redirect uri로 인가코드를 보낼때, url 속에 query문으로 담아서 보내줌. 이를 받아서 다시 쓰는 것
                            },
                        }
                    );
                    const id_token = response.data.id_token;
                    const userDataResponse = await axiosInstance.post(
                        "/users/kakao-login",
                        {
                            id_token,
                        }
                    );
                    if (userDataResponse.status === 200) {
                        const accessToken = userDataResponse.data.accessToken;
                        const existingUser = userDataResponse.data.existingUser;

                        const body = {
                            user: {
                                email: existingUser.email,
                                name: existingUser.name,
                                _id: existingUser._id,
                                role: existingUser.role,
                                image: existingUser.image,
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

    const LoginWithKakao = () => {
        try {
            window.location.href = KAKAO_AUTH_URL;
        } catch (error) {
            console.error(error);
        }
    };

    // 1. "카카오로 로그인" 버튼을 누르면 KAKAO_AUTH_URL로 연결 되면서 authentication code 인가코드를
    // 받기 위한 요청을 보낸다.
    // 2. 사용자의 인증과 동의를 보내면 authentication code 인가 코드를 비로소 받는다.
    return (
        <button onClick={LoginWithKakao} className="w-full flex justify-center items-center gap-[16px] rounded-md h-11 bg-[#FEE500] mb-5"><img src={kakaoIcon} className=" w-[18px]"/>카카오 로그인</button>
    );
};

export default KakaoLogin;
