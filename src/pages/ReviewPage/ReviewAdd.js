import React, { useState } from "react";
// import { Link } from "react-router-dom";
import InputWrap from "../../components/Form/Input";
import Title from "../../components/Layout/Title";
import { Button, ButtonWrap } from "../../components/Form/Button";
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { SectionWrap } from "../../components/Layout/Section";

function ReviewAdd(props) {
    const { rtId, rpId } = useParams();
    const [text, setText] = useState({
        content: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(value, name);
        setText((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            ...text,
        };
        try {
            await axiosInstance.post("/products", body);
            navigate("/mate/restaurants/:rtId/review-post/:rpId");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SectionWrap>
            <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    {/* <h2 className=" text-slate-500 font-bold">리뷰 등록/수정</h2> */}
                    <Title memTitle={false}>어까</Title>
                    <Title memTitle={false}>리뷰 등록해볼까?</Title>
                </div>

                <div className="mb-10">
                    <Title className={"titleComment"}>내용</Title>
                    <InputWrap>
                        <textarea placeholder="내용을 입력하세요"></textarea>
                    </InputWrap>
                </div>

                <div className="mb-10">
                    <Title className={"titleComment"}>해시태그</Title>
                    <InputWrap
                        id="tag"
                        name="tag"
                        className="inputContainer iconHash"
                    >
                        <input
                            type="text"
                            placeholder="해시태그입력"
                            className="text-left"
                            onChange={handleChange}
                        />
                    </InputWrap>
                </div>
                <div className="mb-10">
                    <Title className={"titleComment"}>별점주기</Title>
                </div>
                <div className="mb-10">
                    <Title className={"titleComment"}>이미지등록</Title>
                    <InputWrap className="inputContainer iconPhoto">
                        <input
                            type="text"
                            placeholder="사진등록"
                            className="text-left"
                        />
                    </InputWrap>
                    {/* <div className=" text-slate-500 text-base">
                        *이미지는 00MB 이하 jpg, png 형식만 가능합니다
                    </div> */}
                </div>
                <div className="mb-32">
                    <ButtonWrap>
                        <Button basicButton={true}>등록</Button>
                        <Button basicButton={true}>삭제</Button>
                        {/* <Button basicButton={false}>취소</Button> */}
                    </ButtonWrap>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewAdd;
