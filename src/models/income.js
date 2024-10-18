import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);

export default Income;
