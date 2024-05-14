import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Account() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const userData = useSelector((state) => state.user.userData.user);
    const navigate = useNavigate();
    console.log("isAuth from account", isAuth);
    if (isAuth) {
        console.log("state.user.userData.user", userData);
        return (
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
        );
    } else {
        navigate("/login");
    }
}

export default Account;
