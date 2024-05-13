import React, { useState } from "react";
// import { Link } from "react-router-dom";
import InputWrap from "../../components/Form/Input";
import Title from "../../components/Layout/Title";
import { Button, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { SectionWrap } from "../../components/Layout/Section";
import { useSelector } from "react-redux";
function ReviewAdd(props) {
    const { cateId, rtId } = useParams();
    // console.log(cateId);
    // console.log(rtId);

    // const userDataString = localStorage.getItem("persist:root").split("\\");
    // const userId = userDataString[7].slice(1);

    // // const userId = window.localStorage.getItem("persist:root");
    // console.log(userId);
    const userData = useSelector((state) => state.user.userData.user);
    const [text, setText] = useState({
        title: "",
        content: "",
        rating: [],
        hashtag: [],
        images: [],
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(value, name);
        setText((prevState) => {
            return {
                ...prevState, //이전상태
                [name]: value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            ...text,
            rtId,
            cateId,
            userId: userData.id,
        };
        try {
            await axiosInstance.post("/review-posts", body);
            navigate(`/mate/${cateId}/restaurants/${rtId}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SectionWrap>
            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <Title memTitle={true}>어까</Title>
                    <Title memTitle={false}>리뷰 등록해볼까?</Title>
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
                    <InputWrap
                        id="hashtag"
                        name="hashtag"
                        className="inputContainer iconHash"
                    >
                        <input
                            type="text"
                            id="hashtag"
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
                    <InputWrap>
                        <textarea
                            type="text"
                            id="rating"
                            className="text-left"
                            onChange={handleChange}
                            name="rating"
                            value={text.rating}
                        />
                    </InputWrap>
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
                        <Button basicButton={true}>취소</Button>
                        {/* <Button basicButton={false}>취소</Button> */}
                    </ButtonWrap>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewAdd;
