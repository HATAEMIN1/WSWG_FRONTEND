import React from "react";
import SectionWarp from "../../components/Layout/Section";
import { useParams } from "react-router-dom";

function RestaurantList(props) {
    const category = [
        {
            cateId: "lover",
            name: "연인",
            image: "/images/mate_lover.png",
            link: "/mate/lover",
        },
        {
            cateId: "friend",
            name: "친구",
            image: "/images/mate_friend.png",
            link: "/mate/friend",
        },
        {
            cateId: "family",
            name: "가족",
            image: "/images/mate_family.png",
            link: "/mate/family",
        },
        {
            cateId: "group",
            name: "단체",
            image: "/images/mate_group.png",
            link: "/mate/group",
        },
        {
            cateId: "pet",
            name: "반려",
            image: "/images/mate_pet.png",
            link: "/mate/pet",
        },
        {
            cateId: "self",
            name: "혼밥",
            image: "/images/mate_self.png",
            link: "/mate/self",
        },
    ];
    const { cateId } = useParams();
    const selectedCategory = category.find((item) => item.cateId === cateId);
    return (
        <SectionWarp>
            <h1>{selectedCategory.name}과 가볼까</h1>
            <div>
                <select>
                    <option> 광역시도</option>
                </select>
                <select>시도군</select>
                <select>읍면동</select>
                <button>지역 변경</button>
            </div>
        </SectionWarp>
    );
}

export default RestaurantList;
