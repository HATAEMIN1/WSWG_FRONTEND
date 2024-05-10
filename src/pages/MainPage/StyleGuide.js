import React from "react";
import { Button, ButtonWrap } from "../../components/Form/Button";
import {SectionFullWrap, SectionWrap} from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";
import InputWrap from "../../components/Form/Input";
import { IconStar,IconWish } from "../../components/Form/Icon";

function StyleGuide({...props}) {
    return (
        <>
            <SectionFullWrap>풀화면일때</SectionFullWrap>
            <SectionWrap>     
                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">회원가틀 및 로그인용 타이틀</h2>
                    <Title memTitle={true}>회원가입 및 로그인용 타이틀</Title>
                    <Title memTitle={false}>회원가입 및 로그인용 서브 타이틀</Title>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">메뉴별 페이지용 타이틀</h2>
                    <Title memTitle={false} className={"titleStt"}>서브타이틀</Title>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">#검색 및 스와이퍼 구분용</h2>
                    <Title className={"titleBasic"}>#한식</Title>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">리뷰 댓글용 타이틀</h2>
                    <Title className={"titleComment"}>리뷰 댓글용 타이틀</Title>
                </div>
                
                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">기본/취소 버튼</h2>
                    <ButtonWrap>
                        <Button basicButton={true}>기본 버튼</Button>
                        <Button basicButton={false}>취소 버튼</Button>
                    </ButtonWrap>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">라인 버튼</h2>
                    <ButtonWrap>
                        <Button className={"lineSmallButton"} ><i className="iconSmall iconWriter">writer</i> 나도 작성해 볼까</Button>
                    </ButtonWrap>
                    <ButtonWrap>
                        <Button className={"lineButton"} ><i className="iconBasic iconMore">more</i> 더보기</Button>
                    </ButtonWrap>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">아이콘:iconBasic - 20px</h2>
                    <div className="flex gap-2">
                        <i className="iconBasic iconMore">more</i>
                        <i className="iconBasic iconUserDelet">userDelet</i>
                        <i className="iconBasic iconUserModify">userModify</i>
                        <i className="iconBasic iconCheck">check</i>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">아이콘:iconSmall - 18px</h2>
                    <div className="flex gap-2">
                        <i className="iconSmall iconPass">password</i>
                        <i className="iconSmall iconWriter">writer</i>
                        <i className="iconSmall iconHello">hello</i>
                        <i className="iconSmall iconOut">usersingOut</i>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">추천 아이콘</h2>
                    <div className="flex">
                        <IconStar>별</IconStar>
                        <IconStar>별</IconStar>
                        <IconStar>별</IconStar>
                        <IconStar>별</IconStar>
                        <IconStar>별</IconStar>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">추천 아이콘 - 이미지 위에 올릴때</h2>
                    <div className="flex bg-slate-500">
                        <IconStar className={"whiteLine"} lineStar="true" >별</IconStar>
                        <IconStar className={"whiteLine"} lineStar="true" >별</IconStar>
                        <IconStar className={"whiteLine"} lineStar="true" >별</IconStar>
                        <IconStar className={"whiteLine"} lineStar="true" >별</IconStar>
                        <IconStar className={"whiteLine"} lineStar="true" >별</IconStar>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">좋아요</h2>
                    <div className="flex">
                        <IconWish className={"active"}>좋아요</IconWish>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">모달 모달 -  버튼 스타일 말고 onClick 이벤트 값만 확인하세요!!!</h2>
                    <ButtonWrap className=" flex justify-start gap-5">
                        <Button onClick={()=>{props.modalOpen(2)}}>필터 설정 모달</Button>
                        <Button onClick={()=>{props.modalOpen(0)}}>지도 모달</Button>
                        <Button onClick={()=>{props.modalOpen(1)}}>지역선택 모달</Button>
                    </ButtonWrap>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">가게정보 관련 아이콘</h2>
                    <div className="flex gap-2">
                        <i className="iconTypeStore iconStore">store name</i>
                        <i className="iconTypeStore iconStoreLoc">local</i>
                        <i className="iconTypeStore iconStoreTel">tel</i>
                        <i className="iconTypeStore iconStoreTime">time</i>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">인풋 관련 아이콘</h2>
                    <div className="flex gap-2">
                        <i className="iconTypeInput iconEmail">email</i>
                        <i className="iconTypeInput iconRname">name</i>
                        <i className="iconTypeInput iconRock">pass</i>
                        <i className="iconTypeInput iconRockCheck">passCheck</i>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">아이콘 + input</h2>
                    <div className="flex gap-2 justify-between items-center">
                        <i className="iconTypeInput iconRname">email</i><InputWrap><input type="text" placeholder="테스트 입력용" /></InputWrap>
                    </div>
                </div>
                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">파일 업로드</h2>
                    <div className="flex gap-2 justify-between items-center">
                        <InputWrap className="inputContainer iconPhoto"><input type="text" id="fileInput" placeholder="사진등록" className="text-left" /></InputWrap><button className={"btnFileUpload"}>파일업로드</button>
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">인풋박스만 사용</h2>
                    <InputWrap><input type="text" placeholder="테스트 입력용" /></InputWrap>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">placeholder 배경 인풋</h2>
                    <InputWrap className="inputContainer iconHash"><input type="text" placeholder="해시태그입력" className="text-left" /></InputWrap>
                    <InputWrap className="inputContainer iconPhoto"><input type="text" placeholder="사진등록" className="text-left" /></InputWrap>
                    <InputWrap className="inputContainer iconDetail"><input type="text" placeholder="제목입력" className="text-left" /></InputWrap>
                    <InputWrap className="inputContainer iconLink"><input type="text" placeholder="링크입력" className="text-left" /></InputWrap>
                    <InputWrap className="inputContainer iconText"><input type="text" placeholder="댓글입력" className="text-left" /></InputWrap>
                </div>

                <div className="mb-10">
                    <h2 className=" text-slate-500 font-bold">textarea</h2>
                    <InputWrap><textarea placeholder="내용을 입력하세요" ></textarea></InputWrap>
                </div>
            </SectionWrap>
        </>
    );
}

export default StyleGuide;
