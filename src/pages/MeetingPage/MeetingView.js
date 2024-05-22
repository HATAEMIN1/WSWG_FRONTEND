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
    const navigate = useNavigate();
    const [metaDataList, setMetaDataList] = useState({});
    const userName = useSelector((state) => state.user.userData.name);
    const userId = useSelector((state) => state.user.userData.id);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function meetingView() {
            try {
                const res = await axiosInstance.get(`/meet-posts/${mpId}`);
                setMeetingData(res.data.meetUpPost);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        meetingView();
    }, [mpId]);

    useEffect(() => {
        async function loadComments() {
            try {
                const res = await axiosInstance.get(`/meet-posts/${mpId}/comments`);
                setComments(res.data.comment);
            } catch (error) {
                console.log(error);
            }
        }
        loadComments();
    }, [mpId]);

    async function handleInsertComment(commentContent) {
        const commentData = {
            content: commentContent,
            userId: userId
        };

        try {
            const res = await axiosInstance.post(`/meet-posts/${mpId}/comments`, commentData);
            const newComment = res.data.comment;
            // user 객체를 포함하는 새로운 댓글을 추가
            const updatedComment = {
                ...newComment,
                user: {
                    _id: userId,
                    name: userName
                }
            };
            setComments((prevComments) => [...prevComments, updatedComment]);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            await axiosInstance.delete(`/meet-posts/${mpId}/comments/${commentId}`);
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/meet-posts/${mpId}`);
            navigate('/meet-posts');
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SectionWrap>
                <Title className={"titleComment"}>
                    <button className="flex items-center">
                        <Link to={`/meet-posts`} className="flex justify-center items-center">
                            <i className="btnBack">more</i> 뒤로가기
                        </Link>
                    </button>
                </Title>
                {meetingData && (
                    <>
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold py-4 pb-2">{meetingData.title}</div>
                            <div className="flex gap-2">
                                <div className="flex">
                                    <i className="iconBasic iconView">view</i>1234
                                </div>
                                <div className="flex">
                                    <i className="iconBasic iconComment">view</i>1234
                                </div>
                            </div>
                        </div>
                        <div className="flex text-sm mb-6 text-gray-500"><i className="iconBasic iconPen mr-2"></i> 작성자 : {meetingData.user.name}</div>
                    </>
                )}
                <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                    <div className="w-full overflow-hidden border-r-[1px]">
                        지도를 넣어봅시다.
                    </div>
                    <div className="flex-auto p-[20px]">
                        <div className="w-[360px] h-[360px] bg-slate-300 rounded-md overflow-hidden">
                            <Swiper pagination={true} modules={[Pagination]} className="mySwiper swiperView">
                                {swiperImg.map((item, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className="bgLayer"></div>
                                            <img src={`${process.env.PUBLIC_URL}/images/${item.imgUrl}`} />
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
                                <i className="iconTypeStore iconStoreLoc">local</i> 서울시 강남구 강남대로
                            </div>
                        </div>
                    </div>
                </div>
                {meetingData && metaDataList[meetingData.chatLink] && (
                    <>
                        <div className="my-[40px]">{meetingData.content}</div>
                        <SectionWrap basicSection={true} className={"mb-[40px]"}>
                            <a href={metaDataList[meetingData.chatLink].url} target="_blank" rel="noopener noreferrer">
                                <div className="container flex border rounded-md">
                                    <div className="w-1/3">
                                        <img src={metaDataList[meetingData.chatLink].image} alt="Meta" />
                                    </div>
                                    <div className="w-full flex-wrap justify-between flex-auto p-[10px]">
                                        <p className="font-semibold">{metaDataList[meetingData.chatLink].title}</p>
                                        <p className="text-sm text-gray-500">{metaDataList[meetingData.chatLink].description}</p>
                                        <p className="text-sm">{metaDataList[meetingData.chatLink].url}</p>
                                    </div>
                                </div>
                            </a>
                        </SectionWrap>
                        {meetingData.user.name === userName && (
                            <div className="flex gap-2 w-[300px] m-auto">
                                <Button onClick={openModal} basicButton={false}>삭제</Button>
                            </div>
                        )}
                    </>
                )}
                <div className="mb-2">
                    <Title className={"titleComment"}>댓글</Title>
                    <CommentWrite onSubmit={handleInsertComment} />
                    {comments.length === 0 ? (
                        <p>댓글이 없습니다🥲</p>
                    ) : (
                        comments.map((item) => (
                            <div key={item._id}>
                                <MpCommentList comment={item} deleteComment={deleteComment} />
                            </div>
                        ))
                    )}
                </div>
            </SectionWrap>
            <DefualtModal show={isModalOpen} onClose={closeModal}>
                <div className="pb-3">정말 삭제하시겠습니까?</div>
                <Button basicButton={true} onClick={handleDelete}>확인</Button>
            </DefualtModal>
        </>
    );
}

export default MeetingView;
