import React, { useState } from "react";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Pagination } from 'swiper/modules';
import { Swiper ,SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

function RestaurantView(props) {
    const foodType = [
        {no:1,name:"중식",},
        {no:2,name:"일식"},
        {no:3,name:"한식"},
        {no:4,name:"양식"},
        {no:5,name:"디저트"},
    ]
    const mateType = [
        { no: 1, name: "연인과 가볼까" },
        { no: 2, name: "친구와 가볼까" },
        { no: 3, name: "가족과 가볼까" },
        { no: 4, name: "단체모임 가볼까" },
        { no: 5, name: "반려동물과 가볼까" },
        { no: 6, name: "혼밥 해볼까" },
      ];
    const swiperImage =[
        {image :"imageSample1"},
        {image :"imageSample2"},
        {image :"imageSample3"},
        {image :"imageSample4"},
    ]
    const menuAndPrice = [
        {
            menu : "NY양념 모둠 갈비",
            price : "48,800원"
        },
        {
            menu : "갈릭 항정 수육",
            price : "21,300원"
        },
        {
            menu : "들기름 메밀국수",
            price : "8,800원"
        },
        {
            menu : "컵라면 볶음밥",
            price : "13,000원"
        },
        {
            menu : "쭈꾸미 떡볶이",
            price : "16,000원"
        },
        {
            menu : "트러플 감자전",
            price : "15,800원"
        },
        {
            menu : "바삭 새우 만두",
            price : "13,800원"
        },
        {
            menu : "호랑이 부대찌개",
            price : "12,800원"
        },
    ]
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                <Title className={"titleComment"}><button className="flex items-center"><i className="btnBack">more</i> 뒤로가기</button></Title>
                {/* restaurant info start--- */}
                <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                    <div className="w-full overflow-hidden border-r-[1px]">지도를 넣어봅시다.</div>
                    <div className="flex-auto p-[20px]">
                        <div className="w-[360px] h-[360px] bg-slate-300 rounded-md overflow-hidden">
                            <Swiper pagination={true} modules={[Pagination]} className="mySwiper swiperView">
                                {
                                    swiperImage.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}><div className="bgLayer" ></div><img src={`${process.env.PUBLIC_URL}/images/${item.image}.png`} /></SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                        <div className="flex flex-wrap">
                            <h4>호족반 도산공원점</h4>
                            <ul>
                                <li>{foodType[2].name}</li>
                                <li className="flex">평점
                                    <span className="flex">
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                    </span>
                                </li>
                            </ul>
                            <div className="flex textBox">
                                <div><IconWish className={"active"}>좋아요</IconWish> 123</div>
                                <div><i className="iconBasic iconView">view</i> 123</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start gap-[20px] py-[20px]">
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreLoc">local</i> 서울특별시 강남구 신사동 646-23
                    </div>
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreTel">tel</i> 010-1234-5676
                    </div>
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStoreTime">time</i> 11:30 ~ 21:30
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex mateBox checked"><i className="iconBasic iconCheck">check</i> {mateType[0].name}</div>
                    <div className="flex mateBox"><i className="iconBasic iconCheck">check</i> {mateType[1].name}</div>
                    <div className="flex mateBox"><i className="iconBasic iconCheck">check</i> {mateType[2].name}</div>
                </div>
                {/* --- restaurant info end */}
                {/* menu Price start ---  */}
                <div className="pt-[40px]">
                <Title className={"titleListStt"}>메뉴</Title>
                    {
                        menuAndPrice.map((item,i)=>{
                            return (
                                <ul className="flex justify-between h-full items-center py-2" key={i}>
                                    <li className="pr-4">{item.menu}</li>
                                    <li className="flex-auto h-full"><span className="flex w-full border-dashed border-gray-300 border-b-[1px]"></span></li>
                                    <li className="pl-4 font-bold">{item.price}</li>
                                </ul>
                            )
                        })
                    }
                    <ButtonWrap>
                        <Button className={"lineButton"} ><i className="iconBasic iconMore">more</i> 더보기</Button>
                    </ButtonWrap>
                </div>
                {/* --- menu Price end */}
                {/* review List start --- */}
                <div className="flex justify-between pt-[60px]">
                    <Title className={"titleListStt"}>리뷰</Title>
                    <Button className={"lineSmallButton"} ><i className="iconSmall iconWriter">writer</i> 나도 작성해 볼까</Button>
                </div>
                {/* list 반복 */}
                <div className="flex reviewListWrap gap-5">
                    <div className="flex-none imgWrap"><img src={`${process.env.PUBLIC_URL}/images/imageSample1.png`} /></div>
                    <div className="flex w-full  flex-col justify-between py-[10px]">
                        <ul className="textWrap">
                            <li className="name">우주여신 최보람</li>
                            <li className="content w-full ">정말 오래 기다려서 먹었습니다. 그런데 너무 맛있네요. 왜기다리는지 알겠어요. 정말 여기서만 먹을 수 있는 음식이란 생각이네요. 왜기다리는지 알겠어요. 정말 여기서만 먹을 수 있는 음식이란 생각이네요.</li>
                            <li className="flex">평점
                                <span className="flex">
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView>별</IconStarView>
                                    <IconStarView>별</IconStarView>
                                </span>
                            </li>
                        </ul>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <span className="hashBox">#보쌈</span>
                                <span className="hashBox">#족발</span>
                            </div>
                            <div><button className="iconTrash" alt="삭제"></button></div>
                        </div>
                    </div>
                </div>
                {/* list 반복 */}
                {/* list 반복 */}
                <div className="flex reviewListWrap gap-5">
                    <div className="flex-none imgWrap"></div>
                    <div className="w-full flex flex-col justify-between py-[10px]">
                        <ul className="textWrap">
                            <li className="name">우주여신 최보람</li>
                            <li className="content w-full">정말 오래 기다려서 먹었습니다. 그런데 너무 맛있네요.</li>
                            <li className="flex">평점
                                <span className="flex">
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView className={"active"}>별</IconStarView>
                                    <IconStarView>별</IconStarView>
                                    <IconStarView>별</IconStarView>
                                </span>
                            </li>
                        </ul>
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <span className="hashBox">#보쌈</span>
                                <span className="hashBox">#족발</span>
                            </div>
                            <div><button className="iconTrash" alt="삭제"></button></div>
                        </div>
                    </div>
                </div>
                {/* list 반복 */}
                {/* --- review List end */}
            </SectionWrap>
        </>
    );
}

export default RestaurantView;
