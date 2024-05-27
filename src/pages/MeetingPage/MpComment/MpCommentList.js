import React, { useState, useEffect, useRef } from 'react';

function MpCommentList({ comments, fetchMoreComments, deleteComment, currentUserId, hasMore }) {
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    const loadMoreComments = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            await fetchMoreComments();
        } catch (error) {
            console.error("Error fetching more comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreComments();
                }
            },
            { threshold: 1 }
        );
        if (observerRef.current) {
            observer.observe(observerRef.current);
        }
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loadMoreComments]);

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId);
    };

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={`${comment._id}-${index}`} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
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
                            onClick={() => handleDeleteComment(comment._id)}
                            alt="삭제"
                        ></div>
                    )}
                </div>
            ))}
            {hasMore && (
                <div ref={observerRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
            )}
            {loading && <div>Loading more comments...</div>}
        </div>
    );
}

export default MpCommentList;
