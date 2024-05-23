import React from "react";
import styled from "styled-components";
import starBasic from "../../assets/images/iconStarList.png";
import starLine from "../../assets/images/iconStarLine.png";
import starActive from "../../assets/images/iconStarListActive.png";

const Star = styled.i`
    content: "";
    display: flex;
    width: 20px;
    height: 20px;
    background: url("${starBasic}");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 0;
    &.starline {
        background: url("${starLine}");
    }
    &.active {
        background: url("${starActive}");
    }
    ${({ active }) =>
        active &&
        `
        background: url("${starActive}");
    `}
`;

function StarRating(props) {
    const fullStars = Math.floor(props.rating);
    const remainder = (props.rating - fullStars) * 100;
    const ratingToPercent = {
        widths: [
            ...Array(fullStars).fill("20px"),
            remainder > 0 ? `${remainder * 0.2}px` : "0",
        ],
    };
    return (
        <div className="star_rating relative w-full">
            <div className="star_rating_fill flex absolute">
                {ratingToPercent.widths?.map((width, index) => (
                    <Star
                        key={`star-${index}`}
                        style={{ width: width }}
                        className={
                            index < fullStars ||
                            (index === fullStars && remainder > 0)
                                ? "active"
                                : ""
                        }
                    ></Star>
                ))}
            </div>
            <div className="star_rating_base flex ">
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
                <Star></Star>
            </div>
        </div>
    );
}

export default StarRating;
