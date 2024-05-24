import React, { useState } from "react";
import InputWrap from "../../../components/Form/Input";

import btnEnter from "../../../assets/images/btnEnter.png";

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
    <form onSubmit={handleSubmit} className="flex gap-4">
        <InputWrap>
            <input type="text" onChange={handleInputChange} placeholder="댓글을 입력해주세요" class="text-center" value={commentText}/>
        </InputWrap>
        <button onSubmit={handleSubmit}><img src={btnEnter} alt="enter" /></button>
    </form>
  );

}

export default CommentWrite;
