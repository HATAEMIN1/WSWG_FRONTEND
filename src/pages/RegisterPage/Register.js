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
import imageCompression from "browser-image-compression";

function Register() {
    const {
        register,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm({ mode: "onChange" });
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);

    const [modalOn, setModalOn] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [pwShow, setPwShow] = useState(false);
    const [pwShowConfirm, setPwShowConfirm] = useState(false);

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.elements.image.files[0];
        console.log("file from event target elements:", file);
        console.log("handleSubmit");
        console.log("file is an instance of Blob:", file instanceof Blob); // true (if file chosen)
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            console.log("compressedFile:", compressedFile);
            formData.append("file", compressedFile);
            console.log(
                "compressed file is an instance of Blob:",
                compressedFile instanceof Blob
            ); // true
            console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
            formData.append("name", signupInfo.name);
            formData.append("email", signupInfo.email);
            formData.append("password", signupInfo.password);

            for (let keyVal of formData.entries()) {
                if (keyVal[0] === "file") {
                    const fileObject = keyVal[1];
                    console.log(`${keyVal[0]}:`);
                    console.log("name:", fileObject.name);
                    console.log("size:", fileObject.size);
                    console.log("type:", fileObject.type);
                } else {
                    console.log(`${[keyVal[0]]}: ${keyVal[1]}`);
                }
            }

            // dispatch(registerUser(signupInfo);
            // setModalOn(true);
            // reset();
        } catch (error) {
            console.log(error);
        }
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

    async function handleImgUpload(file) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        console.log("handleImgUpload");
        console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImgSrc(fileReader.result);
        };
        const compressedFile = await imageCompression(file, options);
        console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        );
        fileReader.readAsDataURL(compressedFile); // encode file as a base64 url string
    }

    // setValue("name", signupInfo.name);
    // setValue("email", signupInfo.email);
    // setValue("password", signupInfo.password);

    function handleChange(e) {
        console.log("e.target", e.target);
        const { name, value } = e.target;
        setSignupInfo((prevState) => {
            return { ...prevState, [name]: value };
        });
        setValue(name, value); // sync the value with react-hook-form
    }

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

                <div className="w-full h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}>가입 해볼까?</Title>
                    <form onSubmit={handleSubmit}>
                        <div className="emailWrap flex justify-center gap-4 ml-2 mt-5 mb-5">
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
                                    name="email"
                                    // value={signupInfo.email}
                                    // onChange={handleChange}
                                    required
                                    placeholder="이메일을 입력하세요!"
                                    {...register("email", {
                                        ...userEmail,
                                        onChange: (e) => handleChange(e),
                                    })}
                                />
                                {errors.email && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="usernameWrap gap-4 flex ml-2 justify-between mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconPerson.png"
                                        alt="person icon"
                                    />
                                </div>
                            </div>
                            <div style={{ fontFamily: "Pretendard-Regular" }}>
                                <input
                                    className="w-[330px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type="text"
                                    id="usernameInput"
                                    name="name"
                                    // value={signupInfo.name}
                                    required
                                    maxLength="50"
                                    // onChange={handleChange}
                                    placeholder="닉네임을 입력하세요!"
                                    {...register("name", {
                                        ...userName,
                                        onChange: (e) => handleChange(e),
                                    })}
                                />

                                {errors.name && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="passwordWrap ml-2 gap-4 flex justify-between mb-5">
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
                                    id="passwordInput"
                                    name="password"
                                    // value={signupInfo.password}
                                    type={pwShow ? "text" : "password"}
                                    required
                                    minLength="4"
                                    // onChange={handleChange}
                                    placeholder="비밀번호를 입력하세요!"
                                    {...register("password", {
                                        ...userPassword,
                                        onChange: (e) => handleChange(e),
                                    })}
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
                        <div className="passwordConfirmWrap ml-2 flex justify-between gap-4 mb-5">
                            <div className="w-10 h-10 relative">
                                <div className="w-[35px] h-[35px] left-[7px] top-[2px] absolute">
                                    <img
                                        src="./images/iconPwdDoubleCheck.png"
                                        alt="password double check icon"
                                    />
                                </div>
                            </div>
                            <div
                                style={{ fontFamily: "Pretendard-Regular" }}
                                className="relative"
                            >
                                <input
                                    className="w-[330px] h-10 bg-neutral-100 text-center text-zinc-400 text-base font-normal"
                                    type={pwShowConfirm ? "text" : "password"}
                                    id="passwordConfirmInput"
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
                            </div>
                        </div>
                        <div className="w-[380px] ml-3 mb-5">
                            <input
                                {...register("image")}
                                type="file"
                                onChange={(e) =>
                                    handleImgUpload(e.target.files[0])
                                }
                                name="image"
                                accept="image/*"
                                className="mb-4"
                            />
                            <div>
                                {imgSrc && (
                                    <img
                                        src={imgSrc}
                                        alt="preview of uploaded img"
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            style={{ fontFamily: "Pretendard-Regular" }}
                            className="w-[380px] h-[50px] px-2.5 py-[5px] ml-3 mb-5 bg-teal-300 rounded-[5px] text-center text-teal-950 justify-center text-[15px] font-normal items-center gap-2.5 inline-flex"
                        >
                            회원가입
                        </button>
                        <div
                            style={{ fontFamily: "Pretendard-Regular" }}
                            className="text-black text-[15px] ml-3 font-normal flex justify-center items-center"
                        >
                            이미 어까의 회원이라면 바로
                            <a href="/login" className="mx-[6px] underline">
                                로그인!
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
