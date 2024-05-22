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
            <form onSubmit={handleSubmit}>

                <input type="text" onChange={handleInputChange} placeholder="댓글을 입력해주세요" class="text-center" value={commentText}/>
            </form>
            </InputWrap>
  );
}


export default CommentWrite;