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
                    <div>
                        <h2>User Profile</h2>
                        {userData && (
                            <div>
                                <p>Email: {userData.email}</p>
                                <p>Name: {userData.name}</p>
                                <p>Id: {userData.id}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Account;
