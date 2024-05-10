import React from "react";
import { Link } from "react-router-dom";

function ReviewList() {
    return (
        <>
            <div className="flex justify-between h-[50px]">
                <ul className="flex justify-center items-center px-5">
                    <li>
                        <Link to="/review-posts">나도작성해볼까</Link>
                    </li>
                </ul>
            </div>
            ;
        </>
    );
}

export default ReviewList;
