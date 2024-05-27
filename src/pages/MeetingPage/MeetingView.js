import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import DefualtModal from "../../components/Modal/DefualtModal";
import { Button } from "../../components/Form/Button";
import CommentWrite from "./MpComment/CommentWrite";
import MpCommentList from "./MpComment/MpCommentList";
import MeetingViewMap from "../../components/Map/MeetingViewMap";

function MeetingView(props) {
    const swiperImg = [
        { imgUrl: "imageSample1.png" },
        { imgUrl: "imageSample2.png" },
        { imgUrl: "imageSample3.png" },
        { imgUrl: "imageSample4.png" },
    ];
    const [meetingData, setMeetingData] = useState(null);
    const { mpId } = useParams();
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0); // 총 댓글 수 상태 추가
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const [views, setViews] = useState(0);
    const [metaDataList, setMetaDataList] = useState({});
    const userName = useSelector((state) => state.user.userData?.name);
    const userId = useSelector((state) => state.user.userData?.id);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMetaData = async (url, mpId) => {
        try {
            const response = await axiosInstance.post(`/meet-posts/meta`, {
                url,
                mpId,
            });
            return response.data;
        } catch (error) {
            console.error("Failed to fetch meta data", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAllMetaData = async () => {
            if (meetingData) {
                const metaData = await fetchMetaData(
                    meetingData.chatLink,
                    mpId
                );
                if (metaData) {
                    setMetaDataList((prevData) => ({
                        ...prevData,
                        [meetingData.chatLink]: metaData,
                    }));
                }
            }
        };

        fetchAllMetaData();
    }, [meetingData, mpId]);
    async function meetingView() {
        try {
            const res = await axiosInstance.get(`/meet-posts/${mpId}`);
            setMeetingData(res.data.meetUpPost);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    async function fetchRestaurant() {
        const params = {
            longitude: meetingData.longitude,
            latitude: meetingData.latitude,
        };
        try {
            const res = await axiosInstance.get(`/restaurants`, { params });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        meetingView();

        incrementViews();
    }, [mpId]);

    useEffect(() => {
        loadInitialComments();
    }, [mpId]);

    const incrementViews = async () => {
        try {
            const res = await axiosInstance.post(`/meet-posts/${mpId}/view`);
            setViews(res.data.meetUpPost.views);
        } catch (error) {
            console.log(error.message);
        }
    };

    const loadInitialComments = async () => {
        try {
            const res = await axiosInstance.get(
                `/meet-posts/${mpId}/comments?page=1&limit=10`
            );
            console.log("초기 댓글 로드 응답:", res.data);

            const sortedComments = res.data.comments.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            setComments(sortedComments);
            setTotalComments(res.data.totalComments); // 총 댓글 수 설정
            setPage(2);
            setHasMore(sortedComments.length < res.data.totalComments);
            console.log("초기 로드 - 댓글 개수:", sortedComments.length);
            console.log("초기 로드 - 총 댓글 개수:", res.data.totalComments);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreComments = async () => {
        if (!hasMore) return;
        try {
            const res = await axiosInstance.get(
                `/meet-posts/${mpId}/comments?page=${page}&limit=10`
            );
            console.log("추가 댓글 로드 응답:", res.data);

            const newComments = res.data.comments.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
            if (newComments.length > 0) {
                setComments((prevComments) => [
                    ...prevComments,
                    ...newComments,
                ]);
                setPage((prevPage) => prevPage + 1);
                setHasMore(
                    comments.length + newComments.length < totalComments
                ); // 수정된 부분
                console.log(
                    "추가 로드 - 댓글 개수:",
                    comments.length + newComments.length
                );
                console.log(
                    "추가 로드 - 총 댓글 개수:",
                    res.data.totalComments
                );
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function handleInsertComment(commentContent) {
        const commentData = {
            content: commentContent,
            userId: userId,
        };

        try {
            const res = await axiosInstance.post(
                `/meet-posts/${mpId}/comments`,
                commentData
            );
            const newComment = res.data.comment;
            const updatedComment = {
                ...newComment,
                user: {
                    _id: userId,
                    name: userName,
                },
            };
            setComments((prevComments) => [updatedComment, ...prevComments]);
            setTotalComments((prevTotal) => prevTotal + 1); // 댓글 추가 시 총 댓글 수 증가
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            await axiosInstance.delete(
                `/meet-posts/${mpId}/comments/${commentId}`
            );
            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            );
            setTotalComments((prevTotal) => prevTotal - 1); // 댓글 삭제 시 총 댓글 수 감소
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/meet-posts/${mpId}`);
            navigate("/meet-posts");
        } catch (error) {
            console.error("Failed to delete the meeting post", error);
        } finally {
            closeModal();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log("meetingData:", meetingData);
        console.log("userName:", userName);
    }, [meetingData, userName]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SectionWrap>
                <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <Link
                            to={`/meet-posts`}
                            className="flex justify-center items-center"
                        >
                            <i className="btnBack">more</i> 뒤로가기
                        </Link>
                    </button>
                </Title>
                {meetingData && (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold py-4 pb-2">
                                {meetingData.title}
                            </div>
                            <div className="flex gap-2">
                                <div className="flex">
                                    <i className="iconBasic iconView">view</i>{" "}
                                    {views}
                                </div>
                                <div className="flex">
                                    <i className="iconBasic iconComment">
                                        comment
                                    </i>{" "}
                                    {totalComments} {/* 총 댓글 수 표시 */}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-sm mb-6 text-gray-500">
                            <i className="iconBasic iconPen mr-2"></i> 작성자 :{" "}
                            {meetingData.user?.name}
                        </div>
                    </>
                )}
                <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                    <div className="w-full overflow-hidden border-r-[1px]">
                        <MeetingViewMap
                            meetingData={meetingData}
                        ></MeetingViewMap>
                    </div>
                    <div className="flex-auto p-[20px]">
                        <div className="w-[360px] h-[360px] bg-slate-300 rounded-md overflow-hidden">
                            <Swiper
                                pagination={true}
                                modules={[Pagination]}
                                className="mySwiper swiperView"
                            >
                                {swiperImg.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className="bgLayer"></div>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/images/${item.imgUrl}`}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <div className="flex flex-wrap">
                            <h4>어디겠습니까</h4>
                            <ul>
                                <li>푸드 타입</li>
                                <li className="flex">
                                    <span className="flex-none">평점: </span>
                                </li>
                            </ul>
                            <div className="flex textBox">
                                <i className="iconTypeStore iconStoreLoc">
                                    local
                                </i>{" "}
                                서울시 강남구 강남대로
                            </div>
                        </div>
                    </div>
                </div>
                {meetingData && metaDataList[meetingData.chatLink] && (
                    <>
                        <div className="my-[40px]">{meetingData.content}</div>
                        <SectionWrap
                            basicSection={true}
                            className={"mb-[40px]"}
                        >
                            <a
                                href={metaDataList[meetingData.chatLink].url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="container flex border rounded-md">
                                    <div className="w-1/3">
                                        <img
                                            src={
                                                metaDataList[
                                                    meetingData.chatLink
                                                ].image
                                            }
                                            alt="Meta"
                                        />
                                    </div>
                                    <div className="w-full flex-wrap justify-between flex-auto p-[10px]">
                                        <p className="font-semibold">
                                            {
                                                metaDataList[
                                                    meetingData.chatLink
                                                ].title
                                            }
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {
                                                metaDataList[
                                                    meetingData.chatLink
                                                ].description
                                            }
                                        </p>
                                        <p className="text-sm">
                                            {
                                                metaDataList[
                                                    meetingData.chatLink
                                                ].url
                                            }
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </SectionWrap>
                    </>
                )}
                {meetingData && meetingData.user?.name === userName && (
                    <div className="flex gap-2 w-[300px] m-auto">
                        <Button onClick={openModal} basicButton={false}>
                            삭제
                        </Button>
                    </div>
                )}
                <div className="mb-2">
                    <Title className={"titleComment"}>댓글</Title>
                    <CommentWrite onSubmit={handleInsertComment} />
                    {comments.length === 0 ? (
                        <div className="w-full bg-slate-100  py-[10px] text-center mt-4">
                            등록 된 댓글이 없습니다🥲
                        </div>
                    ) : (
                        <MpCommentList
                            comments={comments}
                            fetchMoreComments={fetchMoreComments}
                            deleteComment={deleteComment}
                            currentUserId={userId}
                            hasMore={hasMore}
                        />
                    )}
                </div>
            </SectionWrap>
            <DefualtModal show={isModalOpen} onClose={closeModal}>
                <div className="pb-3">정말 삭제하시겠습니까?</div>
                <Button basicButton={true} onClick={handleDelete}>
                    확인
                </Button>
            </DefualtModal>
        </>
    );
}

export default MeetingView;
