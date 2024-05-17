import React, { useEffect, useState } from "react";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconWish } from "../../components/Form/Icon";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ReviewList from "../ReviewPage/ReviewList";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import StarRating from "../../components/Form/StarRating";
import login from "../LoginPage/Login";
import { useSelector } from "react-redux";

function RestaurantView(props) {
    const foodType = [
        { no: 1, name: "중식" },
        { no: 2, name: "일식" },
        { no: 3, name: "한식" },
        { no: 4, name: "양식" },
        { no: 5, name: "디저트" },
    ];
    const mateType = [
        { no: 1, name: "연인과 가볼까" },
        { no: 2, name: "친구와 가볼까" },
        { no: 3, name: "가족과 가볼까" },
        { no: 4, name: "단체모임 가볼까" },
        { no: 5, name: "반려동물과 가볼까" },
        { no: 6, name: "혼밥 해볼까" },
    ];
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });
    const { cateId, rtId } = useParams();
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [views, setViews] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        async function restaurantView() {
            const res = await axiosInstance.get(
                `/restaurants/${cateId}/${rtId}`
            );
            setRestaurantData([...restaurantData, res.data.restaurant]);
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
        incrementViews();
        restaurantView();
    }, []);

    const [visibleItems, setVisibleItems] = useState(6);
    const totalItems =
        restaurantData.length > 0 ? restaurantData[0].menuAndPrice.length : 0;
    const showMoreItems = () => {
        setVisibleItems((prevCount) => prevCount + 6);
    };

    const incrementViews = async () => {
        try {
            const res = await axiosInstance.post(
                `restaurants/${cateId}/${userId}/${rtId}`
            );
            setViews(res.data.restaurant.views);
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleLike = async () => {
        const body = { userId };
        console.log(body);
        try {
            if (liked) {
                await axiosInstance.delete(`/likes/${rtId}`, {
                    data: body,
                });
                setLiked(false);
                const res = await axiosInstance.get(`/likes/${rtId}`);
                setLikeCount(res.data.likeCount);
            } else {
                await axiosInstance.post(`/likes/${rtId}`, body);
                setLiked(true);
                const res = await axiosInstance.get(`/likes/${rtId}`);
                setLikeCount(res.data.likeCount);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };
    const closeModal = () => {
        setSelectedImage(null);
        setModalOpen(false);
    };

    return (
        <>
            <SectionWrap>
                <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <Link
                            to={`/mate/${cateId}`}
                            className="flex justify-center items-center"
                        >
                            <i className="btnBack">more</i> 뒤로가기
                        </Link>
                    </button>
                </Title>
                {/* restaurant info start--- */}
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
                                                rating={
                                                    restaurantData[0].rating
                                                }
                                            ></StarRating>
                                        </>
                                    )}
                                </li>
                            </ul>
                            <div className="flex textBox">
                                <div onClick={handleLike}>
                                    <IconWish className={"active"}>
                                        좋아요
                                    </IconWish>{" "}
                                    {likeCount}
                                </div>
                                <div>
                                    <i className="iconBasic iconView">view</i>{" "}
                                    {views}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-[20px] py-[20px]">
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreLoc">local</i>
                        {restaurantData.length > 0 && (
                            <>{restaurantData[0].address}</>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreTel">tel</i>{" "}
                        010-1234-5676
                    </div>
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreTime">time</i>{" "}
                        11:30 ~ 21:30
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex mateBox checked">
                        <i className="iconBasic iconCheck">check</i>{" "}
                        {mateType[0].name}
                    </div>
                    <div className="flex mateBox">
                        <i className="iconBasic iconCheck">check</i>{" "}
                        {mateType[1].name}
                    </div>
                    <div className="flex mateBox">
                        <i className="iconBasic iconCheck">check</i>{" "}
                        {mateType[2].name}
                    </div>
                </div>
                {/* --- restaurant info end */}
                {/* menu Price start ---  */}
                <div className="pt-[40px]">
                    <Title className={"titleComment"}>메뉴</Title>

                    {restaurantData.length > 0 &&
                        restaurantData[0].menuAndPrice
                            .slice(0, visibleItems)
                            .map((item, i) => {
                                return (
                                    <ul
                                        className="flex justify-between h-full items-center py-2"
                                        key={`restaurantMenuPrice-${i}`}
                                    >
                                        <li className="pr-4">{item.menu}</li>
                                        <li className="flex-auto h-full">
                                            <span className="flex w-full border-dashed border-gray-300 border-b-[1px]"></span>
                                        </li>
                                        <li className="pl-4 font-bold">
                                            {item.price}
                                        </li>
                                    </ul>
                                );
                            })}
                    <ButtonWrap>
                        {visibleItems < totalItems && (
                            <Button
                                className={"lineButton"}
                                onClick={showMoreItems}
                            >
                                <i className="iconBasic iconMore">more</i>{" "}
                                더보기
                            </Button>
                        )}
                    </ButtonWrap>
                </div>
                {/* --- menu Price end */}
                {/* review List start --- */}
                <ReviewList />
            </SectionWrap>
        </>
    );
}

export default RestaurantView;
