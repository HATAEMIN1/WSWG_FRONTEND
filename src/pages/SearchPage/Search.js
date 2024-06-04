import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StarRating from "../../components/Form/StarRating";
import { IconWish } from "../../components/Form/Icon";
import { SectionWrap } from "../../components/Layout/Section";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import { Button, ButtonWrap } from "../../components/Form/Button";

function Search(props) {
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];
    const cateId = useSelector((state) => {
        const mateTypeName = state.filter.mateType;
        const selectedMateType = mateType.find(
            (type) => type.name === mateTypeName
        );
        return selectedMateType ? selectedMateType.cateId : "";
    });
    const foodtype = useSelector((state) => state.filter.foodType);
    // const location = useLocation();
    // const query = new URLSearchParams(location.search).get("q");
    const [results, setResults] = useState([]);
    const userId = useSelector((state) => {
        return state.user.userData.id;
    });
    const [liked, setLiked] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const limit = 6;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    // const tag = new URLSearchParams(location.search).get("tag");
    const [tagResults, setTagResults] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");
    const tag = searchParams.get("tag");
    console.log(location);
    console.log(location.search);
    console.log(searchParams);
    const fetchSearchResults = async ({
        search,
        limit,
        skip,
        loadMore = false,
        foodtype,
    }) => {
        try {
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params: {
                    search: search,
                    limit: limit,
                    skip: skip,
                    foodtype: foodtype,
                },
            });
            console.log(res.data.restaurant);
            if (loadMore) {
                setResults([...results, ...res.data.restaurant]);
            } else {
                setResults(res.data.restaurant);
            }

            setHasMore(res.data.hasMore);
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
    function handleLoadMore() {
        const body = {
            search: search,
            limit: limit,
            skip: skip + limit,
            loadMore: true,
        };
        fetchSearchResults(body);
        setSkip(Number(skip) + Number(limit));
    }
    const fetchTags = async () => {
        console.log(tag);
        try {
            const params = { tag };
            const res = await axiosInstance.get(`/review-posts/search`, {
                params,
            });
            setTagResults(res.data.reviews);
            console.log(res.data.reviews);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    useEffect(() => {
        if (query) {
            setSkip(0);
            fetchSearchResults({ search: query, limit, skip, foodtype });
            setSearch(query);
        }
    }, [query, foodtype, cateId]);
    // useEffect(() => {
    //
    //     if (tag) {
    //         fetchTags();
    //     }
    // }, [tag]);
    useEffect(() => {
        if (query || tag) {
            setLoading(true);
            setSkip(0);
            if (query) {
                fetchSearchResults({ search: query, limit, skip, foodtype });
            }
            if (tag) {
                fetchTags();
            }
        }
    }, [query, tag, foodtype, cateId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <>
            <SectionWrap className={"min-h-[650px]"}>
                <div className="py-10">
                    <span className="font-bold">[{query}]</span> 검색 결과
                </div>
                {results.length > 0 ? (
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
                                            <p>{item.category[0].foodType}</p>
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
                        <ButtonWrap>
                            {hasMore && (
                                <Button
                                    className={"lineButton"}
                                    onClick={handleLoadMore}
                                >
                                    <i className="iconBasic iconMore">more</i>{" "}
                                    더보기
                                </Button>
                            )}
                        </ButtonWrap>
                    </div>
                ) : (
                    <div className="w-full bg-slate-100  py-[200px] text-center">
                        해당 단어의 검색결과가 없습니다.
                    </div>
                )}
                <div className="">[{tag}] 검색 결과</div>
                {tagResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
                        {tagResults.map((review, index) => (
                            <div
                                key={`reviewData-${index}`}
                                className="flex gap-7 reviewListWrap"
                            >
                                <div className="flex-none imgWrap">
                                    <Link
                                        to={`/mate/restaurants/${review.restaurant}/review-post/${review._id}`}
                                    >
                                        {review.images &&
                                            review.images.length > 0 && (
                                                <img
                                                    src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${review.images[0]}`}
                                                    alt={`Review ${index}`}
                                                />
                                            )}
                                    </Link>
                                </div>
                                <div className="flex flex-wrap items-center textWrap py-2">
                                    <div className="w-full">
                                        <Link
                                            to={`/mate/restaurants/${review.restaurant}/review-post/${review._id}`}
                                        >
                                            <h3>
                                                {review.user?.name ||
                                                    "Unknown User"}
                                            </h3>
                                        </Link>
                                        <p>{review.content}</p>
                                        <div className="flex">
                                            <span className="flex-none">
                                                평점:{" "}
                                            </span>
                                            <StarRating
                                                rating={review.rating}
                                            ></StarRating>
                                        </div>
                                        <div className="hashBoxWrap">
                                            {review.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="hashBox"
                                                >
                                                    #{tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>해당 단어의 검색 결과가 없습니다.</div>
                )}
            </SectionWrap>
        </>
    );
}

export default Search;
