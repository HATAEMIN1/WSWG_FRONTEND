import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Layout/Title";
import { SectionWrap } from "../../components/Layout/Section";
import { Button, ButtonWrap } from "../../components/Form/Button";

function ReviewList() {
    return (
        <SectionWrap>
            <form>
                <div className="w-full flex justify-between items-center">
                    <Title className={"titleComment"}>리뷰</Title>

                    <Button className={"lineSmallButton"}>
                        <i className="iconSmall iconWriter">writer</i> 나도
                        작성해 볼까
                    </Button>
                </div>
            </form>
        </SectionWrap>
    );
}

export default ReviewList;
