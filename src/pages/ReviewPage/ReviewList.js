import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button } from "../../components/Form/Button";
import StarRating from "../../components/Form/StarRating";
import { useSelector } from "react-redux";
import DefualtModal from "../../components/Modal/DefualtModal";

function ReviewList(props) {
    const { cateId, rtId } = useParams();
    const [reviewAdd, setReviewAdd] = useState([]);
    const [loading, setLoading] = useState(false);
    const limit = 5;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const userName = useSelector((state) => state.user.userData.name);

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
            }

            setHasMore(res.data.hasMore);
            setLoading(false);
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

    const openModal = (rpId) => {
        setSelectedReviewId(rpId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReviewId(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedReviewId) return;

        try {
            await axiosInstance.delete(`/review-posts/${selectedReviewId}`);
            setReviewAdd((prevData) =>
                prevData.filter((review) => review._id !== selectedReviewId)
            );
            closeModal();
        } catch (error) {
            console.log(error);
        }
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

                        <div className="w-full flex gap-5">
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
                                                                src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${review.images[0]}`}
                                                                alt=""
                                                            />
                                                        )}
                                                </div>
                                                <div className="w-full flex justify-center items-center">
                                                    <div className="w-full flex flex-col justify-between py-[10px]">
                                                        <ul className="textWrap">
                                                            <li className="name">
                                                                {review.user && review.user.name ? (
                                                                    <Link
                                                                        to={`/mate/restaurants/${rtId}/review-post/${review._id}`}
                                                                    >
                                                                        {
                                                                            review.user.name
                                                                        }
                                                                    </Link>
                                                                ) : (
                                                                    "Unknown User"
                                                                )}
                                                            </li>
                                                            <li className="content w-full ">
                                                                {review.content}
                                                            </li>
                                                            <li className="flex mb-2">
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
                                                                    {review.tags.map(
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
                                                                                    tag.name
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        {review.user && review.user.name === userName && (
                                                            <div
                                                                className="iconTrash"
                                                                style={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    openModal(
                                                                        review._id
                                                                    )
                                                                }
                                                                alt="삭제"
                                                            ></div>
                                                        )}
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
            <DefualtModal show={isModalOpen} onClose={closeModal}>
                <div>정말 삭제하시겠습니까?</div>

                <Button onClick={handleDeleteConfirm}>확인</Button>

                <Button onClick={closeModal}>취소</Button>
            </DefualtModal>
        </>
    );
}

export default ReviewList;
