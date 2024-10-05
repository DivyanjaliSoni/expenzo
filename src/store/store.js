import { configureStore } from '@reduxjs/toolkit';
import IncomeReducer from './incomeSlice';
import BudgetReducer from './budgetSlice';
import ExpenseReducer from './expenseSlice';

export const store = configureStore({
  reducer: {
    income: IncomeReducer,
    budget: BudgetReducer,
    expense: ExpenseReducer,
  },
});
