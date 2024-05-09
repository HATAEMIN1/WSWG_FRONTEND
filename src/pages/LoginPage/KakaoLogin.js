// frontend: authentication code request & response
// 프론트에서 인가 코드 요청과 발급함
const KakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize
?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}
&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}
&response_type=code`;
    const LoginWithKakao = () => {
        window.location.href = KAKAO_AUTH_URL;
    };
    // 1. "카카오로 로그인" 버튼을 누르면 KAKAO_AUTH_URL로 연결 되면서 authentication code 인가코드를
    // 받기 위한 요청을 보낸다.
    // 2. 사용자의 인증과 동의를 보내면 authentication code 인가 코드를 비로소 받는다.
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
