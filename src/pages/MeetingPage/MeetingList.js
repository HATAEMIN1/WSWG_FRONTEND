import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import { ButtonWrap, Button } from "../../components/Form/Button";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import MeetingAdd from "./MeetingAdd";
import SelectDiv from "../../components/Form/Select";
import MeetingOpenLink from "./MeetinOpenLink";

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
                <div className="w-full bg-slate-100 p-10 text-center">
                    등록된 게시글이 없습니다.
                </div>
                {meetingAdd && meetingAdd.length > 0 && (
                    <div>
                        {meetingAdd.map((meeting, meetindex) => {
                            return (
                                <>
                                    <div key={meetindex}>
                                        <div className="flex justify-between items-center">
                                            <Title className={"titleListStt"}>
                                                {meeting.title}
                                            </Title>
                                            <div className="flex gap-2">
                                                <div className="flex">
                                                    <i className="iconBasic iconView">
                                                        view
                                                    </i>
                                                    1234
                                                </div>
                                                <div className="flex">
                                                    <i className="iconBasic iconView">
                                                        view
                                                    </i>
                                                    1234
                                                </div>
                                            </div>
                                        </div>
                                        <div>{meeting.chatLink}</div>
                                        <MeetingOpenLink
                                            Linkurl={meeting.chatLink}
                                        ></MeetingOpenLink>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                )}
            </SectionWrap>
        </>
    );
}

export default MeetingList;
