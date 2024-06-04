import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import NotificationModal from "../../components/Modal/NotificationModal";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { Link } from "react-router-dom";

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
        <div className="w-[400px] m-auto h-full flex flex-col justify-center items-center">
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
            <div className="w-full h-[100px] flex-col justify-start items-center inline-flex font-normal text-zinc-800">
                <Title memTitle={true}>어까</Title>
                <Title memTitle={false}>로그인 해볼까?</Title>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="emailWrap w-full gap-4 items-center mt-5 mb-5">
                        <div className="w-full flex justify-between items-center gap-3">
                            <i className="iconTypeInput iconEmail flex-none">
                                email
                            </i>
                            <InputWrap>
                                <input
                                    className=" bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type="text"
                                    id="emailInput"
                                    name="emailInput"
                                    required
                                    placeholder="이메일을 입력하세요!"
                                    {...register("email", userEmail)}
                                />
                            </InputWrap>
                        </div>
                        {errors.email && (
                            <div className="text-red-500 text-xs mt-1 w-full text-center">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="passwordWrap w-full mb-5">
                        <div className="w-full relative flex justify-between gap-3">
                            <i className="iconTypeInput iconRock flex-none">
                                pass
                            </i>
                            <InputWrap>
                                <input
                                    className="bg-neutral-100 text-center text-base font-normal"
                                    type={pwShow ? "text" : "password"}
                                    id="passwordInput"
                                    name="passwordInput"
                                    required
                                    minLength="4"
                                    placeholder="비밀번호를 입력하세요!"
                                    {...register("password", userPassword)}
                                />
                            </InputWrap>
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
                        {errors.password && (
                            <div className="text-red-500 text-xs mt-1 w-full text-center">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <Button basicButton={true}>로그인</Button>
                    <div className="w-full pt-20 mb-5 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5">
                        간편로그인
                    </div>
                    <KakaoLogin />
                    <NaverLogin />
                    <div className="text-black text-[15px] mt-5 font-normal flex justify-center items-center">
                        이미 어까의 회원이시면
                        <Link to={"/register"} className="underline mx-2">
                            회원가입
                        </Link>
                        하세요
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
