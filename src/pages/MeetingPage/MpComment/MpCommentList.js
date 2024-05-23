import React from 'react';

function MpCommentList({ comment, deleteComment, currentUserId }) {
    const handleDeleteComment = () => {
        deleteComment(comment._id);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "8px", 
                backgroundColor: comment.user.imageUrl ? "transparent" : "#ccc", 
                marginRight: "8px", 
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {comment.user.imageUrl && (
                    <img 
                        src={comment.user.imageUrl} 
                        alt={`${comment.user.name}의 프로필 이미지`} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                )}
            </div>
            <span style={{ fontWeight: "bold", marginRight: "8px" }}>{comment.user.name}</span>
            <span style={{ flex: 1 }}>{comment.content}</span>
            {comment.user._id === currentUserId && (
                <div
                    className="iconTrash"
                    style={{ cursor: "pointer", marginLeft: "auto" }}
                    onClick={handleDeleteComment}
                    alt="삭제"
                ></div>
            )}
        </div>
    );
}

export default MpCommentList;
