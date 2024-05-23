import React from 'react';

function MpCommentList({ comment, deleteComment }) {
    const handleDeleteComment = () => {
        deleteComment(comment._id);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <span style={{ fontWeight: "bold", marginRight: "8px" }}>{comment.user.name}</span>
            <span style={{ flex: 1 }}>{comment.content}</span>
            <div
                className="iconTrash"
                style={{ cursor: "pointer", marginLeft: "auto" }}
                onClick={handleDeleteComment}
                alt="삭제"
            ></div>
        </div>
    );
    
    
    
    
}

export default MpCommentList;
