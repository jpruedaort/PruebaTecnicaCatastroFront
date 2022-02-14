import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPredio: false,
  createTerreno: false,
  createConstruccion: false,
  createPropietario: false,
  editarTerreno: false,
  viewConstruccion: false,
};

export const allStatesSlice = createSlice({
  name: "allStates",
  initialState,
  reducers: {
    tooglePredio: (state) => {
      state.createPredio = !state.createPredio;
    },
    toogleTerreno: (state) => {
      state.createTerreno = !state.createTerreno;
    },
    toogleConstruccion: (state) => {
      state.createConstruccion = !state.createConstruccion;
    },
    tooglePropietario: (state) => {
      state.createPropietario = !state.createPropietario;
    },
    toogleEditar: (state) => {
      state.editarTerreno = !state.editarTerreno;
    },
    toogleViewConstruccion: (state) => {
      state.viewConstruccion = !state.viewConstruccion;
    },
  },
});

export const {
  tooglePredio,
  toogleTerreno,
  toogleConstruccion,
  tooglePropietario,
  toogleEditar,
  toogleViewConstruccion,
} = allStatesSlice.actions;

export default allStatesSlice.reducer;
