import React from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { IconStar, IconStarView, IconWish } from "../../components/Form/Icon";
import InputWrap from "../../components/Form/Input";

function RestaurantView(props) {
    return (
        <>
            <SectionWrap>
                <Title className={"titleComment"}><button className="flex items-center"><i className="btnBack">more</i> 뒤로가기</button></Title>
                {/* restaurant info start--- */}
                <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                    <div className="w-[560px] overflow-hidden border-r-[1px]">지도를 넣어봅시다.</div>
                    <div className="flex-auto p-[20px]">
                        <div className="w-full h-[360px] bg-slate-300 rounded-md overflow-hidden">스와이퍼</div>
                        <div className="flex flex-wrap">
                            <h4>호족반 도산공원점</h4>
                            <ul>
                                <li>한식</li>
                                <li className="flex">평점
                                    <span className="flex">
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView className={"active"}>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                </span></li>
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
                {/* --- restaurant info end */}
                <Title className={"titleBasic"}>메뉴</Title>
            </SectionWrap> 
        </>
    );
}

export default RestaurantView;
