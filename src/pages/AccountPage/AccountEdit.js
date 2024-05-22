import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputWrap from "../../components/Form/Input";
import { useForm } from "react-hook-form";
import { updateUserPassword } from "../../store/thunkFunctions";
import axiosInstance from "../../utils/axios";
import NotificationModal from "../../components/Modal/NotificationModal";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function AccountEdit() {
    const [changePwd, setChangePwd] = useState(false);
    const userData = useSelector((state) => state?.user?.userData);
    const oauthLogin = useSelector((state) => state.user.oauthLogin);
    const error = useSelector((state) => state.user.error);
    const [modalOn, setModalOn] = useState(false);
    const [oldPwShow, setOldPwShow] = useState(false);
    const [newPwShow, setNewPwShow] = useState(false);

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
        validate: async (password) => {
            const body = {
                newPassword: password,
                oldPassword: userData.password,
            };
            const response = await axiosInstance.post(
                "/users/passwordCheck",
                body
            );
            const isMatch = response.data.isMatch;
            return isMatch || "비밀번호가 기존 비밀번호와 일치하지 않습니다!";
            // return (
            //     password === userData.password ||
            //     "비밀번호가 기존 비밀번호와 일치하지 않습니다!"
            // );
        },
    };
    const userPasswordNew = {
        validate: async (newPassword) => {
            const body = {
                newPassword,
                oldPassword: userData.password,
            };
            const response = await axiosInstance.post(
                "/users/passwordCheck",
                body
            );
            const isMatch = response.data.isMatch;
            return !isMatch || "이미 등록된 비밀번호에요!";
        },
    };

    function handleClickPwdChange() {
        setChangePwd(true);
    }
    const dispatch = useDispatch();
    async function onSubmit({ passwordNew }) {
        dispatch(updateUserPassword({ passwordNew }));
        setModalOn(true);
        reset();
    }
    return (
        <div
            className={`w-full h-full flex flex-col justify-center items-center`}
        >
            {modalOn && (
                <>
                    {error && error.error ? (
                        <NotificationModal
                            text={error.error}
                            path="/account/edit"
                            imgSrc="/images/iconSad.png"
                            imgAlt="sad icon"
                        />
                    ) : (
                        <NotificationModal
                            text="비밀번호 변경이 완료되었습니다!"
                            path="/login"
                            imgSrc="/images/iconSmile.png"
                            imgAlt="smile icon"
                        />
                    )}
                </>
            )}
            <div className="mt-12 mb-6 w-[100%] h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800">
                <Title memTitle={true}>어까</Title>
                <Title memTitle={false}>나 좀 수정해볼까?</Title>
                <div className="flex flex-col items-center w-[250px] h-[250px] mb-4 =">
                    <div className="w-[150px] h-[150px] bg-gray-100 rounded-md mb-4"></div>
                    <div
                        style={{ fontFamily: "Pretendard" }}
                        className="text-center text-[16px]"
                    >
                        <div className="text-lg font-semibold">
                            {userData.name}
                        </div>

                        <>
                            {!oauthLogin && (
                                <div className="text-lg font-medium">
                                    {userData.email}
                                </div>
                            )}
                        </>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col justify-center items-center"
                >
                    {!changePwd ? (
                        <button
                            onClick={handleClickPwdChange}
                            style={{ fontFamily: "Pretendard" }}
                            className="mb-20 w-[150px] flex justify-center items-center gap-3 px-[10px] py-[5px] text-[15px] rounded-xl border"
                        >
                            <img
                                src="/images/iconPwdLock.png"
                                alt="password lock icon for password change"
                            />
                            비밀번호 변경
                        </button>
                    ) : (
                        <div
                            style={{ fontFamily: "Pretendard" }}
                            className="mb-20 w-[400px]"
                        >
                            <div>
                                <div className="mb-4 flex gap-[10px]">
                                    <img
                                        src="/images/iconPwd.png"
                                        alt="password"
                                    />
                                    <InputWrap>
                                        <input
                                            type={
                                                oldPwShow ? "text" : "password"
                                            }
                                            id="password"
                                            placeholder="기존 비밀번호를 입력해주세요"
                                            {...register(
                                                "password",
                                                userPassword
                                            )}
                                        />
                                        <div className="absolute right-[10px] top-[7px]">
                                            {oldPwShow ? (
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setOldPwShow(false);
                                                    }}
                                                    icon={faEye}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setOldPwShow(true);
                                                    }}
                                                    icon={faEyeSlash}
                                                />
                                            )}
                                        </div>
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
                                            type={
                                                newPwShow ? "text" : "password"
                                            }
                                            placeholder="새로운 비밀번호를 입력해주세요"
                                            {...register(
                                                "passwordNew",
                                                userPasswordNew
                                            )}
                                        />
                                        <div className="absolute right-[10px] top-[7px]">
                                            {newPwShow ? (
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setNewPwShow(false);
                                                    }}
                                                    icon={faEye}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setNewPwShow(true);
                                                    }}
                                                    icon={faEyeSlash}
                                                />
                                            )}
                                        </div>
                                    </InputWrap>
                                </div>
                                {errors.passwordNew && (
                                    <div className="text-red-400 text-xs mt-4">
                                        {errors.passwordNew.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

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
                        <Link to="/account/delete">
                            <div className="w-full h-[40px] px-2.5 mb-4 rounded-md flex gap-3 justify-center items-center">
                                <img
                                    src="/images/iconUserDelete.png"
                                    alt="user delete icon for deleting user account"
                                />
                                회원탈퇴하기
                            </div>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AccountEdit;
