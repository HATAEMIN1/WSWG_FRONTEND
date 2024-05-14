import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";

function ReviewList() {
    const [review, setReview] = useState([]);

    const limit = 5;
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const fetchReviews = async ({
        skip, //스크롤햇을때앞의데이터를skip하고뒤에데이터만가져옴
        limit, //스크롤했을때 다음으로 불러오는 데이터 갯수
        loadMore = false,
    }) => {
        const params = {
            skip,
            limit,
        };
        try {
            const res = await axiosInstance.get("/review", { params });
            console.log(res.data.review);

            if (loadMore) {
                setReview([...review, ...res.data.review]);
            } else {
                setReview(res.data.review);
            }
            setHasMore(res.data.hasMore);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviews({ skip, limit });
    }, []);

    function handelLoadMore() {
        const body = {
            skip: skip + limit,
            limit,
            loadMore: true,
        };
        fetchReviews(body);
        setSkip(Number(skip) + Number(limit));
    }

    return (
        <SectionWrap>
            <form>
                <div className="reviewWrap">
                    <div className="w-full flex justify-between items-center">
                        <Title className={"titleComment"}>리뷰</Title>

                        <Button className={"lineSmallButton"}>
                            <i className="iconSmall iconWriter">writer</i> 나도
                            작성해 볼까
                        </Button>
                    </div>
                    {/* <div className="flex mt-7 ">
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
                </div> */}

                    <div className="flex reviewListWrap gap-5">
                        <div className="flex-none imgWrap">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/imageSample1.png`}
                            />
                        </div>
                        <div className="flex flex-col justify-between py-[10px]">
                            <ul className="textWrap">
                                <li className="name">우주여신 최보람</li>
                                <li className="content w-full ">
                                    정말 오래 기다려서 먹었습니다. 그런데 너무
                                    맛있네요. 왜기다리는지 알겠어요. 정말
                                    여기서만 먹을 수 있는 음식이란 생각이네요.
                                    왜기다리는지 알겠어요. 정말 여기서만 먹을 수
                                    있는 음식이란 생각이네요.
                                </li>
                                <li className="flex">
                                    평점
                                    <span className="flex">
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                    </span>
                                </li>
                            </ul>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="hashBox">#보쌈</span>
                                    <span className="hashBox">#족발</span>
                                </div>
                                <div>
                                    <button
                                        className="iconTrash"
                                        alt="삭제"
                                    ></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* list 반복 */}
                    {/* list 반복 */}
                    <div className="flex reviewListWrap gap-5">
                        <div className="flex-none imgWrap"></div>
                        <div className="flex flex-col justify-between py-[10px]">
                            <ul className="textWrap">
                                <li className="name">우주여신 최보람</li>
                                <li className="content w-full ">
                                    정말 오래 기다려서 먹었습니다. 그런데 너무
                                    맛있네요. 왜기다리는지 알겠어요. 정말
                                    여기서만 먹을 수 있는 음식이란 생각이네요.
                                    왜기다리는지 알겠어요. 정말 여기서만 먹을 수
                                    있는 음식이란 생각이네요.
                                </li>
                                <li className="flex">
                                    평점
                                    <span className="flex">
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView className={"active"}>
                                            별
                                        </IconStarView>
                                        <IconStarView>별</IconStarView>
                                        <IconStarView>별</IconStarView>
                                    </span>
                                </li>
                            </ul>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="hashBox">#보쌈</span>
                                    <span className="hashBox">#족발</span>
                                </div>
                                <div>
                                    <button
                                        className="iconTrash"
                                        alt="삭제"
                                    ></button>
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
