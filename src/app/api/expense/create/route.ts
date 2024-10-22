import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  const { user, budget, product, amount } = await req.json();
  console.log(
    "user:",
    user,
    "budget",
    budget,
    "product",
    product,
    "amount",
    amount
  );

  try {
    await connect();

    const ExpenseWithUser = await Expense.findOne({ product });
    console.log(ExpenseWithUser);
    if (ExpenseWithUser) {
      await Expense.updateOne({ product }, { $set: { amount, budget } });
      return NextResponse.json({ message: "Expense Updated" }, { status: 200 });
    }
    const newExpense = new Expense({
      user: new mongoose.Types.ObjectId(user),
      budget: new mongoose.Types.ObjectId(budget),
      product,
      amount,
    });
    console.log(newExpense)
    // await newExpense.save();
    // return NextResponse.json(
    //   { message: "Expense record created" },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error creating Expense record:", error);
    return NextResponse.json(
      { error: "Failed to create Expense record" },
      { status: 500 }
    );
  }
}
