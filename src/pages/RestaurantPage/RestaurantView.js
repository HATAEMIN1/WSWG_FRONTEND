import React from "react";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";

function RestaurantView(props) {
    const foodType = [
        {no:1,name:"chinese"},
        {no:2,name:"japanese"},
        {no:3,name:"korean"},
        {no:4,name:"western"},
        {no:5,name:"dessert"},
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
                                <li>{foodType[1].name}</li>
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
                {/* --- review List end */}
            </SectionWrap>
        </>
    );
}

export default RestaurantView;
