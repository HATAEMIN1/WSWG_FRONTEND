import { useSelector } from "react-redux";

function Account() {
    const userData = useSelector((state) => state.user.userData);
    return (
        <div>
            <h2>User Profile</h2>
            {userData && (
                <div>
                    <p>Email: {userData.email}</p>
                    <p>Name: {userData.name}</p>
                    <p>Role: {userData.role}</p>
                    <p>Image: {userData.image}</p>
                </div>
            )}
        </div>
    );
}

export default Account;
