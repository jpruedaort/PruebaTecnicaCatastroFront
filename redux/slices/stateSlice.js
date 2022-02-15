import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPredio: false,
  createTerreno: false,
  createConstruccion: false,
  createPropietario: false,
  editarTerreno: false,
  editarConstruccion: false,
  viewConstruccion: false,
  viewTerreno: false,
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
    toogleEditarConstruccion: (state) => {
      state.editarConstruccion = !state.editarConstruccion;
    },
    toogleViewTerreno: (state) => {
      state.viewTerreno = !state.viewTerreno;
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
  toogleEditarConstruccion,
  toogleViewTerreno,
} = allStatesSlice.actions;

export default allStatesSlice.reducer;
