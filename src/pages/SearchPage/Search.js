import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import StarRating from "../../components/Form/StarRating";
import { SectionWrap } from "../../components/Layout/Section";
import axiosInstance from "../../utils/axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search(props) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const tag = query.get("tag");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/review-posts/search?tag=${tag}`);
        setResults(res.data.reviews);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (tag) {
      fetchReviews();
    }
  }, [tag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionWrap>
      <div className="">[{tag}] 검색 결과</div>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
          {results.map((review, index) => (
            <div
              key={`reviewData-${index}`}
              className="flex gap-7 reviewListWrap"
            >
              <div className="flex-none imgWrap">
                <Link
                  to={`/mate/${review.restaurant}/review-post/${review._id}`}
                >
                  {review.images && review.images.length > 0 && (
                    <img
                      src={`${process.env.REACT_APP_NODE_SERVER_UPLOAD_URL}${review.images[0]}`}
                      alt={`Review ${index}`}
                    />
                  )}
                </Link>
              </div>
              <div className="flex flex-wrap items-center textWrap py-2">
                <div className="w-full">
                  <Link
                    to={`/mate/${review.restaurant}/review-post/${review._id}`}
                  >
                    <h3>{review.user?.name || "Unknown User"}</h3>
                  </Link>
                  <p>{review.content}</p>
                  <div className="flex">
                    <span className="flex-none">평점: </span>
                    <StarRating rating={review.rating}></StarRating>
                  </div>
                  <div className="hashBoxWrap">
                    {review.tags.map((tag, i) => (
                      <span key={i} className="hashBox">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>해당 단어의 검색 결과가 없습니다.</div>
      )}
    </SectionWrap>
  );
}

export default Search;
