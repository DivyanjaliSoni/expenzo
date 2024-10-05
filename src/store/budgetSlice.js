import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    items: [],
  },
  reducers: {
    addBudget: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
