import { useSelector } from "react-redux";

function Account() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const userData = useSelector((state) => state.user.userData.user);

    console.log("isAuth from account", isAuth);

    return (
        <>
            <div
                className="w-[100%] h-[100px] mt-4 flex-col justify-start items-center inline-flex font-normal text-zinc-800"
                style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
            >
                <div className="text-center text-5xl">어까</div>
                <div className="text-center text-3xl">
                    나는 어디까지 가봤을까?
                </div>
            </div>
            <div className="flex justify-center">
                {isAuth && (
                    <div class="w-[960px] h-[180px] p-[15px] bg-neutral-100 rounded-[10px] border border-neutral-200 justify-start items-center gap-5 inline-flex">
                        <div class="w-[150px] h-[150px] relative bg-zinc-300 rounded-[20px]"></div>
                        <div class="grow shrink basis-0 flex-col justify-start items-start gap-[26px] inline-flex">
                            <>
                                {userData && (
                                    <>
                                        <div class="self-stretch h-12 flex-col justify-start items-start gap-2.5 flex">
                                            <div class="self-stretch text-zinc-800 text-base font-semibold font-['Pretendard']">
                                                {userData.name}
                                            </div>
                                            <div class="self-stretch text-zinc-800 text-base font-light font-['Pretendard']">
                                                {userData.email}
                                            </div>
                                        </div>
                                        <div class="justify-start items-start gap-2.5 inline-flex">
                                            <div class="w-[200px] h-9 px-2.5 py-[5px] bg-white rounded-[5px] border border-zinc-100 justify-center items-center gap-2.5 flex">
                                                <img
                                                    src="/images/myAccountIconEditPerson.png"
                                                    alt="edit person icon"
                                                />
                                                <div class="text-neutral-500 text-sm font-semibold font-['Pretendard']">
                                                    내 정보 수정하기
                                                </div>
                                            </div>
                                            <div class="w-[200px] h-9 px-2.5 py-[5px] bg-white rounded-[5px] border border-zinc-100 justify-center items-center gap-2.5 flex">
                                                <img
                                                    src="/images/myAccountIconDeletePerson.png"
                                                    alt="delete person icon"
                                                />
                                                <div class="flex justify-center items-center text-neutral-500 text-sm font-semibold font-['Pretendard']">
                                                    회원 탈퇴
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        </div>
                    </div>
                    // <div>
                    //     <h2>User Profile</h2>
                    //     {userData && (
                    //         <div>
                    //             <p>Email: {userData.email}</p>
                    //             <p>Name: {userData.name}</p>
                    //             <p>Id: {userData.id}</p>
                    //         </div>
                    //     )}
                    // </div>
                )}
            </div>
        </>
    );
}

export default Account;
