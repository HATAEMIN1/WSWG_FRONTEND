import React, { useState } from "react";
import InputWrap from "../../../components/Form/Input";

function CommentWrite({ onSubmit }) {
    const [commentText, setCommentText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(commentText);
        setCommentText("");
    }

    function handleInputChange(e) {
        setCommentText(e.target.value);
    }

    return (
        <InputWrap>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    placeholder="댓글을 입력해주세요"
                    className="text-center"
                    value={commentText}
                    style={{ flex: 1, marginRight: '8px' }}
                />
                <button 
                    type="submit" 
                    style={{ 
                        background: 'none', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        padding: '5px 10px'
                    }}
                >
                    입력
                </button>
            </form>
        </InputWrap>
    );
}

export default CommentWrite;
