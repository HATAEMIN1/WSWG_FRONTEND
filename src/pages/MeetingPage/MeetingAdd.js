import React, { useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { Button, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function MeetingAdd(props) {
    const [meeting, setMeeting] = useState({
        title: "",
        content: "",
        chatLink: "",
    });
    const userData = useSelector((state) => state.user.userData);
    console.log(userData.id);
    const navigate = useNavigate();

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

            navigate("/meet-posts");
        } catch (error) {
            console.log(error.message);
        }
    }
    const [modal, setModal] = useState(true);
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
                <Title className={"titleComment"}>제목</Title>
                <InputWrap>
                    <input
                        type="text"
                        name="title"
                        placeholder="제목을 입력하세요"
                        class="text-center"
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
                <Title className={"titleComment"}>오픈 채팅 링크</Title>
                <InputWrap>
                    <input
                        type="text"
                        placeholder="오픈 채팅 링크 주소를 입력하세요"
                        class="text-center"
                        name="chatLink"
                        onChange={handleChange}
                        value={meeting.chatLink}
                    />
                </InputWrap>
                <div>
                    <h2 className="text-center text-red-600">
                        *타인을 비방하거나 불건전한 내용을 등록시 삭제 될 수
                        있습니다.
                    </h2>
                </div>
                <ButtonWrap>
                    <Button basicButton={true}>등록</Button>
                    <Link to="/meet-posts">취소</Link>
                </ButtonWrap>
            </form>
        </SectionWrap>
    );
}

export default MeetingAdd;
