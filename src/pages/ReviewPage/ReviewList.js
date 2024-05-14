import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";

function ReviewList(props) {
    const { cateId, rtId } = useParams();
    const [reviewList, setReviewList] = useState([]);

    const fetchReviewList = async () => {
        try {
            const res = await axiosInstance.get("/review-posts");
            console.log(res.data);
            setReviewList(res.data.review);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchReviewList();
    }, []);
    return (
        <SectionWrap>
            <form>
                <div className="reviewWrap">
                    <div className="w-full flex justify-between items-center">
                        <Title className={"titleComment"}>리뷰</Title>
                        <Link
                            to={`/mate/${cateId}/restaurants/${rtId}/review-post/new`}
                        >
                            <Button className={"lineSmallButton"}>
                                <i className="iconSmall iconWriter">writer</i>{" "}
                                나도 작성해 볼까
                            </Button>
                        </Link>
                    </div>

                    <div className="flex reviewListWrap gap-5">
                        <div className="flex-none imgWrap">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/imageSample1.png`}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-between py-[10px]">
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
                        <div className="w-full flex flex-col justify-between py-[10px]">
                            <ul className="textWrap">
                                <li className="name">우주여신 최보람</li>
                                <li className="content w-full ">
                                    정말 오래 기다려서 먹었습니다. 그런데 너무
                                    맛있네요.
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

                {reviewList && reviewList.length > 0 && (
                    <div>
                        {reviewList.map((review, index) => {
                            return (
                                <>
                                    <div key={index}>{review.user.name}</div>
                                </>
                            );
                        })}
                    </div>
                )}
            </form>
        </SectionWrap>
    );
}

export default ReviewList;
