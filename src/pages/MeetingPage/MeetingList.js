import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { ButtonWrap, Button } from "../../components/Form/Button";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import MeetingAdd from "./MeetingAdd";

function MeetingList(props) {
    const [meetingAdd, setMeetingAdd] = useState([]);

    const fetchMeetingAdd = async () => {
        try {
            const res = await axiosInstance.get("/meet-posts");
            console.log(res.data.meetUpPost);

            setMeetingAdd(res.data.meetUpPost);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchMeetingAdd();
    }, []);

    return (
        <>
            {meetingAdd && meetingAdd.length > 0 && (
                <div>
                    {meetingAdd.map((meeting, index) => {
                        return (
                            <>
                                <div key={index}>title: {meeting.title}</div>
                                <div key={index}>
                                    content: {meeting.content}
                                </div>
                                <div key={index}>
                                    chatLink: {meeting.chatLink}
                                </div>
                            </>
                        );
                    })}
                </div>
            )}
            <SectionWrap>
                <Title memTitle={false} className="mt-[80px]">
                    우리만날까?
                </Title>
                <ButtonWrap>
                    <Link to="/meet-posts/new">
                        <Button className={"lineSmallButton"}>
                            <i className="iconSmall iconWriter">writer</i> 나도
                            작성하기
                        </Button>
                    </Link>
                </ButtonWrap>
            </SectionWrap>
        </>
    );
}

export default MeetingList;
