import React from "react";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";

function ReviewView() {
    return (
        <SectionWrap>
            <form>
                <div>
                    <Title className={"titleComment"}>back</Title>
                </div>

                <div className="flex">
                    <div className="w-[100px] rounded-md overflow-hidden">
                        <img src="/images/mate_friend.png" alt="" />
                    </div>
                    <div className="mx-5 mt-5 justify-center items-center">
                        가게이름
                        <p className="text-sm">한식</p>
                    </div>
                </div>

                <div className="flex mt-7 ">
                    <div className="w-[100px] rounded-md overflow-hidden">
                        <img src="/images/mate_friend.png" alt="" />
                    </div>
                    <div className="flex mx-5 mt-5 justify-center items-center">
                        <div>
                            닉네임
                            <p className="text-sm">작성날짜</p>
                            <p className="text-sm my-3">평점</p>
                        </div>
                    </div>
                </div>
                <div className="text-sm my-8">
                    <p>리뷰내용내요요내요내요용내욘요요낸요ㅛㅇ</p>
                </div>
                <div className="text-sm mt-8 mb-3">
                    <p>해시태그태그태그ㅐ트개</p>
                </div>
                <div className="flex justify-between gap-2 mb-40">
                    {/* <img src="/images/mate_friend.png" alt="" /> */}
                    <div className="w-[175px] overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>
                    <div className="w-[175px] overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>
                    <div className="w-[175px] overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>
                    <div className="w-[175px] overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>
                    <div className="w-[175px] overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewView;
