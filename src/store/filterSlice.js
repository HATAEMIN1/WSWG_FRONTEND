import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mateType: "연인",
    foodType: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setMateType: (state, action) => {
            state.mateType = action.payload;
        },
        toggleFoodType: (state, action) => {
            const foodType = action.payload;
            if (state.foodType.includes(foodType)) {
                state.foodType = state.foodType.filter(
                    (type) => type !== foodType
                );
            } else {
                state.foodType.push(foodType);
            }
        },
    },
});
export const { setMateType, toggleFoodType } = filterSlice.actions;
export default filterSlice.reducer;
