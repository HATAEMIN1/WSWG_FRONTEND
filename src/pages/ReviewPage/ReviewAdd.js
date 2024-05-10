import React from "react";
import { Link } from "react-router-dom";

function ReviewAdd(props) {
    return (
        <section>
            <h2>리뷰 등록/수정</h2>
            <form>
                <div>
                    <label htmlFor="title" className="block mb-7">
                        내용
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="내용을 등록하세요"
                    />
                </div>
                <div>
                    <Link to="/review-posts/:rpid">등록</Link>
                </div>
            </form>
        </section>
    );
}

export default ReviewAdd;
