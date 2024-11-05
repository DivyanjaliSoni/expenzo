import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";

export async function PATCH(req: NextRequest) {
  await connect();

  const { id, amount, category, label, user } = await req.json();

  try {
    const BudgetWithUser = await Budget.findOne({ _id: id,user });
    if (BudgetWithUser) {
      const updateFields: { amount: string; label: string; category: string } = {
        amount,label,category
      };
      await Budget.updateOne({ _id: id,user }, { $set: updateFields });
      return NextResponse.json({ message: "Budget updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error creating income record:", error);
    return NextResponse.json(
      { error: "Failed to create income record" },
      { status: 500 }
    );
  }
}
