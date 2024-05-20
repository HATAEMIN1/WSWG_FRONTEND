import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IconWish } from "../../components/Form/Icon";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import StarRating from "../../components/Form/StarRating";
import InputWrap from "../../components/Form/Input";

function MeetingView(props) {
    const [restaurantData, setRestaurantData] = useState([]);
    const [views, setViews] = useState(0);
    const { mpId } = useParams();
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.user?.userData);


    const incrementViews = async () => {
        try {
            const res = await axiosInstance.post(
                `meetUpPost//${userId}/${mpId}`
            );
            setViews(res.data.meetUpPost.views);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <SectionWrap>
            <Title className={"titleComment"}>
                <Link to="/meet-posts">
                    <button className="flex items-center">
                        <i className="btnBack">more</i> BACK
                    </button>
                </Link>
            </Title>
            <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                <div className="w-full overflow-hidden border-r-[1px]">
                    지도를 넣어봅시다.
                </div>
                <div className="flex-auto p-[20px]">
                    <div className="w-[360px] h-[360px] bg-slate-300 rounded-md overflow-hidden">
                        <Swiper
                            pagination={true}
                            modules={[Pagination]}
                            className="mySwiper swiperView"
                        >
                            {restaurantData.length > 0 &&
                                restaurantData[0].image
                                    .slice(2)
                                    .map((item, i) => {
                                        return (
                                            <SwiperSlide
                                                key={`restaurantSlide-${i}`}
                                            >
                                                <div className="bgLayer"></div>
                                                <img
                                                    src={`${item}`}
                                                    alt={`restaurantSlideImg-${i}`}
                                                />
                                            </SwiperSlide>
                                        );
                                    })}
                        </Swiper>
                    </div>
                    <div className="flex flex-wrap">
                        {restaurantData.length > 0 && (
                            <h4>{restaurantData[0].name}</h4>
                        )}
                        <ul>
                            <li>
                                {restaurantData.length > 0 &&
                                    restaurantData[0].category[0].foodtype}
                            </li>
                            <li className="flex">
                                {restaurantData.length > 0 && (
                                    <>
                                        <span className="flex-none">
                                            평점:{" "}
                                        </span>
                                        <StarRating
                                            rating={restaurantData[0].rating}
                                        ></StarRating>
                                    </>
                                )}
                            </li>
                        </ul>
                        <div className="flex textBox">
                            <div>
                                <IconWish className={"active"}>좋아요</IconWish>{" "}
                                123
                            </div>
                            <div>
                                <i className="iconBasic iconView">view</i>{" "}
                                {views}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <Title className={"titleComment"}>댓글</Title>
            </div>
            <InputWrap>
                <input type="text" placeholder="댓글을 입력해주세요" />
            </InputWrap>
        </SectionWrap>
    );
}

export default MeetingView;
