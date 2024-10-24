import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: String,
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    expenses: [expenseSchema],
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Income;
