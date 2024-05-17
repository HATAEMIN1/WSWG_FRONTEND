import { useSelector, useDispatch } from "react-redux";
import InputWrap from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import { deleteUser } from "../../store/thunkFunctions";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";

function AccountDelete() {
    const userData = useSelector((state) => state?.user?.userData);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({ mode: "onChange" });
    const userPassword = {
        required: {
            value: true,
            message: "비밀번호는 필수 입니다.",
        },
        minLength: {
            value: 4,
            message: "최소 4자입니다.",
        },
        validate: async (newPassword) => {
            console.log("userData:", userData);
            console.log("userData.password:", userData.password);
            const body = {
                newPassword,
                oldPassword: userData.password,
            };
            const response = await axiosInstance.post(
                "/users/passwordCheck",
                body
            );
            const isMatch = response.data.isMatch;
            return isMatch || "없는 비밀번호 입니다!";
        },
    };
    const userPasswordConfirm = {
        validate: (value) => {
            return value === watch("password") || "비밀번호가 달라요!";
        },
    };

    const dispatch = useDispatch();
    async function onSubmit() {
        dispatch(deleteUser());
        reset();
    }
    return (
        <>
            <div
                className="mt-12 mb-6 w-[100%] h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl mb-2">어까</div>
                <div className="text-center text-3xl mb-10">
                    우리 헤어지는 걸까?
                </div>
                <div className="flex flex-col items-center w-[250px] h-[250px] mb-4 =">
                    <div className="w-[150px] h-[150px] bg-gray-100 rounded-md mb-4"></div>
                    <div
                        style={{ fontFamily: "Pretendard" }}
                        className="text-center text-[16px]"
                    >
                        <div className="text-lg font-semibold">
                            {userData.name}
                        </div>
                        <div className="text-lg font-medium">
                            {userData.email}
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center"
                >
                    <div
                        style={{ fontFamily: "Pretendard" }}
                        className="mb-20 w-[400px]"
                    >
                        <div>
                            <div className="mb-4 flex gap-[10px]">
                                <img src="/images/iconPwd.png" alt="password" />
                                <InputWrap>
                                    <input
                                        type="text"
                                        id="password"
                                        placeholder="비밀번호를 입력하세요"
                                        {...register("password", userPassword)}
                                    />
                                </InputWrap>
                            </div>
                            {errors.password && (
                                <div className="text-red-400 text-xs mb-4">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="flex gap-[10px]">
                                <img
                                    src="/images/iconPwdDoubleCheck.png"
                                    alt="password double check"
                                />
                                <InputWrap>
                                    <input
                                        type="text"
                                        id="passwordConfirm"
                                        placeholder="비밀번호를 확인하세요"
                                        {...register(
                                            "passwordConfirm",
                                            userPasswordConfirm
                                        )}
                                    />
                                </InputWrap>
                            </div>
                            {errors.passwordConfirm && (
                                <div className="text-red-400 text-xs mt-4">
                                    {errors.passwordConfirm.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        style={{ fontFamily: "Pretendard" }}
                        className="w-[400px] text-[15px]"
                    >
                        <button className="w-full h-[40px] px-2.5 mb-4 rounded-md flex justify-center items-center bg-primary-300">
                            확인
                        </button>
                        <Link to="/account">
                            <div className="w-full h-[40px] px-2.5 mb-4 rounded-md flex justify-center items-center bg-primary-300">
                                취소
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AccountDelete;
