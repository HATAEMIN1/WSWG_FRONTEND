import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Title from "../../components/Layout/Title";

function Account() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);
    const oauthLogin = useSelector((state) => state.user.oauthLogin);
    const userData = useSelector((state) => state?.user?.userData);
    const [userReviews, setUserReviews] = useState([]);
    const [userRestaurants, setUserRestaurants] = useState([]);
    const [userMeetups, setUserMeetups] = useState([]);
    const retrievedImage = useSelector(
        (state) => state.user.userData.image?.filename
    );
    const retrievedImageOauth = useSelector(
        (state) => state.user.userData.image?.originalname
    );

    useEffect(() => {
        if (userData?.id) {
            const fetchUserReviews = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/review-posts/user/${userData.id}`
                    );
                    setUserReviews(response.data.reviews);
                } catch (error) {
                    console.log("내가 작성한 리뷰 불러오기 오류:", error);
                }
            };
            const fetchUserRestaurants = async () => {
                try {
                    console.log(`/users/${userData.id}/likedResturants`);
                    const response = await axiosInstance.get(
                        `/users/${userData.id}/likedResturants`
                    );
                    console.log(
                        "response.data in fetchUserRestaurants:",
                        response.data
                    );
                    setUserRestaurants(response.data.restaurants);
                } catch (error) {
                    console.log("내가 찜한 가게 불러오기 오류:", error);
                }
            };
            const fetchUserMeetups = async () => {
                try {
                    console.log(`/users/${userData.id}/meetups`);
                    const response = await axiosInstance.get(
                        `/users/${userData.id}/meetups`
                    );
                    console.log(
                        "response.data in fetchUserMeetups:",
                        response.data
                    );
                    setUserMeetups(response.data.meetupPosts);
                } catch (error) {
                    console.log(
                        "내가 등록한 우리 만날까 불러오기 오류:",
                        error
                    );
                }
            };
            fetchUserReviews();
            fetchUserRestaurants();
            fetchUserMeetups();
        }
    }, [userData?.id]);

    // 별점 표시 컴포넌트
    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((star, index) => (
                    <svg
                        key={`star-${index}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < rating ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-yellow-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    console.log("userRestaurants in my account page:", userRestaurants);
    console.log("userMeetups in account page", userMeetups);

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
                                    {oauthLogin ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={retrievedImageOauth}
                                            alt="profileImageFromOauthProfile"
                                        />
                                    ) : (
                                        <>
                                            {retrievedImage !==
                                            "noimage.jpg" ? (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        process.env
                                                            .REACT_APP_NODE_SERVER_UPLOAD_URL +
                                                        retrievedImage
                                                    }
                                                    alt="user profile pic"
                                                />
                                            ) : (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src="/images/defaultImageSquare.png"
                                                    alt="defaultPic"
                                                />
                                            )}
                                        </>
                                    )}
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
                                <div>
                                    내가 찜한 가게
                                    <div className="flex flex-col gap-4 mt-4">
                                        {userRestaurants &&
                                        userRestaurants.length > 0 &&
                                        userRestaurants[0] !== null ? (
                                            userRestaurants.map(
                                                (restaurant) => (
                                                    <div
                                                        key={`restaurant-${restaurant._id}`}
                                                        className="bg-neutral-100 p-4 rounded-md border border-neutral-200"
                                                    >
                                                        <Link
                                                            to={`/restaurants/${restaurant?._id}`}
                                                            className="text-base font-semibold text-blue-500"
                                                        >
                                                            {restaurant?.name ??
                                                                "Unknown Restaurant"}
                                                        </Link>
                                                        <div className="text-sm text-zinc-600">
                                                            {restaurant.content}
                                                        </div>
                                                        {/* <div className="text-sm text-zinc-400">
                                                            등록일:{" "}
                                                            {new Date(
                                                                restaurant.createdAt
                                                            ).toLocaleDateString()}
                                                        </div> */}
                                                        <div className="flex items-center mt-2">
                                                            <span className="mr-1">
                                                                별점:{" "}
                                                            </span>
                                                            <StarRating
                                                                rating={
                                                                    restaurant.rating
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex gap-2 mt-2">
                                                            {restaurant.images &&
                                                                restaurant.images.map(
                                                                    (
                                                                        image,
                                                                        index
                                                                    ) => (
                                                                        <img
                                                                            key={`restaurant image-${index}`}
                                                                            src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                                                            alt={`Restaurant Image ${index + 1}`}
                                                                            className="w-[100px] h-[100px] object-cover rounded"
                                                                        />
                                                                    )
                                                                )}
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="text-sm">
                                                찜한 가게가 없습니다!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    내가 작성한 리뷰
                                    <div className="flex flex-col gap-4 mt-4">
                                        {userReviews.length > 0 ? (
                                            userReviews.map((review) => (
                                                <div
                                                    key={review._id}
                                                    className="bg-neutral-100 p-4 rounded-md border border-neutral-200"
                                                >
                                                    <Link
                                                        to={`/mate/restaurants/${review.restaurant?._id}/review-post/${review._id}`}
                                                        className="text-base font-semibold text-blue-500"
                                                    >
                                                        {review.restaurant
                                                            ?.name ??
                                                            "Unknown Restaurant"}
                                                    </Link>
                                                    <div className="text-sm text-zinc-600">
                                                        {review.content}
                                                    </div>
                                                    <div className="text-sm text-zinc-400">
                                                        등록일:{" "}
                                                        {new Date(
                                                            review.createdAt
                                                        ).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <span className="mr-1">
                                                            별점:{" "}
                                                        </span>
                                                        <StarRating
                                                            rating={
                                                                review.rating
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 mt-2">
                                                        {review.images &&
                                                            review.images.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={`review post image-${index}`}
                                                                        src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                                                        alt={`Review Image ${index + 1}`}
                                                                        className="w-[100px] h-[100px] object-cover rounded"
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm">
                                                작성한 리뷰가 없습니다!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    내가 등록한 우리 만날까
                                    <div className="flex flex-col gap-4 mt-4">
                                        {userMeetups.length > 0 ? (
                                            userMeetups.map((meetup) => (
                                                <div
                                                    key={`meetup post-${meetup._id}`}
                                                    className="bg-neutral-100 p-4 rounded-md border border-neutral-200"
                                                >
                                                    <Link
                                                        to={`/meetupposts/${meetup?._id}`}
                                                        className="text-base font-semibold text-blue-500"
                                                    >
                                                        {meetup?.title ??
                                                            "Unknown Meetup Post Name"}
                                                    </Link>
                                                    {/* <div className="text-sm text-zinc-600">
                                                        {meetup.content}
                                                    </div>
                                                    <div className="text-sm text-zinc-400">
                                                        등록일:{" "}
                                                        {new Date(
                                                            meetup.createdAt
                                                        ).toLocaleDateString()}
                                                    </div> */}
                                                    {/* <div className="flex items-center mt-2">
                                                        <span className="mr-1">
                                                            별점:{" "}
                                                        </span>
                                                        <StarRating
                                                            rating={
                                                                meetup.rating
                                                            }
                                                        />
                                                    </div> */}
                                                    <div className="flex items-center mt-2">
                                                        조회수: {meetup.views}
                                                    </div>
                                                    <div className="flex gap-2 mt-2">
                                                        {meetup.images &&
                                                            meetup.images.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={`meetup post image-${index}`}
                                                                        src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                                                        alt={`Meetup Post Image ${index + 1}`}
                                                                        className="w-[100px] h-[100px] object-cover rounded"
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm">
                                                등록한 우리 만날까 게시글이
                                                없습니다!
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="w-full h-[400px] flex justify-center items-center text-zinc-800"
                    style={{ fontFamily: "TTHakgyoansimMonggeulmonggeulR" }}
                >
                    Logged Out 로그아웃 되셨습니다
                </div>
            )}
        </div>
    );
}

export default Account;