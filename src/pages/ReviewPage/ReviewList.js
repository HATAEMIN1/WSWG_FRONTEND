import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";
import jQuery from "jquery";
import StarRating from "../../components/Form/StarRating";
import DefualtModal from "../../components/Modal/DefualtModal";

function ReviewList(props) {
    const { cateId, rtId } = useParams();
    const [reviewAdd, setReviewAdd] = useState([]);
    const [loading, setLoading] = useState(false);
    const limit = 5;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const fetchReviewAdd = async ({ limit, skip, loadMore = false }) => {
        const params = {
            skip,
            limit,
        };
        try {
            const res = await axiosInstance.get(`/review-posts/${rtId}`, {
                params,
            });
            console.log(res.data);
            if (loadMore) {
                setReviewAdd((prevData) => [...prevData, ...res.data.review]);
            } else {
                setReviewAdd(res.data.review);
                //res.data.review배열을 역순으로 만들어서 setReviewAdd함수를 통해 해당 배열을 업데이트
            }

            //prevData : 이전에 이미 화면에 표시된 데이터를 담고 있는 배열
            //...prevData : 배열을 펼쳐서 현재 배열에 추가
            // reverse( ) : 배열의 순서를 뒤집는 역할
            //             [1.2.3.4.5]의 배열을[5.4.3.2.1]로 뒤집는다

            setHasMore(res.data.hasMore);
            setLoading(false); //리스트를계속더보기할수있게해줌
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviewAdd({ limit, skip });
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (!loading && hasMore) {
                setLoading(true);
                fetchReviewAdd({
                    limit,
                    skip: reviewAdd.length,
                    loadMore: true,
                });
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    const handleDelete = async (rpId) => {
        console.log(reviewAdd);
        try {
            await axiosInstance.delete(`/review-posts/${rpId}`);

            fetchReviewAdd({ limit, skip });
        } catch (error) {
            console.log(error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <SectionWrap>
                <form>
                    <div className="reviewWrap">
                        <div className="w-full flex justify-between items-center">
                            <Title className={"titleComment"}>리뷰</Title>
                            <Link
                                to={`/mate/${cateId}/restaurants/${rtId}/review-post/new`}
                            >
                                <Button className={"lineSmallButton"}>
                                    <i className="iconSmall iconWriter">
                                        writer
                                    </i>{" "}
                                    나도 작성해 볼까
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full flex reviewListWrap gap-5">
                            {reviewAdd && reviewAdd.length > 0 ? (
                                <div className="w-full">
                                    {reviewAdd.map((review, index) => {
                                        return (
                                            <div
                                                className="flex reviewListWrap gap-5"
                                                key={index}
                                            >
                                                <div className="flex-none imgWrap">
                                                    {review.images &&
                                                        review.images.length >
                                                            0 && (
                                                            <img
                                                                src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${review.images[0]}`}
                                                                alt=""
                                                            />
                                                        )}
                                                </div>
                                                <div className="w-full flex justify-center items-center">
                                                    <div className="w-full flex flex-col justify-between py-[10px]">
                                                        <ul className="textWrap">
                                                            <li className="name">
                                                                <Link
                                                                    to={`/mate/restaurants/${rtId}/review-post/${review._id}`}
                                                                >
                                                                    {
                                                                        review
                                                                            .user
                                                                            .name
                                                                    }
                                                                </Link>
                                                            </li>
                                                            <li className="content w-full ">
                                                                {review.content}
                                                            </li>
                                                            <li className="flex mb-2">
                                                                {/* 평점:{review.rating} */}
                                                                <span className="flex-none">
                                                                    평점:{" "}
                                                                </span>
                                                                <StarRating
                                                                    rating={
                                                                        review.rating
                                                                    }
                                                                ></StarRating>
                                                            </li>
                                                            <li>
                                                                <div className="hashBoxWrap">
                                                                    {review.hashTag.map(
                                                                        (
                                                                            tag,
                                                                            i
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="hashBox"
                                                                            >
                                                                                #
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="iconTrash"
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                                handleDelete(
                                                                    review._id
                                                                )
                                                            }
                                                            alt="삭제"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="w-full text-center py-10">
                                    등록된 게시글이 없습니다
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </SectionWrap>
        </>
    );
}

export default ReviewList;
