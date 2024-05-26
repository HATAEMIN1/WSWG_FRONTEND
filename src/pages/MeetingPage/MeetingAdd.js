import React, { useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { Button, ButtonCencel, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultModal from "../../components/Modal/DefualtModal";
import MeetingMap from "../../components/Map/MeetingMap";

function MeetingAdd(props) {
    const mateType = [
        { no: 1, cateId: "lover", name: "연인" },
        { no: 2, cateId: "friend", name: "친구" },
        { no: 3, cateId: "family", name: "가족" },
        { no: 4, cateId: "group", name: "단체모임" },
        { no: 5, cateId: "pet", name: "반려동물" },
        { no: 6, cateId: "self", name: "혼자" },
    ];
    const foodType = ["한식", "양식", "중식", "일식", "디저트"];
    const [geoData, setGeoData] = useState([]);
    const [geoCenter, setGeoCenter] = useState([
        37.48073710748562, 126.87963572538791,
    ]);
    const foodtype = useSelector((state) => state.filter.foodType);
    const cateId = useSelector((state) => {
        const mateTypeName = state.filter.mateType;
        const selectedMateType = mateType.find(
            (type) => type.name === mateTypeName
        );
        return selectedMateType ? selectedMateType.cateId : "";
    });
    const [geoMouse, setGeoMouse] = useState(3);
    const fetchRestaurant = async (cateId, foodtype) => {
        try {
            const params = { foodtype };
            const res = await axiosInstance.get(`/restaurants/${cateId}`, {
                params,
            });
            setGeoData(res.data.restaurant);
        } catch (e) {
            console.log(e.message);
        }
    };
    const [meeting, setMeeting] = useState({
        title: "",
        content: "",
        chatLink: "",
    });
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setMeeting((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            ...meeting,
            userId: userData.id,
        };
        try {
            await axiosInstance.post("/meet-posts", body);
            setIsModalOpen(true); // 모달 열기
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleConfirm() {
        setIsModalOpen(false); // 모달 닫기
        navigate("/meet-posts");
    }

    function handleClose() {
        setIsModalOpen(false); // 모달 닫기
    }

    return (
        <SectionWrap>
            <Title className={"titleComment"}>
                <Link to="/meet-posts">
                    <button className="flex items-center">
                        <i className="btnBack">more</i> BACK
                    </button>
                </Link>
            </Title>

            <form onSubmit={handleSubmit}>
                <MeetingMap
                    {...props}
                    geoData={geoData}
                    geoCenter={geoCenter}
                    geoMouse={geoMouse}
                    setGeoCenter={setGeoCenter}
                    setGeoMouse={setGeoMouse}
                    fetchRestaurant={fetchRestaurant}
                    setGeoData={setGeoData}
                    cateId={cateId}
                ></MeetingMap>
                <Title className={"titleComment"}>제목</Title>
                <InputWrap>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        className="text-center"
                        onChange={handleChange}
                        value={meeting.title}
                    />
                </InputWrap>
                <div className="mb-10">
                    <Title className={"titleComment"}>내용</Title>
                    <InputWrap>
                        <textarea
                            placeholder="내용을 입력하세요 (내용 300자 내외)"
                            name="content"
                            onChange={handleChange}
                            value={meeting.content}
                        ></textarea>
                    </InputWrap>
                </div>
                <div>
                    <Title className={"titleComment"}>오픈 채팅 링크</Title>
                    <InputWrap>
                        <input
                            type="text"
                            name="chatLink"
                            placeholder="오픈채팅방 주소를 입력하세요"
                            className="text-center"
                            onChange={handleChange}
                            value={meeting.chatLink}
                        />
                    </InputWrap>
                </div>
                <div>
                    <h2 className="text-center text-red-600">
                        *타인을 비방하거나 불건전한 내용을 등록시 삭제 될 수
                        있습니다.
                    </h2>
                </div>
                <ButtonWrap>
                    <Button basicButton={true}>등록</Button>
                    <ButtonCencel>
                        <Link to="/meet-posts">취소</Link>
                    </ButtonCencel>
                </ButtonWrap>
            </form>

            <DefaultModal show={isModalOpen} onClose={handleClose}>
                <div className="pb-3">게시물 등록이 완료되었습니다</div>
                <Button basicButton={true} onClick={handleConfirm}>
                    확인
                </Button>
            </DefaultModal>
        </SectionWrap>
    );
}

export default MeetingAdd;
