import React from 'react';

function MpCommentList({ comment, deleteComment }) {
    const handleDeleteComment = () => {
        deleteComment(comment._id);
    };

    return (
        <div>
            {comment.user.name} / {comment.content}
            <div
                className="iconTrash"
                style={{ cursor: "pointer" }}
                onClick={handleDeleteComment}
                alt="삭제"
            ></div>
        </div>
    );
}

export default MpCommentList;
