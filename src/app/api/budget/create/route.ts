import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";

export async function POST(req: NextRequest) {
  connect();

  const { user, category, label, amount } = await req.json();

  try {
    const BudgetWithUser = await Budget.findOne({ category,user });
    if (BudgetWithUser) {
      console.log(BudgetWithUser)
      return NextResponse.json(
        { message: "Budget already created"},
        { status: 409 }
      );
    }
    const newBudget = new Budget({ user, category, label, amount } );
    await newBudget.save();
    return NextResponse.json(
      { message: "Budget record created", budget: newBudget },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating income record:", error);
    return NextResponse.json(
      { error: "Failed to create income record" },
      { status: 500 }
    );
  }
}
