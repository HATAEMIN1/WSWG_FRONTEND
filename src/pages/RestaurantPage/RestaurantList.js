import React, { useEffect } from "react";
import { SectionWarp } from "../../components/Layout/Section";
import { useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import axiosInstance from "../../utils/axios";

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

    useEffect(() => {
        async function restaurantInfo() {
            try {
                const res = await axiosInstance.get("/:cateId", {
                    params: cateId,
                });
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        }
        restaurantInfo();
    }, []);
    return (
        <SectionWarp>
            <Title memTitle={false}>{selectedCategory.name}과 가볼까</Title>
            <div>
                <select>
                    <option selected disabled>
                        광역시도
                    </option>
                    <option>서울특별시</option>
                </select>
                <select>
                    <option selected disabled>
                        시군구
                    </option>
                </select>
                <select>
                    <option selected disabled>
                        읍면동
                    </option>
                </select>
                <button className="border rounded-md">지역 변경</button>
            </div>
            <div className="grid grid-cols-2 w-full border">
                <div className="flex gap-7">
                    <div>
                        <img
                            className="w-[186.60px] h-40"
                            src="/images/mate_family.png"
                            alt=""
                        />
                    </div>
                    <div>
                        <h3>호족반 도산공원점</h3>
                        <p>한식</p>
                        <p>평점</p>
                    </div>
                </div>
            </div>
        </SectionWarp>
    );
}

export default RestaurantList;
