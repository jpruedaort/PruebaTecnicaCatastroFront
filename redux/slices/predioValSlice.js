import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idPredio: 0,
  idconstru: 0,
  idTerreno: 0,
};

export const predValSlice = createSlice({
  name: "predioVal",
  initialState,
  reducers: {
    changeVal: (state, action) => {
      state.idPredio = action.payload;
    },
    changeConstruVal: (state, action) => {
      state.idconstru = action.payload;
    },
    changeTerrenoVal: (state, action) => {
      state.idTerreno = action.payload;
    },
  },
});

export const { changeVal, changeConstruVal, changeTerrenoVal } =
  predValSlice.actions;

export default predValSlice.reducer;
