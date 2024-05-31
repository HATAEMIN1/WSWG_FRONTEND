import React, { useState } from "react";
import InputWrap from "../../../components/Form/Input";
import btnEnter from "../../../assets/images/btnEnter.png";

function CommentWrite({ onSubmit }) {
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (commentText.length > 50) {
            setError("댓글은 최대 50자까지 입력 가능합니다.");
            return;
        }
        onSubmit(commentText);
        setCommentText("");
        setError(""); // 댓글이 제출되면 에러 메시지를 초기화합니다.
    }

    function handleInputChange(e) {
        const value = e.target.value;
        if (value.length <= 50) {
            setCommentText(value);
            setError(""); // 댓글이 50자 이하로 입력되면 에러 메시지를 초기화합니다.
        } else {
            setError("댓글은 최대 50자까지 입력 가능합니다.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
                <InputWrap>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        placeholder="댓글을 입력해주세요"
                        className="text-center"
                        value={commentText}
                    />
                </InputWrap>
                <button type="submit">
                    <img src={btnEnter} alt="enter" />
                </button>
            </div>
            {error && (
                <div style={{ color: "red" }} className="mt-2">
                    {error}
                </div>
            )}
        </form>
    );
}

export default CommentWrite;
