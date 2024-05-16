import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import Title from "../../components/Layout/Title";
import StarRating from "../../components/Form/StarRating";
import { IconWish } from "../../components/Form/Icon";
import SelectDiv from "../../components/Form/Select";

function RestaurantList(props) {
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
    const { cateId } = useParams();
    const selectedCategory = category.find((item) => item.cateId === cateId);
    const [restaurantData, setRestaurantData] = useState([]);
    const [loading, setLoading] = useState(false);
    const limit = 6;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        restaurantInfo({ skip, limit });
    }, []);
    async function restaurantInfo({ skip, limit, loadmore = false }) {
        try {
            const params = { skip, limit };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            setRestaurantData((prevData) =>
                loadmore
                    ? [...prevData, ...res.data.restaurant]
                    : prevData.concat(res.data.restaurant)
            );
            setHasMore(res.data.hasMore);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (!loading && hasMore) {
                setLoading(true);
                restaurantInfo({ skip: restaurantData.length, limit });
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    return (
        <SectionWrap>
            <Title className={"titleStt"}>{selectedCategory.name}</Title>
            <div className="flex gap-2 mb-5">
                <SelectDiv></SelectDiv>
                <button className="border rounded-md">지역 변경</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                {restaurantData.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex gap-7 restaurantListWrap"
                        >
                            <div className="flex-none imgWrap">
                                <Link
                                    to={`/mate/${cateId}/restaurants/${item._id}`}
                                >
                                    <img src={item.image[0]} alt={item.name} />
                                </Link>
                            </div>
                            <div className="flex flex-wrap items-center textWrap py-2">
                                <div className="w-full">
                                    <Link
                                        to={`/mate/${cateId}/restaurants/${item._id}`}
                                    >
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p>{item.category[0].foodtype}</p>
                                    <div className="flex">
                                        <span className="flex-none">
                                            평점:{" "}
                                        </span>
                                        <StarRating
                                            rating={item.rating}
                                        ></StarRating>
                                    </div>
                                </div>
                                <div className="flex gap-2 h-[20px]">
                                    <div className="flex items-center">
                                        <IconWish className={"active"}>
                                            좋아요
                                        </IconWish>{" "}
                                        123
                                    </div>
                                    <div className="flex items-center">
                                        <i className="iconBasic iconView">
                                            view
                                        </i>{" "}
                                        123
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionWrap>
    );
}

export default RestaurantList;
