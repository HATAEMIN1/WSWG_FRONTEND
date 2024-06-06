import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Title from "../../components/Layout/Title";
import { IconWish } from "../../components/Form/Icon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SectionWrap } from "../../components/Layout/Section";
function Account() {
    const isAuth = useSelector((state) => state.user.isAuth);
    const oauthLogin = useSelector((state) => state.user.oauthLogin);
    const userData = useSelector((state) => state?.user?.userData);
    const [userReviews, setUserReviews] = useState([]);
    const [likedRestaurants, setLikedRestaurants] = useState([]);
    const [userRestaurants, setUserRestaurants] = useState([]);
    const [userMeetups, setUserMeetups] = useState([]);
    const [metaDataList, setMetaDataList] = useState({});

    const retrievedImage = useSelector(
        (state) => state.user.userData.image?.filename
    );
    const retrievedImageOauth = useSelector(
        (state) => state.user.userData.image?.originalname
    );
    const location = useLocation();
    const [prePage, setPrePage] = useState("");

    useEffect(() => {
        setPrePage(location.pathname);
    }, [location]);

    useEffect(() => {
        if (userData?.id) {
            const fetchUserReviews = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/review-posts/user/${userData.id}`
                    );
                    setUserReviews(response.data.reviews);
                    console.log(response.data.reviews);
                } catch (error) {
                    console.log("내가 작성한 리뷰 불러오기 오류:", error);
                }
            };
            const fetchUserRestaurants = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/users/${userData.id}/likedResturants`
                    );
                    setUserRestaurants(response.data.restaurants);
                } catch (error) {
                    console.log("내가 찜한 가게 불러오기 오류:", error);
                }
            };

            const fetchlikedRestaurants = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/likes/user/${userData.id}`
                    );
                    setLikedRestaurants(response.data.likedRestaurants);
                } catch (error) {
                    console.log("찜한 가게 불러오기 오류", error);
                }
            };
            const fetchUserMeetups = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/users/${userData.id}/meetups`
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
            fetchlikedRestaurants();
            fetchUserRestaurants();
            fetchUserMeetups();
        }
    }, [userData?.id]);
    //foodType

    const fetchMetaData = async (url, mpId) => {
        try {
            const response = await axiosInstance.post("/meet-posts/meta", {
                url,
                mpId,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    useEffect(() => {
        const fetchAllMetaData = async () => {
            const newMetaDataList = {};
            await Promise.all(
                userMeetups.map(async (meeting) => {
                    const metaData = await fetchMetaData(
                        meeting.chatLink,
                        meeting._id,
                        meeting.commentCount
                    );
                    if (metaData) {
                        newMetaDataList[meeting.chatLink] = metaData;
                    }
                })
            );
            setMetaDataList(newMetaDataList);
        };

        if (userMeetups.length > 0) {
            fetchAllMetaData();
        }
    }, [userMeetups]);
    // 별점 표시 컴포넌트
    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {[...Array(5)].map((star, index) => (
                    <svg
                        key={`star-${index}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < rating ? "#FFE500" : "#EDEDED "}
                        viewBox="0 0 24 24"
                        stroke={index < rating ? "#FFE500" : "#BDBDBD"}
                        className="w-5 h-5"
                        color="#FFE500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div>
            {isAuth ? (
                <div className="mt-12 mb-6 w-[100%] h-full flex-col justify-start items-center inline-flex">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}> 나는 어디까지 가봤을까?</Title>

                    <div className="flex justify-center">
                        <div className="flex flex-col gap-8">
                            <div className="w-[960px] p-[15px] bg-neutral-100 rounded-[10px] border border-neutral-200 justify-start items-center gap-5 inline-flex">
                                <div className="w-[150px] h-[150px] relative bg-zinc-300 rounded-[20px] overflow-hidden">
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
                            <div className="container flex flex-col">
                                <div className="mb-10">
                                    <Title className={"titleListStt"}>
                                        내가 찜한 목록
                                    </Title>
                                    <Swiper
                                        slidesPerView={2}
                                        spaceBetween={40}
                                        pagination={true}
                                        modules={[Pagination]}
                                        className="mySwiper mySwiper"
                                    >
                                        {likedRestaurants.length > 0 ? (
                                            likedRestaurants.map(
                                                (restaurant) => (
                                                    <>
                                                        <SwiperSlide
                                                            key={restaurant._id}
                                                            className="flex gap-4 restaurantListWrap"
                                                        >
                                                            <div className="flex-none imgWrap">
                                                                <img
                                                                    src={
                                                                        restaurant
                                                                            .image[0]
                                                                    }
                                                                    alt=""
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex flex-wrap items-center py-2">
                                                                <div className="textWrap py-2">
                                                                    <h3 className="w-full">
                                                                        <Link
                                                                            to={`/mate/cateId/restaurants/${restaurant._id}`}
                                                                        >
                                                                            {
                                                                                restaurant.name
                                                                            }
                                                                        </Link>
                                                                    </h3>
                                                                    <p className="w-full">
                                                                        {
                                                                            restaurant
                                                                                .category[0]
                                                                                .foodType
                                                                        }
                                                                    </p>
                                                                    <div className="flex">
                                                                        <span className="flex-none">
                                                                            평점:{" "}
                                                                        </span>
                                                                        <StarRating
                                                                            rating={
                                                                                restaurant.rating
                                                                            }
                                                                        ></StarRating>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-4">
                                                                    {/* <IconWish
                                                                    liked={
                                                                        restaurant.likes
                                                                    }
                                                                /> */}
                                                                    <div className="flex items-center">
                                                                        <i className=" iconBasic iconView">
                                                                            view
                                                                        </i>{" "}
                                                                        {
                                                                            restaurant.views
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <div className="w-full bg-slate-100  py-[20px] text-center">
                                                찜한 가게가 없습니다!
                                            </div>
                                        )}
                                    </Swiper>
                                </div>
                                <div className=" mb-10">
                                    <Title className={"titleListStt"}>
                                        내가 작성한 리뷰
                                    </Title>
                                    <div>
                                        {userReviews.length > 0 ? (
                                            userReviews.map((review) => (
                                                <div
                                                    key={review._id}
                                                    className="reviewListWrap flex gap-5"
                                                >
                                                    <div className="overflow-hidden flex-none imgWrap">
                                                        {review.images &&
                                                            review.images.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                                                        alt={`Review Image ${index + 1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                )
                                                            )}
                                                    </div>
                                                    <div className="w-full flex flex-col justify-between py-[10px]">
                                                        <ul className="textWrap">
                                                            <Link
                                                                to={`/mate/restaurants/${review.restaurant?._id}/review-post/${review._id}`}
                                                            >
                                                                <li className="name">
                                                                    {review
                                                                        .restaurant
                                                                        ?.name ??
                                                                        "Unknown Restaurant"}
                                                                </li>
                                                            </Link>
                                                            <li className="content">
                                                                {review.content}
                                                            </li>
                                                            {/* <div className="text-xs text-zinc-400">
                                                                작성일:{" "}
                                                                {new Date(
                                                                    review.createdAt
                                                                ).toLocaleDateString()}
                                                            </div> */}
                                                            <li className="flex items-center">
                                                                <span className="flex-none">
                                                                    평점:{" "}
                                                                </span>
                                                                <span>
                                                                    <StarRating
                                                                        rating={
                                                                            review.rating
                                                                        }
                                                                    />
                                                                </span>
                                                            </li>
                                                        </ul>
                                                        <div className="flex gap-2">
                                                            {review.tags.map(
                                                                (tag, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="hashBox text-[10px]"
                                                                    >
                                                                        #
                                                                        {
                                                                            tag.name
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full bg-slate-100  py-[20px] text-center">
                                                작성한 리뷰가 없습니다!
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Title className={"titleListStt"}>
                                        내가 등록한 우리 만날까
                                    </Title>
                                    <div className="flex flex-col gap-4">
                                        {userMeetups.length > 0 ? (
                                            userMeetups.map((meetup) => (
                                                <div
                                                    key={`meetup post-${meetup._id}`}
                                                    className="mb-4"
                                                >
                                                    <div className="flex justify-between mb-3">
                                                        <Link
                                                            to={`/meet-posts/${meetup?._id}`}
                                                            className="text-base font-semibold"
                                                        >
                                                            {meetup?.title ??
                                                                "Unknown Meetup Post Name"}
                                                        </Link>
                                                        <div className="flex gap-3 items-center">
                                                            <div className="flex">
                                                                <i className="iconBasic iconView">
                                                                    view
                                                                </i>{" "}
                                                                {meetup.views}
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
                                                    </div>
                                                    {metaDataList[
                                                        meetup.chatLink
                                                    ] && (
                                                        <SectionWrap
                                                            basicSection={true}
                                                        >
                                                            <div className="container flex border rounded-md">
                                                                <div className="w-1/3">
                                                                    <a
                                                                        href={
                                                                            metaDataList[
                                                                                meetup
                                                                                    .chatLink
                                                                            ]
                                                                                .url
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                metaDataList[
                                                                                    meetup
                                                                                        .chatLink
                                                                                ]
                                                                                    .image
                                                                            }
                                                                            alt="Meta"
                                                                        />
                                                                    </a>
                                                                </div>
                                                                <div className="w-full flex-wrap grid justify-between flex-auto p-[10px]">
                                                                    <p className="font-semibold">
                                                                        <a
                                                                            href={
                                                                                metaDataList[
                                                                                    meetup
                                                                                        .chatLink
                                                                                ]
                                                                                    .url
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {
                                                                                metaDataList[
                                                                                    meetup
                                                                                        .chatLink
                                                                                ]
                                                                                    .title
                                                                            }
                                                                        </a>
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {
                                                                            metaDataList[
                                                                                meetup
                                                                                    .chatLink
                                                                            ]
                                                                                .description
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm">
                                                                        {
                                                                            metaDataList[
                                                                                meetup
                                                                                    .chatLink
                                                                            ]
                                                                                .url
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </SectionWrap>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full bg-slate-100 py-[20px] text-center">
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
