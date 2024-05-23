import React from "react";
import Title from "../Layout/Title";
import { Button } from "../Form/Button";
import { useDispatch, useSelector } from "react-redux";
import { setMateType, toggleFoodType } from "../../store/filterSlice";

function FilterModal(...props) {
    const mateType = [
        "연인과",
        "친구와",
        "가족과",
        "단체모임",
        "반려동물과",
        "혼자",
    ];
    const foodType = ["한식", "양식", "중식", "일식", "디저트"];
    const dispatch = useDispatch();
    const filterState = useSelector((state) => state.filter);
    const handleMateType = (e) => {
        const valueWithoutSuffix = e.target.value.replace(/과|와/g, "");
        dispatch(setMateType(valueWithoutSuffix));
    };
    const handleFoodType = (e) => {
        dispatch(toggleFoodType(e.target.value));
    };
    return (
        <>
            <div
                className="m-auto bg-white min-h-[100px] rounded-[1.25em] p-[30px]"
                {...props}
            >
                <div className="mb-3">
                    <div className="flex flex-wrap gap-5">
                        <Title className={"titleComment"}>
                            누구랑 갈지 정해볼까?
                        </Title>
                        <ul className="flex flex-wrap grid-cols-3 gap-2 filterRadioButton">
                            {mateType.map((item, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="mateType"
                                            value={item}
                                            checked={
                                                filterState.mateType ===
                                                item.replace(/과|와/g, "")
                                            }
                                            onChange={handleMateType}
                                        />
                                        <span>
                                            <i className="iconBasic iconCheck">
                                                check
                                            </i>{" "}
                                            {item} 가볼까?
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <Title className={"titleComment"}>
                            음식 스타일을 정해볼까?
                        </Title>
                        <ul className="flex filterCheckButton gap-2">
                            {foodType.map((item, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="foodType"
                                            value={item}
                                            checked={filterState.foodType.includes(
                                                item
                                            )}
                                            onChange={handleFoodType}
                                        />
                                        <span>#{item}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Button basicButton={true}>확인</Button>
            </div>
        </>
    );
}
export default FilterModal;
