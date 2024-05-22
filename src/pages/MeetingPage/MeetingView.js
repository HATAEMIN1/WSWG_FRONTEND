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
import { Button, ButtonWrap } from "../../components/Form/Button";

function MeetingView(props) {
    const swiperImg = [
        {imgUrl : "imageSample1.png"},
        {imgUrl : "imageSample2.png"},
        {imgUrl : "imageSample3.png"},
        {imgUrl : "imageSample4.png"},
    ]
    const [meetingData, setMeetingData] = useState(null); // 단일 객체로 변경
    const { mpId } = useParams();
    const navigate = useNavigate();
    const [metaDataList, setMetaDataList] = useState({});
    const userName = useSelector((state) => state.user.userData.name);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchMetaData = async (url, mpId) => {
        try {
            const response = await axiosInstance.post(`/meet-posts/${mpId}`, { url });
            return response.data;
        } catch (error) {
            return null;
        }
    };

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
        const fetchAllMetaData = async () => {
            if (meetingData) {
                const metaData = await fetchMetaData(meetingData.chatLink, {mpId});
                if (metaData) {
                    setMetaDataList((prevData) => ({
                        ...prevData,
                        [meetingData.chatLink]: metaData
                    }));
                }
            }
        };

        fetchAllMetaData();
    }, [meetingData, mpId]);

    //
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    {/* title userinfo start --- */}
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
                    {/* --- title userinfo end */}
                    {/* restaurant info start--- */}
                    <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                        <div className="w-full overflow-hidden border-r-[1px]">
                            지도를 넣어봅시다.
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
                                             <SwiperSlide
                                                key={i}
                                            >
                                                <div className="bgLayer"></div>
                                                <img src={`${process.env.PUBLIC_URL}/images/${item.imgUrl}`} />
                                            </SwiperSlide>
                                        )
                                    }
                                    )}
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
                                <i className="iconTypeStore iconStoreLoc">local</i> 서울시 강남구 강남대로</div>
                            </div>
                        </div>
                    </div>
                    {/* --- restaurant info end */}
                    {/* mata data start--- */}
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
                            <Button onClick={openModal} basicButton={false} >삭제</Button>
                        </div>
                         )}
                    </>
                )}
                {/* --- mata data end */}
                <Title className={"titleComment"}>댓글</Title>
            </SectionWrap>
            <DefualtModal show={isModalOpen} onClose={closeModal}>
                <div className="pb-3">정말 삭제하시겠습니까?</div>
                <Button basicButton={true} onClick={handleDelete}>확인</Button>
            </DefualtModal>
        </>
    )
}

export default MeetingView;

