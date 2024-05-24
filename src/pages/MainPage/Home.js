import React, { useEffect, useState } from "react";
import { SectionFullWrap, SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Navigation } from "swiper/modules";
import StarRating from "../../components/Form/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MyMap from "../../components/Map/MyMap";
import { Link } from "react-router-dom";
import Map from "../../components/Map/Map";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

function Home({ ...props }) {
    // const foodType = [
    //     {
    //         no: 1,
    //         name: "#한식",
    //         rst: [
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample2.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample3.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample4.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //         ],
    //     },
    //     {
    //         no: 2,
    //         name: "#양식",
    //         rst: [
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //         ],
    //     },
    //     {
    //         no: 3,
    //         name: "#중식",
    //         rst: [
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //         ],
    //     },
    //     {
    //         no: 4,
    //         name: "#일식",
    //         rst: [
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //         ],
    //     },
    //     {
    //         no: 5,
    //         name: "#디저트",
    //         rst: [
    //             {
    //                 rstName: "중국집1",
    //                 rating: "",
    //                 rstImage: "imageSample1.png",
    //                 link: "",
    //             },
    //         ],
    //     },
    // ];
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];
    const foodType = ["한식", "양식", "중식", "일식", "디저트"];
    const [geoData, setGeoData] = useState([]);
    const [geoCenter, setGeoCenter] = useState([
        37.48073710748562, 126.87963572538791,
    ]);
    const foodtype = useSelector((state) => state.filter.foodType);
    const cateId = useSelector((state) => {
        const mateTypeName = state.filter.mateType;
        const selectedMateType = mateType.find(
            (type) => type.name === mateTypeName
        );
        return selectedMateType ? selectedMateType.cateId : "";
    });
    const [geoMouse, setGeoMouse] = useState(3);
    const fetchRestaurant = async (foodtype, cateId) => {
        try {
            const params = { foodtype };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            setGeoData(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };

    // useEffect(() => {
    //     fetchRestaurant();
    // }, [cateId, foodtype]);
    useEffect(() => {
        fetchRestaurant();
    }, []);

    return (
        <>
            <SectionFullWrap className={"relative z-1"}>
                <div className=" relative">
                    <Map
                        {...props}
                        geoData={geoData}
                        geoCenter={geoCenter}
                        geoMouse={geoMouse}
                        setGeoCenter={setGeoCenter}
                        setGeoMouse={setGeoMouse}
                        fetchRestaurant={fetchRestaurant}
                        setGeoData={setGeoData}
                    ></Map>
                    {/*<img src={`${process.env.PUBLIC_URL}/images/mainMap.png`} className="h-[380px] w-full"/>/!*나중에 맵 화면 붙히고 삭제해주세요!*!/*/}
                </div>
            </SectionFullWrap>
            <div className="w-[1024px] m-auto pt-20">
                {foodType.map((item, i) => {
                    const filteredGeoData = geoData.filter(
                        (restaurant) =>
                            restaurant.category[0].foodType === foodType[i]
                    );
                    console.log(filteredGeoData);
                    return (
                        <div key={`foodType-${i}`} className="mb-[100px]">
                            <Title className={"titleBasic mx-[32px]"}>
                                #{item}
                            </Title>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={55}
                                navigation={true}
                                modules={[Navigation]}
                                className="mySwiper mainSwiper"
                            >
                                {filteredGeoData.map((item, i) => {
                                    return (
                                        <SwiperSlide
                                            key={`rst-${i}`}
                                            className="rstWrap"
                                        >
                                            <div className="rstImagwrap">
                                                <img
                                                    src={item.image[0]}
                                                    alt="rstImgWrap"
                                                />
                                            </div>
                                            <div className="rstLayerWrap">
                                                <div>{item.name}</div>
                                                <div>
                                                    <StarRating
                                                        rating={item.rating}
                                                    ></StarRating>{" "}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    );
                })}
                {/*{foodType.map((foodtype, i) => {*/}
                {/*    const filteredGeoData = geoData.filter(*/}
                {/*        (restaurant) =>*/}
                {/*            restaurant.category[0].foodType === foodtype*/}
                {/*    );*/}
                {/*    console.log(filteredGeoData);*/}
                {/*    return (*/}
                {/*        <div key={i}>*/}
                {/*            <h2>{foodtype}</h2>*/}
                {/*            <ul>*/}
                {/*                {filteredGeoData.map((restaurant, index) => (*/}
                {/*                    <li key={index}>{restaurant.name}</li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
            </div>
        </>
    );
}

export default Home;
