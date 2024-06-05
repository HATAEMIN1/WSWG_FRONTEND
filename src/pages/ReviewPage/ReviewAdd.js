import React, { useEffect, useState } from "react";
import InputWrap from "../../components/Form/Input";
import Title from "../../components/Layout/Title";
import { Button, ButtonCencel, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { SectionWrap } from "../../components/Layout/Section";
import { useSelector } from "react-redux";
import { IconStar } from "../../components/Form/Icon";
import NotificationModal from "../../components/Modal/NotificationModal";
import DefaultModal from "../../components/Modal/DefualtModal";
import FileUpload from "../../components/Form/FileUpload";
import iconLT from "../../assets/images/iconLT.svg";
import iconRT from "../../assets/images/iconRT.svg";
import iconRB from "../../assets/images/iconRB.svg";
import iconLB from "../../assets/images/iconLB.svg";

function ReviewAdd(props) {
    const { cateId, rtId } = useParams();
    const [inputHashTag, setInputHashTag] = useState("");
    const [hashtag, setHashTag] = useState([]);
    const [error, setError] = useState(""); // 에러 상태 정의
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [text, setText] = useState({
        title: "",
        content: "",
        images: [],
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);

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

        let newHashTag = e.target.value.trim(); // 입력 필드의 현재 값에서 trim()을 사용하여 문자열의 앞뒤 공백 제거
        const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (regExp.test(newHashTag)) {
            newHashTag = newHashTag.replace(regExp, "");
        }

        if (newHashTag.includes(",")) {
            newHashTag = newHashTag.split(",").join("");
        }

        if (isEmptyValue(newHashTag)) return;

        setHashTag((prevHashTags) => {
            const newHashTagSet = new Set([...prevHashTags, newHashTag]);
            const newHashTagArray = [...newHashTagSet];
            const hashtagLength = newHashTagArray.join("").length;

            if (hashtagLength > 15) {
                setError("*등록 가능한 해시태그는 최대 15자입니다");
                return prevHashTags;
            } else {
                setError("");
                return newHashTagArray;
            }
        });
        setInputHashTag("");
    };

    const keyDownHandler = (e) => {
        if (e.key !== "Enter" && e.key !== "NumpadEnter" && e.key !== " ")
            return;
        e.preventDefault();
        addHashTag(e);
    };

    const removeHashTag = (indexToRemove) => {
        setHashTag((prevHashTags) =>
            prevHashTags.filter((_, index) => index !== indexToRemove)
        );
    };

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "content" && value.length > 300) {
            setError("내용은 최대 300자까지 입력 가능합니다.");
            return;
        }
        setError("");
        setText((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            content: text.content,
            images: text.images,
            rating: rating,
            userId: userData.id,
            restId: rtId,
            tags: hashtag,
        };

        try {
            await axiosInstance.post("/review-posts", body);
            setModalOpen(true);
        } catch (error) {
            console.log(error);
            setModalOpen(false);
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

    function handleImage(newImages) {
        setText((prevState) => ({
            ...prevState,
            images: newImages,
        }));
    }

    function handleConfirm() {
        setModalOpen(false);
        navigate(`/mate/${cateId}/restaurants/${rtId}`);
    }

    function handleClose() {
        setModalOpen(false);
    }

    return (
        <SectionWrap>
            {modalOpen && (
                <NotificationModal
                    text="리뷰 등록이 완료되었습니다!"
                    path="/review-posts"
                    imgSrc="/images/iconSmile.png"
                    imgAlt="smile icon"
                />
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}>리뷰 등록해볼까?</Title>
                </div>
                <div className="w-full min-h-[120px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border items-center">
                    <div className="w-[100px] h-[100px] p-2 rounded-md overflow-hidden">
                        {restaurantData.length > 0 && (
                            <img
                                src={restaurantData[0].image[0]}
                                alt=""
                                className="block object-cover w-full h-full"
                            />
                        )}
                    </div>
                    <div className="flex-auto p-[20px]">
                        {restaurantData.length > 0 && (
                            <>
                            <h2 className="text font-semibold">{restaurantData[0].name}</h2>
                            <p>{restaurantData[0].category[0].foodtype}</p>
                            </>
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
                            maxLength={300}
                        ></textarea>
                        <div className="text-right text-sm text-gray-500">
                            {text.content.length}/300
                        </div>
                        {error && (
                            <p style={{ color: "red" }} className="mt-2">
                                {error}
                            </p>
                        )}
                    </InputWrap>
                </div>

                <div className="mb-10">
                    <Title className={"titleComment"}>
                        <label htmlFor="hashtag">해시태그</label>
                    </Title>
                    <InputWrap className="inputContainer iconHash">
                        <input
                            type="text"
                            placeholder="해시태그 입력(최대 15자)"
                            className="text-left"
                            onChange={changeHashTag}
                            onKeyUp={addHashTag}
                            onKeyDown={keyDownHandler}
                            name="hashtag"
                            value={inputHashTag}
                        />
                    </InputWrap>
                    {/* 해시태그 목록 렌더링 */}
                    <div className="flex gap-2 pt-2">
                        {hashtag.length > 0 &&
                            hashtag.map((hashTag, index) => (
                                <div
                                    key={hashTag}
                                    className="flex relative items-center gap-2"
                                >
                                    <div className="flex gap-2 hashBox justify-center items-center">
                                        #{hashTag}
                                        <button
                                            type="button"
                                            onClick={() => removeHashTag(index)}
                                            className="text-gray-400"
                                        >
                                            &#10005;
                                        </button>
                                    </div>
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
                        <Title className={"titleComment"}>이미지 등록</Title>
                        <div className="w-full relative bg-[#f5f5f5] h-[150px]">
                            <div className="absolute w-full left-0 top-0 flex justify-between">
                                <span>
                                    <img src={iconLT} />
                                </span>
                                <span>
                                    <img src={iconRT} />
                                </span>
                            </div>
                            <FileUpload
                                images={text.images}
                                onImageChange={handleImage}
                            />
                            <div className="absolute w-full left-0 bottom-0 flex justify-between">
                                <span>
                                    <img src={iconLB} />
                                </span>
                                <span>
                                    <img src={iconRB} />
                                </span>
                            </div>
                        </div>
                        <div className="text-sm text-slate-500 text-base mt-1">
                            *이미지는 최대 5개까지 업로드할 수 있습니다.
                        </div>
                        <div className="text-sm text-slate-500 text-base mt-1 mb-20">
                            *이미지는 00MB 이하 jpg, png 형식만 가능합니다.
                        </div>
                    </div>
                    <div className="text-md flex justify-center mb-5 text-red-600">
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

            <DefaultModal show={modalOpen} onClose={handleClose}>
                <div className="pb-3">리뷰 등록이 완료되었습니다</div>
                <Button basicButton={true} onClick={handleConfirm}>
                    확인
                </Button>
            </DefaultModal>
        </SectionWrap>
    );
}

export default ReviewAdd;
