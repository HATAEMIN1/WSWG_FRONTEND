import React from "react";
import { SectionFullWrap, SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";

function Home(props) {
    return (
        <>
            <SectionFullWrap>
                풀화면 지도
            </SectionFullWrap>
            <SectionWrap>
                <Title className={"titleBasic"}>#한식</Title>
                <div>swiper</div>
                <Title className={"titleBasic"}>#양식</Title>
                <div>swiper</div>
                <Title className={"titleBasic"}>#중식</Title>
                <div>swiper</div>
                <Title className={"titleBasic"}>#일식</Title>
                <div>swiper</div>
                <Title className={"titleBasic"}>#디저트</Title>
                <div>swiper</div>
            </SectionWrap>
        </>
    );
}

export default Home;
