import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStar, IconWish } from "../../components/Form/Icon";

function ReviewList() {
    return (
        <SectionWrap>
            <form>
                <div className="menuWrap">
                    <div className="w-full justify-between items-center">
                        <Title className={"titleComment"}>메뉴</Title>

                        <div className="flex justify-center items-center">
                            <Button className={"lineButton"}>
                                <i className="iconBasic iconMore">more</i> 메뉴
                                더보기
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="reviewWrap">
                    <div className="w-full flex justify-between items-center">
                        <Title className={"titleComment"}>리뷰</Title>

                        <Button className={"lineSmallButton"}>
                            <i className="iconSmall iconWriter">writer</i> 나도
                            작성해 볼까
                        </Button>
                    </div>
                    <div className="flex mt-7 ">
                        <div className="w-[100px] rounded-md overflow-hidden">
                            <img src="/images/mate_friend.png" alt="" />
                        </div>

                        <div className="w-full flex justify-between items-center ">
                            <div className="mx-5 justify-center items-center ">
                                <div className="text-sm">
                                    <p>닉네임</p>
                                    <p>리뷰내용내용내용내용내용</p>
                                </div>

                                <div className="flex">
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                </div>
                                <div className="text-sm">
                                    #태그#태그#태그#태그#태그#ㅐ그ㅐ
                                </div>
                            </div>
                            <div>
                                <button className="border ">삭제아이콘</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-7 ">
                        <div className="w-[100px] rounded-md overflow-hidden">
                            <img src="/images/mate_friend.png" alt="" />
                        </div>

                        <div className="w-full flex justify-between items-center ">
                            <div className="mx-5 justify-center items-center ">
                                <div className="text-sm">
                                    <p>닉네임</p>
                                    <p>리뷰내용내용내용내용내용</p>
                                </div>

                                <div className="flex">
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                    <IconStar>별</IconStar>
                                </div>
                                <div className="text-sm">
                                    #태그#태그#태그#태그#태그#ㅐ그ㅐ
                                </div>
                            </div>
                            <div>
                                <button className="border ">삭제아이콘</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex mt-7 ">
                            <div className="w-[100px] rounded-md overflow-hidden">
                                <img src="/images/mate_friend.png" alt="" />
                            </div>

                            <div className="w-full flex justify-between items-center ">
                                <div className="mx-5 justify-center items-center ">
                                    <div className="text-sm">
                                        <p>닉네임</p>
                                        <p>리뷰내용내용내용내용내용</p>
                                    </div>

                                    <div className="flex">
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                    </div>
                                    <div className="text-sm">
                                        #태그#태그#태그#태그#태그#ㅐ그ㅐ
                                    </div>
                                </div>
                                <div>
                                    <button className="border ">
                                        삭제아이콘
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-7 ">
                            <div className="w-[100px] rounded-md overflow-hidden">
                                <img src="/images/mate_friend.png" alt="" />
                            </div>

                            <div className="w-full flex justify-between items-center ">
                                <div className="mx-5 justify-center items-center ">
                                    <div className="text-sm">
                                        <p>닉네임</p>
                                        <p>리뷰내용내용내용내용내용</p>
                                    </div>

                                    <div className="flex">
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                        <IconStar>별</IconStar>
                                    </div>
                                    <div className="text-sm">
                                        #태그#태그#태그#태그#태그#ㅐ그ㅐ
                                    </div>
                                </div>
                                <div>
                                    <button className="border ">
                                        삭제아이콘
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewList;
