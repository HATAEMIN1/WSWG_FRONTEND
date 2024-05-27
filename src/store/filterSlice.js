import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mateType: '연인', // 기본 mateType 값 설정
    foodType: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setMateType(state, action) {
            state.mateType = action.payload;
        },
        setFoodType(state, action) {
            state.foodType = action.payload;
        },
        toggleFoodType(state) {
            // foodType을 토글하는 로직을 추가합니다.
            state.foodType = state.foodType === 'type1' ? 'type2' : 'type1';
        }
    },
});

export const { setMateType, setFoodType, toggleFoodType } = filterSlice.actions;
export default filterSlice.reducer;
