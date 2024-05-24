import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Form/Button";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { TextModal } from "../../components/Modal/Modal";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import SelectDiv from "../../components/Form/Select";
import DefaultModal from "../../components/Modal/DefualtModal";

const fetchMetaData = async (url) => {
    try {
        const response = await axiosInstance.post("/meet-posts/:mata", { url });
        return response.data;
    } catch (error) {
        return null;
    }
};

function MeetingList(props) {
    const [meetingAdd, setMeetingAdd] = useState([]);
    const [metaDataList, setMetaDataList] = useState({});
    const [loading, setLoading] = useState(false);
    const userName = useSelector((state) => state.user.userData?.name);
    const limit = 5;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const fetchMeetingAdd = async ({ limit, skip, loadMore = false }) => {
        const params = { skip, limit };
        try {
            const res = await axiosInstance.get("/meet-posts", { params });
            if (loadMore) {
                setMeetingAdd((prevData) => [
                    ...prevData,
                    ...res.data.meetUpPost
                ]);
            } else {
                setMeetingAdd(res.data.meetUpPost);
            }
            setHasMore(res.data.hasMore);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMeetingAdd({ limit, skip });
    }, []);

    useEffect(() => {
        const fetchAllMetaData = async () => {
            const newMetaDataList = {};
            await Promise.all(meetingAdd.map(async (meeting) => {
                const metaData = await fetchMetaData(meeting.chatLink);
                if (metaData) {
                    newMetaDataList[meeting.chatLink] = metaData;
                }
            }));
            setMetaDataList(newMetaDataList);
        };

        if (meetingAdd.length > 0) {
            fetchAllMetaData();
        }
    }, [meetingAdd]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            if (!loading && hasMore) {
                setLoading(true);
                fetchMeetingAdd({
                    limit,
                    skip: meetingAdd.length,
                    loadMore: true,
                });
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const openModal = (mpId) => {
        setSelectedMeetingId(mpId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeetingId(null);
    };

    const handleDeleteList = async () => {
        if (!selectedMeetingId) return;

        try {
            await axiosInstance.delete(`/meet-posts/${selectedMeetingId}`);
            setMeetingAdd((prevData) => prevData.filter(meeting => meeting._id !== selectedMeetingId));
            closeModal();
        } catch (error) {
            console.error("Failed to delete the meeting post", error);
        }
    };

    return (
        <>          
            <SectionWrap>
                <Title memTitle={false} className="mt-[80px]">
                    우리만날까?
                </Title>
                <div className="flex justify-between gap-2 mb-5">
                    <div className="flex gap-2">
                        <SelectDiv></SelectDiv>
                    </div>
                    <div className="flex items-center">
                        <Button className={"lineSmallButton"}>
                            <Link to="/meet-posts/new">
                                <i className="iconSmall iconWriter">writer</i>{" "}
                                나도 작성하기
                            </Link>
                        </Button>
                    </div>
                </div>
                {meetingAdd && meetingAdd.length === 0 ? (
                    <div className="w-full bg-slate-100  py-[200px] text-center">
                        등록된 게시글이 없습니다.
                    </div>
                ) : (
                    <div>
                        {meetingAdd.map((meeting, meetindex) => {
                            return (
                                <div key={meetindex} className="mb-[40px]" >
                                    <div className="flex justify-between items-center mb-1">
                                        <Link to={`/meet-posts/${meeting._id}`}><div className="text-xl font-semibold hover:underline">{meeting.title}</div></Link>
                                        <div className="flex gap-3 items-center">
                                            <div className="flex">
                                                <i className="iconBasic iconView">view</i>{" "}
                                                {meeting.views}
                                            </div>
                                            <div className="flex">
                                                <i className="iconBasic iconComment">comment</i>
                                                {meeting.commentCount || 0}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex text-sm items-center"><i className="iconBasic iconPen mr-2"></i> 작성자 : {meeting.user?.name}</div>
                                        {meeting.user?.name === userName && (
                                            <div className="flex gap-2">
                                                <button className="iconTrash" onClick={() => openModal(meeting._id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                    {metaDataList[meeting.chatLink] && (
                                        <SectionWrap basicSection={true}>
                                            <div className="container flex border rounded-md">
                                                <div className="w-1/3">
                                                    <a href={metaDataList[meeting.chatLink].url} target="_blank" rel="noopener noreferrer">
                                                        <img src={metaDataList[meeting.chatLink].image} alt="Meta" />
                                                    </a>
                                                </div>
                                                <div className="w-full flex-wrap grid justify-between flex-auto p-[10px]">
                                                    <p className="font-semibold"><a href={metaDataList[meeting.chatLink].url} target="_blank" rel="noopener noreferrer">{metaDataList[meeting.chatLink].title}</a></p>
                                                    <p className="text-sm text-gray-500">{metaDataList[meeting.chatLink].description}</p>
                                                    <p className="text-sm">{metaDataList[meeting.chatLink].url}</p>
                                                </div>
                                            </div>
                                        </SectionWrap>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </SectionWrap>
            <DefaultModal show={isModalOpen} onClose={closeModal}>
                <div className="pb-3">정말 삭제하시겠습니까?</div>
                <Button basicButton={true} onClick={handleDeleteList}>확인</Button>
            </DefaultModal>
        </>
    );
}

export default MeetingList;
