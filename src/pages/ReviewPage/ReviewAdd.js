import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import InputWrap from "../../components/Form/Input";
import Title from "../../components/Layout/Title";
import { Button, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { SectionWrap } from "../../components/Layout/Section";
import { useSelector } from "react-redux";
import { IconStar, IconWish } from "../../components/Form/Icon";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StarRating from "../../components/Form/StarRating";

function ReviewAdd(props) {
    const { cateId, rtId } = useParams();
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();

    const [text, setText] = useState({
        title: "",
        content: "",
        rating: 0,
        hashtag: "",
        images: [],
    });

    const [rating, setRating] = useState(0);
    const [restaurantData, setRestaurantData] = useState([]);

    function handleChange(e) {
        const { name, value } = e.target;
        setText((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            ...text,
            restId: rtId,
            userId: userData.id,
            rating: rating,
        };
        try {
            await axiosInstance.post("/review-posts", body);
            navigate(`/mate/${cateId}/restaurants/${rtId}`);
        } catch (error) {
            console.log(error);
        }
    }

    function handleStarClick(idx) {
        setRating(idx + 1);
    }

    useEffect(() => {
        async function restaurantView() {
            const res = await axiosInstance.get(
                `/restaurants/${cateId}/${rtId}`
            );
            setRestaurantData([...restaurantData, res.data.restaurant]);
        }
        restaurantView();
    }, []);

    return (
        <SectionWrap>
            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}>리뷰 등록해볼까?</Title>
                </div>
                <div className="w-full min-h-[120px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border items-center">
                    <div className=" w-[100px] overflow-hidden border-r-[1px] p-2">
                        {restaurantData.length > 0 && (
                            <img
                                src={restaurantData[0].image[0]}
                                alt=""
                                className="block"
                            />
                        )}
                    </div>
                    <div className="flex-auto p-[20px]">
                        {restaurantData.length > 0 && (
                            <div>
                                <h2>{restaurantData[0].name}</h2>
                                <p>{restaurantData[0].category[0].foodtype}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-10">
                    <Title className={"titleComment"}>내용</Title>
                    <InputWrap>
                        <textarea
                            type="text"
                            placeholder="내용을 입력하세요"
                            id="content"
                            className="text-left"
                            onChange={handleChange}
                            name="content"
                            value={text.content}
                        ></textarea>
                    </InputWrap>
                </div>

                <div className="mb-10">
                    <Title className={"titleComment"}>
                        <label htmlFor="hashtag">해시태그</label>
                    </Title>
                    <InputWrap className="inputContainer iconHash">
                        <input
                            type="text"
                            placeholder="해시태그입력"
                            className="text-left"
                            onChange={handleChange}
                            name="hashtag"
                            value={text.hashtag}
                        />
                    </InputWrap>
                </div>
                <div className="mb-10">
                    <Title className={"titleComment"}>
                        <label htmlFor="rating">별점주기</label>
                    </Title>
                    <div className="starRating flex">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <IconStar
                                key={index}
                                onClick={() => handleStarClick(index)}
                                className={index <= rating ? "selected" : ""}
                            >
                                별
                            </IconStar>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <div>
                        <Title className={"titleComment"}>이미지등록</Title>
                        <div className="flex gap-2 justify-between items-center">
                            <InputWrap className="inputContainer iconPhoto">
                                <input
                                    type="text"
                                    id="fileInput"
                                    placeholder="사진등록"
                                    className="text-left"
                                />
                            </InputWrap>
                            <button className={"btnFileUpload"}>
                                파일업로드
                            </button>
                        </div>
                        <div className="text-md text-slate-500 text-base my-1">
                            *이미지는 00MB 이하 jpg, png 형식만 가능합니다
                        </div>
                        <div className="flex gap-2 mb-14">
                            <Button className={"lineDelButton"}>
                                daadfadsfa.jpg
                                <i className="iconSmall iconDel">delet</i>
                            </Button>
                            <Button className={"lineDelButton"}>
                                daadfadsfa2.jpg
                                <i className="iconSmall iconDel">delet</i>
                            </Button>
                        </div>
                    </div>
                    <div className=" text-md flex justify-center mb-5 text-red-600">
                        *타인을 비방하거나 불건전한 내용을 등록 시 삭제 될 수
                        있습니다.
                    </div>
                </div>
                <div className="mb-32">
                    <ButtonWrap>
                        <Button basicButton={true}>등록</Button>
                        <Link to={`/mate/${cateId}/restaurants/${rtId}`}>
                            취소
                        </Link>
                    </ButtonWrap>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewAdd;
