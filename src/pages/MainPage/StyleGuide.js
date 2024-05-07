import React from "react";
import Button from "../../components/Form/Button";
import SectionWarp from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";

function StyleGuide(props) {
    return (
        <>
            <div>풀 화면</div>
            <SectionWarp>
            <div>
                <Title memTitle={true}>버튼스타일</Title>
                <Title memTitle={false}>서브타이틀</Title>
                <Title className={"titleBasic"}>#검색 및 스와이퍼 구분용</Title>
                <Title className={"titleComment"}>리뷰 댓글용 타이틀</Title>
                <div className="flex gap-2">
                    <Button basicButton={true}>기본 버튼</Button>
                    <Button basicButton={false}>취소 버튼</Button>
                </div>
                <div className="flex gap-2">
                    <Button className={"lineButton"}>라인버튼</Button>
                    <Button className={"lineButton"}>취소</Button>
                </div>
            </div>
            </SectionWarp>
        </>
    );
}

export default StyleGuide;
