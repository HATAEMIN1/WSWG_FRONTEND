import React from "react";
import { useSelector } from "react-redux";
import InputWrap from "../../components/Form/Input";

function AccountEdit() {
    const userData = useSelector((state) => state?.user?.userData);
    return (
        <>
            <div
                className="mt-12 mb-6 w-[100%] h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl mb-2">어까</div>
                <div className="text-center text-3xl mb-10">
                    나 좀 수정해볼까?
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
                <div
                    style={{ fontFamily: "Pretendard" }}
                    className="mb-20 w-[400px]"
                >
                    <div className="mb-4 flex gap-[10px]">
                        <img src="/images/iconPwd.png" alt="password" />
                        <InputWrap>
                            <input type="text" placeholder="테스트 입력용" />
                        </InputWrap>
                    </div>
                    <div className="flex gap-[10px]">
                        <img
                            src="/images/iconPwdDoubleCheck.png"
                            alt="password double check"
                        />
                        <InputWrap>
                            <input type="text" placeholder="테스트 입력용" />
                        </InputWrap>
                    </div>
                </div>
                <div style={{ fontFamily: "Pretendard" }}>
                    <div className="w-[400px] h-[40px] px-2.5 mb-4 rounded-md text-[15px] flex justify-center items-center bg-primary-300">
                        확인
                    </div>
                    <div className="w-[400px] h-[40px] px-2.5 mb-4 rounded-md text-[15px] flex justify-center items-center bg-primary-300">
                        취소
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountEdit;
