import React from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
function MateList(props) {
    const category = [
        {
            cateId: "lover",
            name: "연인과 가볼까?",
            image: "/images/mate_lover.png",
            link: "/mate/lover",
        },
        {
            cateId: "friend",
            name: "친구와 가볼까?",
            image: "/images/mate_friend.png",
            link: "/mate/friend",
        },
        {
            cateId: "family",
            name: "가족과 가볼까?",
            image: "/images/mate_family.png",
            link: "/mate/family",
        },
        {
            cateId: "group",
            name: "단체모임 가볼까?",
            image: "/images/mate_group.png",
            link: "/mate/group",
        },
        {
            cateId: "pet",
            name: "반려동물과 가볼까?",
            image: "/images/mate_pet.png",
            link: "/mate/pet",
        },
        {
            cateId: "self",
            name: "혼밥 해볼까?",
            image: "/images/mate_self.png",
            link: "/mate/self",
        },
    ];
    return (
        <>
            <SectionWrap>
                <Title memTitle={false} className={"titleStt"}>누구랑갈까</Title>
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-[30px]">
                    {category.map((item, index) => {
                        return (
                            <div className="mateMenu" key={index}>
                                <Link to={item.link}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="block"
                                    />
                                    <div className="menuTitle">
                                        {item.name}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </SectionWrap>
        </>
    );

}

export default MateList;
