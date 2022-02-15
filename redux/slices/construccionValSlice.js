import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idConstruccion: 0,
  idTerreno: 0,
};

export const construValSlice = createSlice({
  name: "construccionVal",
  initialState,
  reducers: {
    changeValConstru: (state, action) => {
      state.idConstruccion = action.payload;
    },
    changeValTerreno: (state, action) => {
      state.idTerreno = action.payload;
    },
  },
});

export const { changeValConstru, changeValTerreno } = construValSlice.actions;

export default construValSlice.reducer;
