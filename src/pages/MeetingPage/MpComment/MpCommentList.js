import React from 'react'
import { useSelector } from "react-redux";

function MpCommentList(comment,deleteComment) {
    // const user = useSelector((state) => state.user); 
    // const loggedInUserId = user?.userId;
    // const commentAuthorId = comment.user._id;
    // const isCommentAuthor = loggedInUserId === commentAuthorId; 
  
    
    const handleDeleteComment = () => {
      deleteComment(comment._id);
    };
    console.log(comment);
    return (
      <div>
       {comment.comment.user.name} / {comment.comment.content}
       <div  className="iconTrash" style={{cursor: "pointer", }} onClick={() => handleDeleteComment(  comment._id )}alt="삭제" >1</div>

      </div>
    );
  }

export default MpCommentList