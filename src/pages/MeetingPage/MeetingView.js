import React, { useEffect, useState } from "react";
import { SectionWrap } from "../../components/Layout/Section";
import { Link, useParams } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IconWish } from "../../components/Form/Icon";
import axiosInstance from "../../utils/axios";
import { useSelector } from "react-redux";
import StarRating from "../../components/Form/StarRating";
import CommentWrite from "./MpComment/CommentWrite";
import MpCommentList from "./MpComment/MpCommentList";

function MeetingView(props) {
    const [views, setViews] = useState(0);
    const { mpId } = useParams();
    const userId = useSelector((state) => {
      return state.user.userData.id;
  });
    const [comment, setComment] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [mpCon, setMpCon] = useState(null);
    

    


    

    useEffect(() => {
      
      async function loadMpCon() {
        try {
          const res = await axiosInstance.get(`/meet-posts/${mpId}`);
          setMpCon(res.data.meetUpPost);
        } catch (error) {
           console.log(error.message);
        }
      }
      loadMpCon();
    }, []);

    useEffect(() => {
      async function comment() {
        try {
          // console.log("mpId" + mpId);
          const res = await axiosInstance.get(`/meet-posts/${mpId}/comments`);
          // console.log(res.data);
          // console.log(res.data.comment);
          setComment(res.data.comment);
        } catch (error) {
          console.log("문자로쳐주세요");
          console.log(error);
        }
      }
      comment();
      console.log("commentLength" + comment.length);
    }, []);

    async function handleInsertComment(commentContent) {
      const commentData = {
        content: commentContent,
        userId:userId
      };
      // console.log(commentData);
  
      try {
        const res = await axiosInstance.post(
          `/meet-posts/${mpId}/comments`,
          commentData
        );
        // console.log(res.data.comment);
        const newComment = res.data.comment;
        setComment([...comment,newComment ]);
        
      } catch (error) {
        console.log(error);
      }
    }
    // if (!mpCon) return null;

    const deleteComment = async (commentId) => {
      
      try {
        await axiosInstance.delete(`/meet-posts/${mpId}/comments/${commentId}`); 
        setComment(
         
          comment.filter((comment) => {
            return comment._id !== commentId;          
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    return (
        <SectionWrap>
            <Title className={"titleComment"}>
                <Link to="/meet-posts">
                    <button className="flex items-center">
                        <i className="btnBack">more</i> BACK
                    </button>
                </Link>
            </Title>
            <div className="w-full min-h-[543px] flex justify-between bg-[#F8F8F8] rounded-lg overflow-hidden border restarantView">
                <div className="w-full overflow-hidden border-r-[1px]">
                    지도를 넣어봅시다.
                </div>
                <div className="flex-auto p-[20px]">
                    <div className="w-[360px] h-[360px] bg-slate-300 rounded-md overflow-hidden">
                        <Swiper pagination={true} modules={[Pagination]} className="mySwiper swiperView">
                            {restaurantData.length > 0 &&
                                restaurantData[0].image.slice(2).map((item, i) => (
                                    <SwiperSlide key={`restaurantSlide-${i}`}>
                                        <div className="bgLayer"></div>
                                        <img src={`${item}`} alt={`restaurantSlideImg-${i}`} />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                    <div className="flex flex-wrap">
                        {restaurantData.length > 0 && <h4>{restaurantData[0].name}</h4>}
                        <ul>
                            <li>{restaurantData.length > 0 && restaurantData[0].category[0].foodtype}</li>
                            <li className="flex">
                                {restaurantData.length > 0 && (
                                    <>
                                        <span className="flex-none">평점: </span>
                                        <StarRating rating={restaurantData[0].rating}></StarRating>
                                    </>
                                )}
                            </li>
                        </ul>
                        <div className="flex textBox">
                            <div>
                                <IconWish className={"active"}>좋아요</IconWish> 123
                            </div>
                            <div>
                                <i className="iconBasic iconView">view</i> {views}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <Title className={"titleComment"}>댓글</Title>
                <CommentWrite onSubmit={handleInsertComment} />
                {comment.length === 0 ? (
                    <p>댓글이 없습니다🥲</p>
                ) : (
                    comment.map((item, idx) => (
                        <MpCommentList comment={item} key={idx} deleteComment={deleteComment} />
                    ))
                )}
            </div>
        </SectionWrap>
    );
}

export default MeetingView;