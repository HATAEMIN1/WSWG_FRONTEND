import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function onSubmit({ email, password }) {
        const body = {
            email,
            password,
        };

        dispatch(loginUser(body));

        navigate("/");
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
                <div className="text-center text-3xl">로그인 해볼까?</div>
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
                    <button
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="w-[400px] h-10 px-2.5 py-[5px] mb-14 bg-teal-300 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5 block"
                    >
                        로그인
                    </button>
                    <div
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="w-[400px] h-10 px-2.5 py-[5px] mb-5 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5 block"
                    >
                        간편로그인
                    </div>
                    <KakaoLogin />
                    <NaverLogin />
                    <div
                        style={{ fontFamily: "Pretendard-Regular" }}
                        className="text-black text-[15px] font-normal flex justify-center items-center"
                    >
                        이미 어까의 회원이시면{" "}
                        <a href="/register" className="underline">
                            회원가입
                        </a>{" "}
                        하세요
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
