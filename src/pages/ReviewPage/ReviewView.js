import React, { useEffect, useState } from "react";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { IconStar, IconWish } from "../../components/Form/Icon";
import axiosInstance from "../../utils/axios";
import StarRating from "../../components/Form/StarRating";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

function ReviewView(props) {
    const { rpId, rtId, cateId } = useParams();
    const [review, setReview] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });

    useEffect(() => {
        const fetchReviewAndRestaurant = async () => {
            try {
                //리뷰정보가져오기
                const reviewRes = await axiosInstance.get(
                    `/review-posts/${rpId}`
                );
                setReview(reviewRes.data.review);
                console.log(reviewRes.data);

                //레스토랑정보가져오기
                const restaurantRes = await axiosInstance.get(
                    `/restaurants/${reviewRes.data.review.restaurantId}`
                );
                setRestaurant(restaurantRes.data.restaurant);
            } catch (error) {
                console.log(error);
            }
        };
        fetchReviewAndRestaurant();
    }, []);

    // const defaultImage = (
    //     <div className="default-image">
    //         <span>No Image</span>
    //     </div>
    // );

    // const [defaultImage, setDefaultImage] = useState(false);
    const DefaultImage = <div className="default-image"></div>;

    // if (!review || !restaurant) {
    //     return <div>Loading...</div>;
    // }

    console.log(review.length);
    return (
        <SectionWrap>
            <form>
                <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <i className="btnBack">more</i> 뒤로가기
                    </button>
                </Title>

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
                <div className="content w-full justify-center items-center mt-5 mb-2">
                    {review.content}
                </div>
                <div>{review.titleComment}</div>

                <div className="flex justify-between gap-2 mb-40">
                    {(review.image || []).map((image, index) => (
                        <div
                            key={index}
                            className="w-[175px] overflow-hidden rounded-md"
                        >
                            <img
                                src={review.image}
                                alt={`Review Image ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewView;
