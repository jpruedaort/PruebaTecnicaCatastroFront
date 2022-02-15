import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../redux/slices/stateSlice";
import valReducer from "../redux/slices/predioValSlice";
import valConstReducer from "../redux/slices/construccionValSlice";

export const store = configureStore({
  reducer: {
    stateELE: stateReducer,
    predioVal: valReducer,
    construccionVal: valConstReducer,
  },
});
