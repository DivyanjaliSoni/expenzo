import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
