import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";
import { IconStarView, IconWish } from "../../components/Form/Icon";
import jQuery from "jquery";

function ReviewList(props) {
    const { cateId, rtId } = useParams();
    const [reviewAdd, setReviewAdd] = useState([]);

    const limit = 5;
    const [skip, setSkip] = useState(1);
    const [hasMore, setHasMore] = useState(true); //초기값은 true로 설정

    const fetchReviewAdd = async () => {
        try {
            const res = await axiosInstance.get("/review-posts", {
                params: {
                    skip, //스크롤햇을때앞의데이터를skip하고뒤에데이터만가져옴
                    limit, //스크롤했을때 다음으로 불러오는 데이터 갯수
                },
            });
            console.log(res.data);

            setReviewAdd((prevReviews) => [...prevReviews, ...res.data.review]);
            //ㄴ>이전 리뷰 목록에 추가
            setHasMore(res.data.hasMore);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReviewAdd();
    }, [skip]); //skip이 될때마다 실행

    // function handelLoadMore() {
    //     const body = {
    //         skip: skip + limit,
    //         limit,
    //         loadMore: true,
    //     };
    //     fetchReviews(body);
    //     setSkip(Number(skip) + Number(limit));
    // }

    function handelLoadMore() {
        if (hasMore) {
            const newSkip = skip + limit; //새로운 skip값 계산
            // setSkip((prevSkip) => prevSkip);
            setSkip(newSkip); //skip값을 업데이트
        }
    }

    // const renderReviewItem = (review, index) => {

    // }

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

                {reviewAdd && reviewAdd.length > 0 && (
                    <div>
                        {reviewAdd.map((review, index) => {
                            return (
                                <div>
                                    <div key={index}>
                                        <div>{review.rtId}</div>
                                        <div>{review.userId}</div>
                                        <div>{review.cateId}</div>
                                        <div>{review.content}</div>
                                        <div>{review.rating}</div>
                                    </div>
                                    <div>
                                        {hasMore && (
                                            <ButtonWrap>
                                                <Button
                                                    onClick={handelLoadMore}
                                                >
                                                    더보기
                                                </Button>
                                            </ButtonWrap>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    // {hasMore && (
                    //     <ButtonWrap>
                    //         <Button on></Button>
                    //     </ButtonWrap>
                    // )}
                )}
            </form>
        </SectionWrap>
    );
}

export default ReviewList;
