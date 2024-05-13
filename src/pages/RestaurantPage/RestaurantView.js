import React from "react";
import ReviewList from "../ReviewPage/ReviewList";
import { SectionWrap } from "../../components/Layout/Section";
import Title from "../../components/Layout/Title";

function RestaurantView(props) {
    return (
        <SectionWrap>
            <form>
                <div>
                    <Title className={"titleComment"}>back</Title>
                </div>

                <div className="mb-5">
                    <div className="w-[960px] mb-2 flex overflow-hidden rounded-md">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/mate_friend.png`}
                        />
                    </div>

                    <div className="flex gap-5">
                        <div className="flex gap-5">
                            <div className="flex gap-1">
                                <i className="iconTypeStore iconStoreLoc" />
                                <p>가게 주소주소주소주소주소</p>
                            </div>
                            <div className="flex ">
                                <i className="iconTypeStore iconStoreTel" />
                                <p>012-345-6789</p>
                            </div>
                        </div>
                    </div>
                </div>
                <ReviewList />
            </form>
        </SectionWrap>
    );
}

export default RestaurantView;
