import React, { useEffect, useState } from "react";
import InputWrap from "../../components/Form/Input";
import Title from "../../components/Layout/Title";
import { Button, ButtonCencel, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { SectionWrap } from "../../components/Layout/Section";
import { useSelector } from "react-redux";
import { IconStar, IconWish } from "../../components/Form/Icon";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import StarRating from "../../components/Form/StarRating";
import Dropzone from "react-dropzone";
import FileUpload from "../../components/Form/FileUpload";

function ReviewAdd(props) {
    const { cateId, rtId } = useParams();
    // const [reviews, setReviews] = useState([]);
    const [inputHashTag, setInputHashTag] = useState("");
    const [hashtag, setHashTag] = useState([]);
    const [error, setError] = useState(""); //에러상태정의
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);

    const [text, setText] = useState({
        title: "",
        content: "",
        images: [],
    });

    // 해시태그-------------------------------------------------------------------------------->

    const changeHashTag = (e) => {
        setInputHashTag(e.target.value);
    };

    const isEmptyValue = (value) => {
        return !value.trim();
    };

    const addHashTag = (e) => {
        e.preventDefault();
        const allowInput = ["Comma", "Enter", "Space", "NumpadEnter"];
        if (!allowInput.includes(e.key)) return;

        if (isEmptyValue(e.target.value.trim())) {
            return setInputHashTag("");
        }

        let newHashTag = e.target.value.trim(); //입력필드의 현재값에서 trim()을 사용하여 문자열의 앞뒤공백제거
        const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (regExp.test(newHashTag)) {
            newHashTag = newHashTag.replace(regExp, "");
        }
        //includes()를 사용하여해시태그에 ,가포함되어있는지확인 , split()쉼표를기준으로 문자열 배열로 분할, join()분활된배열을하나의문자로결합,쉼표제거
        if (newHashTag.includes(",")) {
            newHashTag = newHashTag.split(",").join("");
        }

        if (isEmptyValue(newHashTag)) return;
        console.log(newHashTag);

        //헤시태그목록에 새로운 해시태그추가
        setHashTag((prevHashTags) => {
            const newHashTagSet = new Set([...prevHashTags, newHashTag]);
            const newHashTagArray = [...newHashTagSet];
            const hashtagLength = newHashTagArray.join("").length;

            if (hashtagLength > 15) {
                setError("*등록 가능한 해시태그는 최대 15자입니다");
                return prevHashTags; // 새로운 해시태그를 추가하지 않고 이전 해시태그 반환
            } else {
                setError(""); // 기존의 에러를 지웁니다
                return newHashTagArray; // 새로운 해시태그를 추가
            }
        });
        setInputHashTag("");
    };

    //enter키를 눌렀을 때 브라우저의 새로고침을 막는다
    const keyDownHandler = (e) => {
        if (e.key !== "Enter" && e.key !== "NumpadEnter" && e.key !== " ")
            return;
        e.preventDefault();
        addHashTag(e);
    };
    //--------------------------------------------------------------------------------------->

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
            restId: rtId, //해당게시물의 ID를 전달
            userId: userData.id,
            rating: rating,
            hashTag: hashtag,
        };

        try {
            await axiosInstance.post("/review-posts", body);
            navigate(`/mate/${cateId}/restaurants/${rtId}`);
        } catch (error) {
            console.log(error);
        }
    }

    function handleStarClick(index) {
        setRating(index + 1);
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

    const handleCancelClick = () => {
        navigate(`/mate/${cateId}/restaurants/${rtId}`);
    };

    //이미지----------------------------------------------------------------------------------->
    // function handleImage(newImages) {
    //     // console.log("image");
    //     setText((prevState) => ({
    //         ...prevState,
    //         images: newImages,
    //     }));
    //     console.log(newImages);
    // }

    const handleImage = (images) => {
        setText((prevState) => ({
            ...prevState,
            images: images.map((image) => URL.createObjectURL(image)), // 업로드한 이미지 파일의 URL을 생성하여 저장
        }));
    };
    //----------------------------------------------------------------------------------------->

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
                            placeholder="해시태그입력(최대15자)"
                            className="text-left"
                            onChange={changeHashTag}
                            onKeyUp={addHashTag}
                            onKeyDown={keyDownHandler}
                            name="hashtag"
                            value={inputHashTag}
                        />
                    </InputWrap>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {/* 해시태그 목록 렌더링 */}
                    <div className="flex gap-2 pt-2">
                        {inputHashTag}
                        {hashtag.length > 0 &&
                            hashtag.map((hashTag) => (
                                <div
                                    key={hashTag}
                                    className="flex items-center gap-2"
                                >
                                    <span className="hashBox">#{hashTag}</span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mb-10">
                    <Title className={"titleComment"}>
                        <label htmlFor="rating">별점주기</label>
                    </Title>
                    <div className="starRating flex">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <IconStar
                                key={index}
                                onClick={() => handleStarClick(index)}
                                isActive={index < rating}
                                className={index < rating ? "selected" : ""}
                            >
                                별
                            </IconStar>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <div>
                        <Title className={"titleComment"}>이미지등록</Title>
                        <div className="flex gap-2 justify-between items-center p-3 border">
                            {/* <InputWrap className="inputContainer iconPhoto">
                                <input
                                    // type="text"
                                    id="fileInput"
                                    placeholder="사진등록"
                                    // className="text-left"
                                />
                            </InputWrap> */}

                            <FileUpload
                                images={text.images}
                                onImageChange={handleImage}
                            />
                        </div>

                        <div className="text-md text-slate-500 text-base my-1">
                            *이미지는 00MB 이하 jpg, png 형식만 가능합니다
                        </div>

                        {/* <div className="flex gap-2 mb-14">
                            <Button className={"lineDelButton"}>
                                daadfadsfa.jpg
                                <i className="iconSmall iconDel">delet</i>
                            </Button>
                            <Button className={"lineDelButton"}>
                                daadfadsfa2.jpg
                                <i className="iconSmall iconDel">delet</i>
                            </Button>
                        </div> */}
                    </div>
                    <div className=" text-md flex justify-center mb-5 text-red-600">
                        *타인을 비방하거나 불건전한 내용을 등록 시 삭제 될 수
                        있습니다.
                    </div>
                </div>
                <div className="mb-32">
                    <ButtonWrap>
                        <Button basicButton={true}>등록</Button>
                        <ButtonCencel onClick={handleCancelClick}>
                            취소
                        </ButtonCencel>
                    </ButtonWrap>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewAdd;
