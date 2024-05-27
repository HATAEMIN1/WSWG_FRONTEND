import React, { useEffect, useState } from "react";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
// import { IconStar, IconWish } from "../../components/Form/Icon";

import axiosInstance from "../../utils/axios";
import StarRating from "../../components/Form/StarRating";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
// import { faObjectUngroup } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function ReviewView(props) {
    const { rpId, rtId, cateId } = useParams();
    const [review, setReview] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });
    const navigate = useNavigate();

    //리뷰정보가져오기
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const reviewRes = await axiosInstance.get(
                    `/review-posts/${rpId}/view`
                );
                setReview(reviewRes.data.review);
                console.log(reviewRes.data);
            } catch (error) {
                console.log("리뷰정보가져오기오류", error);
            }
        };
        fetchReview();
    }, [rpId]);

    // 레스토랑 정보 가져오기
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axiosInstance.get(
                    `/restaurants/${cateId}/${rtId}`
                );
                setRestaurant((prevData) => [...prevData, res.data.restaurant]);
            } catch (error) {
                console.error("레스토랑 정보 가져오기 오류:", error);
            }
        };
        fetchRestaurant();
    }, [cateId, rtId]);

    return (
        <SectionWrap>
            <form>
                {/* <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <i className="btnBack">more</i> 뒤로가기
                    </button>
                </Title> */}
                <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <Link
                            to={`/mate/${cateId}/restaurants/${rtId}`}
                            className="flex justify-center items-center"
                        >
                            <i className="btnBack">more</i> 뒤로가기
                        </Link>
                    </button>
                </Title>
                <div className="w-full min-h-[120px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border items-center">
                    <div className=" w-[100px] overflow-hidden border-r-[1px] p-2">
                        {restaurant.length > 0 && (
                            <img
                                src={restaurant[0].image[0]}
                                alt=""
                                className="block"
                            />
                        )}
                    </div>
                    <div className="flex-auto p-[20px]">
                        {restaurant.length > 0 && (
                            <div>
                                <h2>{restaurant[0].name}</h2>
                                <p>{restaurant[0].category[0].foodtype}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex mb-7">
                    <div className="w-[100px] rounded-md overflow-hidden">
                        {restaurant.image}
                    </div>

                    <div>
                        <div>{restaurant.name}</div>
                        <div className="text-sm">{restaurant.foodType}</div>
                    </div>
                </div>

                <div className="flex gap-5 py-5 ">
                    <div className="w-[100px] rounded-md overflow-hidden">
                        <img src="/images/mate_friend.png" alt="" />
                    </div>

                    <div>
                        <div className="textWrap mb-4 mt-1">
                            <div className="font-semibold text-xl">
                                {review.user?.name}
                            </div>
                            <div>
                                <span className="text-xs">
                                    작성 날짜:{" "}
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <div className="gap-1 justify-center items-center ">
                            {review && (
                                <div className="flex gap-1 justify-center items-center">
                                    <span className="flex-none">평점 </span>
                                    <StarRating
                                        rating={review.rating}
                                    ></StarRating>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="content w-full justify-center items-center mt-5 mb-3">
                    {review.content}
                </div>
                <div className="hashBoxWrap mb-9">
                    {review.hashTag &&
                        review.hashTag.length > 0 &&
                        review.hashTag.map((tag, i) => (
                            <span key={i} className="hashBox">
                                #{tag}
                            </span>
                        ))}
                </div>
                <div className="flex gap-2 mb-40">
                    {review.images &&
                        review.images.length > 0 &&
                        review.images.map((image, index) => (
                            <div
                                key={index}
                                className="w-[175px] overflow-hidden border rounded-lg"
                            >
                                {/* <div className="border rounded"> */}
                                <img
                                    src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${image}`}
                                    className="w-full h-full object-cover"
                                    alt={`Review Image ${index + 1}`}
                                />
                                {/* </div> */}
                            </div>
                        ))}
                </div>

                <div className="hashBoxWrap">
                    {review.hashTag > 0 &&
                        review.hashTag.map((tag, i) => (
                            <span key={i} className="hashBox">
                                #{tag}
                            </span>
                        ))}
                </div>
                {/* <div>{review.images}</div> */}
            </form>
        </SectionWrap>
    );
}

export default ReviewView;
