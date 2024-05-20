import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Account() {
    const isAuth = useSelector((state) => state.user.isAuth);

    const userData = useSelector((state) => state?.user?.userData);

    console.log("isAuth from account", isAuth);

    return (
        <div>
            {isAuth ? (
                <div>
                    <div
                        className="mt-12 mb-6 w-[100%] h-[100px] flex-col justify-start items-center inline-flex text-zinc-800"
                        style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
                    >
                        <div className="text-center text-5xl mb-2">어까</div>
                        <div className="text-center text-3xl">
                            나는 어디까지 가봤을까?
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-col gap-8 font-['Pretendard']">
                            <div className="w-[960px] h-[180px] p-[15px] bg-neutral-100 rounded-[10px] border border-neutral-200 justify-start items-center gap-5 inline-flex">
                                <div className="w-[150px] h-[150px] relative bg-zinc-300 rounded-[20px]">
                                    {/* <img src={userData.image.filename} alt="user profile pic" /> */}
                                </div>
                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[26px] inline-flex">
                                    <>
                                        {userData?.email && (
                                            <>
                                                <div className="self-stretch h-12 flex-col justify-start items-start gap-2.5 flex">
                                                    <div className="self-stretch text-zinc-800 text-base font-semibold">
                                                        {userData.name}
                                                    </div>
                                                    <div className="self-stretch text-zinc-800 text-base font-light">
                                                        {userData.email}
                                                    </div>
                                                </div>
                                                <div className="justify-start items-start gap-2.5 inline-flex">
                                                    <div className="w-[200px] h-9 px-2.5 py-[5px] bg-white rounded-[5px] border border-zinc-100 justify-center items-center gap-2.5 flex">
                                                        <img
                                                            src="/images/myAccountIconEditPerson.png"
                                                            alt="edit person icon"
                                                        />
                                                        <Link to="/account/edit">
                                                            <div className="text-neutral-500 text-sm font-semibold">
                                                                내 정보 수정하기
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="w-[200px] h-9 px-2.5 py-[5px] bg-white rounded-[5px] border border-zinc-100 justify-center items-center gap-2.5 flex">
                                                        <img
                                                            src="/images/myAccountIconDeletePerson.png"
                                                            alt="delete person icon"
                                                        />
                                                        <Link to="/account/delete">
                                                            <div className="flex justify-center items-center text-neutral-500 text-sm font-semibold">
                                                                회원 탈퇴
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                </div>
                            </div>
                            <div className="w-[960px] flex flex-col gap-8 text-zinc-800 text-xl font-semibold">
                                <div>내가 찜한 가게</div>
                                <div>내가 작성한 리뷰</div>
                                <div>내가 등록한 우리 만날까</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="w-full h-[400px] flex justify-center items-center text-zinc-800"
                    style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
                >
                    Loading...
                </div>
            )}
        </div>
    );
}

export default Account;
