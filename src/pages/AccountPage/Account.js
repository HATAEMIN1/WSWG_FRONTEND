import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";

function Account() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const oauthLogin = useSelector((state) => state.user.oauthLogin);
    const userData = useSelector((state) => state?.user?.userData);
    const retrievedImage = useSelector(
        (state) => state.user.userData.image?.filename
    );

    return (
        <div>
            {isAuth ? (
                <div className="mt-12 mb-6 w-[100%] h-full flex-col justify-start items-center inline-flex font-normal text-zinc-800">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}> 나는 어디까지 가봤을까?</Title>

                    <div className="flex justify-center">
                        <div className="flex flex-col gap-8 font-['Pretendard']">
                            <div className="w-[960px] h-[300px] px-[30px] bg-neutral-100 rounded-[10px] border border-neutral-200 justify-start items-center gap-5 inline-flex">
                                <div className="w-[150px] h-[150px] relative bg-zinc-300 rounded-[20px]">
                                { retrievedImage!=="noimage.jpg" ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            process.env
                                                .REACT_APP_NODE_SERVER_UPLOAD_URL +
                                            retrievedImage
                                        }
                                        alt="user profile pic"
                                    />):(<img
                                        className="w-full h-full object-cover"
                                        src="/images/profileDefault.png"
                                        alt="defaultPic"
                                    />)}
                                </div>
                                <div className="grow shrink basis-0 flex-col justify-start items-start gap-[26px] inline-flex">
                                    <>
                                        {userData?.email && (
                                            <>
                                                <div className="self-stretch h-12 flex-col justify-start items-start gap-2.5 flex">
                                                    <div className="self-stretch text-zinc-800 text-base font-semibold">
                                                        {userData.name}
                                                    </div>
                                                    <div>
                                                        {!oauthLogin && (
                                                            <div className="self-stretch text-zinc-800 text-base font-light">
                                                                {userData.email}
                                                            </div>
                                                        )}
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
