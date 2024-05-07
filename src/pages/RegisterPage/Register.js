import "../../assets/css/style.scss";
import "../../assets/css/tStyle.scss";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();

    async function onSubmit({ email, name, password }) {
        const body = {
            email,
            name,
            password,
            image: `https://via.placeholder.com/600x400?text=no+user+image`,
        };

        dispatch(registerUser(body));
        console.log(body);
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

    return (
        <div className="w-[100%] h-[1000px] flex justify-center">
            <div
                className="w-[100%] h-[100px] flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl">어까</div>
                <div className="text-center text-3xl">가입 해볼까?</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="emailWrap flex justify-between mt-5 mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[25.20px] h-[25.20px] left-[7px] top-[7px] absolute">
                                <img
                                    src="./images/icon_Email.svg"
                                    alt="email icon"
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily: "Pretendard-Regular" }}>
                            <input
                                className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
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
                    <div className="usernameWrap flex justify-between mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[25.20px] h-[25.20px] left-[7px] top-[7px] absolute">
                                <img
                                    src="./images/icon_Person.svg"
                                    alt="person icon"
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily: "Pretendard-Regular" }}>
                            <input
                                className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                type="text"
                                id="usernameInput"
                                name="usernameInput"
                                required
                                maxLength="50"
                                placeholder="닉네임을 입력하세요!"
                                {...register("name", userName)}
                            />
                            {errors.name && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="passwordWrap flex justify-between mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[25.20px] h-[25.20px] left-[7px] top-[7px] absolute">
                                <img
                                    src="./images/icon_Person.svg"
                                    alt="person icon"
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily: "Pretendard-Regular" }}>
                            <input
                                className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                type="text"
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
                        </div>
                    </div>
                    <div className="passwordConfirmWrap flex justify-between mb-5">
                        <div className="w-10 h-10 relative">
                            <div className="w-[25.20px] h-[25.20px] left-[7px] top-[7px] absolute">
                                <img
                                    src="./images/icon_Person.svg"
                                    alt="person icon"
                                />
                            </div>
                        </div>
                        <div style={{ fontFamily: "Pretendard-Regular" }}>
                            <input
                                className="w-[351px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                type="text"
                                id="passwordConfirmInput"
                                name="passwordConfirmInput"
                                required
                                minLength="4"
                                placeholder="비밀번호를 다시 입력하세요!"
                                {...register("passwordConfirm", {
                                    validate: (value) => {
                                        return (
                                            value === watch("password") ||
                                            "비밀번호일치안함"
                                        );
                                    },
                                })}
                            />
                            {errors.passwordConfirm && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.passwordConfirm.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="w-[400px] h-10 px-2.5 py-[5px] mb-5 bg-teal-300 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5 inline-flex"
                    >
                        회원가입
                    </button>
                    <div
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="text-black text-[15px] font-normal"
                    >
                        이미 어까의 회원이라면 바로{" "}
                        <a href="/login" className="underline">
                            로그인!
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
