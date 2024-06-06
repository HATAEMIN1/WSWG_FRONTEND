import "../../assets/css/style.scss";
import "../../assets/css/tStyle.scss";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import NotificationModal from "../../components/Modal/NotificationModal";
import { useState } from "react";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { Link } from "react-router-dom";

// import { Navigate } from "react-router-dom";

function Register() {
    // const isAuth = useSelector((state) => state.user.isAuth);

    const {
        register,
        formState: { errors },
        watch,
        handleSubmit,
        reset,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);

    const [modalOn, setModalOn] = useState(false);
    const [pwShow, setPwShow] = useState(false);
    const [pwShowConfirm, setPwShowConfirm] = useState(false);

    function onSubmit({ email, name, password, passwordConfirm }) {
        const body = {
            email,
            name,
            password,
            passwordConfirm,
        };

        dispatch(registerUser(body));
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
            message: "이메일을 입력",
        },
    };
    const userName = {
        required: {
            value: true,
            message: "이름은 필수 입니다.",
        },
        maxLength: {
            value: 50,
            message: "최대 50자입니다.",
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

    const userPasswordConfirm = {
        minLength: {
            value: 4,
            message: "최소 4자입니다.",
        },
        required: {
            value: true,
            message: "비밀번호 확인은 필수 입니다.",
        },
        validate: (value) => {
            return value === watch("password") || "비밀번호일치안함";
        },
    };

    // if (isAuth) {
    //     return <Navigate to="/" />;
    // }

    return (
        <>
            <div
                className={`w-full h-full flex flex-col justify-center items-center`}
            >
                {modalOn && (
                    <>
                        {error && error.error ? (
                            <NotificationModal
                                text={error.error}
                                path="/register"
                                imgSrc="/images/iconSad.png"
                                imgAlt="sad icon"
                            />
                        ) : (
                            <NotificationModal
                                text="회원가입이 완료되었습니다!"
                                path="/login"
                                imgSrc="/images/iconSmile.png"
                                imgAlt="smile icon"
                            />
                        )}
                    </>
                )}

                <div className="w-[400px] h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}>가입 해볼까?</Title>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-5">
                            <div className="flex gap-4 items-center">
                                <i className="iconTypeInput iconEmail flex-none">email</i>
                                <InputWrap>
                                <input
                                    className="w-full text-center"
                                    type="text"
                                    id="emailInput"
                                    required
                                    placeholder="이메일을 입력하세요!"
                                    {...register("email", userEmail)}
                                />
                                </InputWrap>
                            </div>
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        <div className="mb-5">
                            <div className="flex gap-4 items-center">
                                <i className="iconTypeInput iconRname flex-none">name</i>
                                <InputWrap>
                                <input
                                    className="w-full text-center"
                                    type="text"
                                    id="usernameInput"
                                    required
                                    maxLength="50"
                                    placeholder="닉네임을 입력하세요!"
                                    {...register("name", userName)}
                                />
                                </InputWrap>
                            </div>
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="mb-5 relative">
                            <div className="flex gap-4 items-center">
                                <i className="iconTypeInput iconRock flex-none">pass</i>
                                <InputWrap>
                                    <input 
                                    className="w-full text-center"
                                    id="passwordInput"
                                    type={pwShow ? "text" : "password"}
                                    required
                                    minLength="4"
                                    placeholder="비밀번호를 입력하세요!"
                                    {...register("password", userPassword)} />
                                </InputWrap>
                            </div>
                            {errors.password && (
                                <div className="text-red-500 text-xs text-center mt-1">
                                    {errors.password.message}
                                </div>
                            )}
                            <div className="absolute right-[10px] top-[7px] z-[3]">
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
                        <div className="mb-5 relative">
                            <div className="flex gap-4 items-center">
                                <i className="iconTypeInput iconRockCheck flex-none">passCheck</i>
                                <InputWrap>
                                <input
                                    className="w-full text-center"
                                    type={pwShowConfirm ? "text" : "password"}
                                    id="passwordConfirmInput"
                                    required
                                    minLength="4"
                                    placeholder="비밀번호를 다시 입력하세요!"
                                    {...register(
                                        "passwordConfirm",
                                        userPasswordConfirm
                                    )}
                                />
                                </InputWrap>
                                
                                <div className="absolute right-[10px] top-[7px]">
                                    {pwShowConfirm ? (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShowConfirm(false);
                                            }}
                                            icon={faEye}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                setPwShowConfirm(true);
                                            }}
                                            icon={faEyeSlash}
                                        />
                                    )}
                                </div>
                                {errors.passwordConfirm && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.passwordConfirm.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button basicButton={true}>회원가입</Button>
                        <div
                            className="text-[15px] text-center pt-5"
                        >
                            이미 어까의 회원이라면 바로
                            <Link to={"/login"} className="mx-[6px] underline">
                                로그인!
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
