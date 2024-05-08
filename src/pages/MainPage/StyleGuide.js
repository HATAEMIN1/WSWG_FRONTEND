import React from "react";
import { Button, ButtonWrap, SelectButton } from "../../components/Form/Button";
import SectionWarp from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";

function StyleGuide(props) {
    return (
        <>
            <div>풀 화면</div>
            <SectionWarp>
                <Title memTitle={true}>회원가입 및 로그인용 타이틀</Title>
                <Title memTitle={false}>서브타이틀</Title>
                <Title className={"titleBasic"}>#검색 및 스와이퍼 구분용</Title>
                <Title className={"titleComment"}>리뷰 댓글용 타이틀</Title>
                <ButtonWrap>
                    <Button basicButton={true}>기본 버튼</Button>
                    <Button basicButton={false}>취소 버튼</Button>
                </ButtonWrap>
                <ButtonWrap>
                    <Button className={"lineButton"}>라인버튼</Button>
                </ButtonWrap>
                <ButtonWrap>
                    <SelectButton>셀렉트버튼</SelectButton>
                </ButtonWrap>
            </SectionWarp>
        </>
    );
}

export default StyleGuide;
