import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";


export async function POST(req: NextRequest) {
  const { budget, product, amount } = await req.json();
  try {
    await connect();
    const ExpenseWithUser = await Budget.findOne({ _id:budget });
    if (ExpenseWithUser) {
      await Budget.updateOne(
        { _id: budget}, 
        { $push: { expenses: { product, amount } } }
      );
      return NextResponse.json({ message: "Expense Updated",ExpenseWithUser }, { status: 200 });
    }
    return NextResponse.json({ message: "Error occured" }, { status: 501 });
  } catch (error) {
    console.error("Error creating Expense record:", error);
    return NextResponse.json(
      { error: "Failed to create Expense record" },
      { status: 500 }
    );
  }
}
