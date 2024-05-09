import axios from "axios";
import { useEffect } from "react";

const KakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize
?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}
&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}
&response_type=code`;
    const LoginWithKakao = () => {
        window.location.href = KAKAO_AUTH_URL;
    };
    return (
        <button
            onClick={LoginWithKakao}
            className="w-[400px] h-6 px-2.5 py-[5px] mb-10 rounded-[12px] block"
        >
            <img src="./images/kakao_login_large_wide.png" alt="kakao login" />
        </button>
    );
};

export default KakaoLogin;
