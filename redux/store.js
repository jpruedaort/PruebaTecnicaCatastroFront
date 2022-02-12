import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../redux/slices/stateSlice";

export const store = configureStore({
  reducer: { stateELE: stateReducer },
});
