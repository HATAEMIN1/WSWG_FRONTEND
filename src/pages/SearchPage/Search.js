import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StarRating from "../../components/Form/StarRating";
import { IconWish } from "../../components/Form/Icon";
import { SectionWrap } from "../../components/Layout/Section";
import styled from "styled-components";
import starBasic from "../../assets/images/iconStarList.png";
import starLine from "../../assets/images/iconStarLine.png";
import starActive from "../../assets/images/iconStarListActive.png";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";

//임시용 스타
const Star = styled.i`
    content: "";
    display: flex;
    width: 20px;
    height: 20px;
    background: url("${starBasic}");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 0;
    &.starline {
        background: url("${starLine}");
    }
    &.active {
        background: url("${starActive}");
    }
    ${({ active }) =>
        active &&
        `
        background: url("${starActive}");
    `}
`;

function Search(props) {
    //임시 카테고리
    const cateId = "lover";
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");
    const [results, setResults] = useState([]);
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });
    const [liked, setLiked] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    useEffect(() => {
        if (query) {
            fetchSearchResults(query);
        }
    }, [query]);
    const fetchSearchResults = async (searchTerm) => {
        try {
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params: { search: searchTerm },
            });
            setResults(res.data.restaurant);
            res.data.restaurant.forEach((item) => likes(item._id));
        } catch (error) {
            console.error(error);
        }
    };
    const likes = async (rtId) => {
        const params = { userId };
        try {
            const res = await axiosInstance.get(`/likes/${rtId}`, { params });
            if (
                res.data.like &&
                res.data.like.length > 0 &&
                res.data.like[0].hasOwnProperty("liked")
            ) {
                setLiked((prev) => ({
                    ...prev,
                    [rtId]: res.data.like[0].liked,
                }));
            }
            setLikeCount((prev) => ({ ...prev, [rtId]: res.data.likeCount }));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <SectionWrap>
                <div>[{query}] 검색 결과</div>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                    {results.map((item, index) => {
                        return (
                            <div
                                key={`restaurantData-${index}`}
                                className="flex gap-7 restaurantListWrap"
                            >
                                <div className="flex-none imgWrap">
                                    <Link
                                        to={`/mate/${cateId}/restaurants/${item._id}`}
                                    >
                                        <img
                                            src={item.image[0]}
                                            alt={item.name}
                                        />
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
                                            <IconWish
                                                className={
                                                    liked[item._id]
                                                        ? "active"
                                                        : ""
                                                }
                                                liked={liked[item._id]}
                                                disabled={true}
                                            >
                                                좋아요
                                            </IconWish>
                                            {likeCount[item._id] || 0}
                                        </div>
                                        <div className="flex items-center">
                                            <i className="iconBasic iconView">
                                                view
                                            </i>{" "}
                                            {item.views}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SectionWrap>
        </>
    );
}

export default Search;
