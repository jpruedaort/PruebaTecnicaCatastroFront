import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idPredio: 0,
};

export const predValSlice = createSlice({
  name: "predioVal",
  initialState,
  reducers: {
    changeVal: (state, action) => {
      state.idPredio = action.payload;
    },
  },
});

export const { changeVal } = predValSlice.actions;

export default predValSlice.reducer;
