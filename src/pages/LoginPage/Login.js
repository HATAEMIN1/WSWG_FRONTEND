import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import NotificationModal from "../../components/Modal/NotificationModal";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);
    const [modalOn, setModalOn] = useState(false);
    const [pwShow, setPwShow] = useState(false);
    async function onSubmit({ email, password }) {
        const body = {
            email,
            password,
        };

        dispatch(loginUser(body));
        setModalOn(true);
        reset();
    }
    const userEmail = {
        required: {
            value: true,
            message: "이메일은 필수 입니다.",
        },
        pattern: {
            value: /^\S+@\S+$/i,
            message: "이메일을 옳은 방식으로 입력해주세요",
        },
    };
    const userPassword = {
        required: {
            value: true,
            message: "비밀번호는 필수 입니다.",
        },
        minLength: {
            value: 4,
            message: "최소 4자입니다.",
        },
    };
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {modalOn && (
                <>
                    {error && error.error ? (
                        <NotificationModal
                            text={error.error}
                            path="/login"
                            imgSrc="/images/iconSad.png"
                            imgAlt="sad icon"
                        />
                    ) : (
                        <NotificationModal
                            text="로그인이 완료되었습니다!"
                            path="/"
                            imgSrc="/images/iconSmile.png"
                            imgAlt="smile icon"
                        />
                    )}
                </>
            )}
            <div
                className="w-[100%] h-[100px] flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl">어까</div>
                <div className="text-center text-3xl">로그인 해볼까?</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="emailWrap w-[380px] flex justify-center gap-4 ml-2 items-center mt-5 mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                <img
                                    src="./images/iconMail.png"
                                    alt="email icon"
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily: "Pretendard-Regular" }}>
                            <input
                                className="w-[330px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                type="text"
                                id="emailInput"
                                name="emailInput"
                                required
                                placeholder="이메일을 입력하세요!"
                                {...register("email", userEmail)}
                            />
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="passwordWrap w-[380px] ml-2 flex justify-center gap-4 items-center mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                <img
                                    src="./images/iconPwd.png"
                                    alt="password key icon"
                                />
                            </div>
                        </div>
                        <div
                            style={{ fontFamily: "Pretendard-Regular" }}
                            className="relative"
                        >
                            <input
                                className="w-[330px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                type={pwShow ? "text" : "password"}
                                id="passwordInput"
                                name="passwordInput"
                                required
                                minLength="4"
                                placeholder="비밀번호를 입력하세요!"
                                {...register("password", userPassword)}
                            />
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </div>
                            )}
                            <div className="absolute right-[10px] top-[7px]">
                                {pwShow ? (
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            setPwShow(false);
                                        }}
                                        icon={faEye}
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        onClick={() => {
                                            setPwShow(true);
                                        }}
                                        icon={faEyeSlash}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="w-[380px] h-[50px] px-2.5 py-[5px] ml-3 mb-14 bg-teal-300 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5"
                    >
                        로그인
                    </button>
                    <div
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="w-[400px] h-10 px-2.5 py-[5px] ml-1 mb-5 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5"
                    >
                        간편로그인
                    </div>
                    <KakaoLogin />
                    <NaverLogin />
                    <div
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="text-black text-[15px] font-normal ml-3 flex justify-center items-center"
                    >
                        <span className="mr-[6px]">이미 어까의 회원이시면</span>
                        <a href="/register" className="underline mr-[6px]">
                            회원가입
                        </a>
                        하세요
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
