import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Title from "../../components/Layout/Title";

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
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function restaurantInfo() {
            try {
                const res = await axiosInstance.get(`/restaurants/${cateId}`);
                console.log(res.data);
                setRestaurantData([...restaurantData, ...res.data.restaurant]);
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            } catch (e) {
                console.log(e);
            }
        }
        restaurantInfo();
    }, []);

    return (
        <SectionWrap>
            <Title>{selectedCategory.name}과 가볼까</Title>
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
                {restaurantData.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-7 mb-8">
                            <div>
                                <img
                                    className="w-[186.60px] h-40"
                                    src={item.image[0]}
                                    alt={item.name}
                                />
                            </div>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.category[0].foodtype}</p>
                                <p>평점: {item.rating}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrap>
    );
}

export default RestaurantList;
