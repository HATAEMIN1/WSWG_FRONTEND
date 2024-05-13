import React from 'react';
import { SectionWrap } from '../../components/Layout/Section';
import Title from '../../components/Layout/Title';
import { ButtonWrap, Button } from '../../components/Form/Button';

function MeetingList(props) {
    return (
        <>
            <SectionWrap>
                <Title memTitle={false} className="mt-[80px]">서브타이틀</Title>
                <div>뭔가 하셔야겠죠?</div>
                <ButtonWrap>
                    <Button basicButton={true}>기본 버튼</Button>
                    <Button basicButton={false}>취소 버튼</Button>
                </ButtonWrap>
            </SectionWrap>
        </>
    );
}

export default MeetingList;