import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    source: '',
    amount: '',
  },
  reducers: {
    updateIncome: (state, action) => {
      const { source, amount } = action.payload;
      if (source !== undefined) {
        state.source = source;
      }
      if (amount !== undefined) {
        state.amount = amount;
      }
    },
    resetIncome: (state) => {
      state.source = '';
      state.amount = '';
    },
  },
});

export const { updateIncome, resetIncome } = incomeSlice.actions;

export default incomeSlice.reducer;