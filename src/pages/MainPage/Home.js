import React from "react";
import { SectionFullWrap, SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Navigation} from 'swiper/modules';
import StarRating from "../../components/Form/StarRating";
import { Swiper ,SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import MyMap from "../../components/Map/MyMap";
import { Link } from "react-router-dom";

function Home({ ...props }) {
    const foodType = [
        {
            no: 1,
            name: "#한식",
            rst:[
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample2.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample3.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample4.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
            ],
        },
        {
            no: 2,
            name: "#양식",
            rst:[
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
            ],
        },
        {
            no: 3,
            name: "#중식",
            rst:[
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
            ],
        },
        {
            no: 4,
            name: "#일식",
            rst:[
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
            ],
        },
        {
            no: 5,
            name: "#디저트",
            rst:[
                {
                rstName: "중국집1",
                rating :"",
                rstImage: "imageSample1.png",
                link :"",
                },
            ],
        },
    ]
    return (
        <>
            <SectionFullWrap className={"relative z-1"}>
                <div className="bg-blue-500">
                    {/* <MyMap></MyMap> */}
                    <img src={`${process.env.PUBLIC_URL}/images/mainMap.png`} className="h-[380px] w-full"/>{/*나중에 맵 화면 붙히고 삭제해주세요!*/}
                </div>
                <div className="w-full absolute bottom-0 py-3 mainMapLayer">
                    <SectionWrap className={"flex justify-between mainMapButton"} basicSection={true}>
                        <div className="w-1/2 text-white text-[20px]"><Link className="flex justify-center align-middle" onClick={() => {
                                props.modalOpen(0);
                            }}><i className="iconMark"></i>지역설정하기</Link></div>
                        <div className="w-1/2 text-white text-[20px]"><Link className="flex justify-center align-middle"><i className="iconMap"></i>현위치보기</Link></div>
                    </SectionWrap>
                </div>
            </SectionFullWrap>
            <div className="w-[1024px] m-auto pt-[100px]">
                {foodType.map((item,i) => { 
                    return (
                        <div key={1} className="mb-[100px]">
                            <Title className={"titleBasic mx-[32px]"}>{item.name}</Title>
                            <Swiper slidesPerView={4}
                            spaceBetween={55}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper mainSwiper">
                            {item.rst.map((rst,i) => {
                                return (
                                    <SwiperSlide key={i} className="rstWrap">
                                        <div className="rstImagwrap"><img src={`${process.env.PUBLIC_URL}/images/${rst.rstImage}`} /></div>
                                        <div className="rstLayerWrap">
                                            <div>{rst.rstName}</div>
                                            <div><StarRating rating={rst.rating}></StarRating> </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                            </Swiper>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Home;
