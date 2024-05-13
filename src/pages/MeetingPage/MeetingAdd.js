import React, { useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { Button, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function MeetingAdd(props) {
    const [meeting, setMeeting] = useState({
        title: "",
        content: "",
        chatlink: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(value, name);
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
        };
        try {
            await axiosInstance.post("/meet-posts", body);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SectionWrap>
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
                        name="chatlink"
                        onChange={handleChange}
                        value={meeting.chatlink}
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
                    <Button basicButton={false}>취소</Button>
                </ButtonWrap>
            </form>
        </SectionWrap>
    );
}

export default MeetingAdd;
