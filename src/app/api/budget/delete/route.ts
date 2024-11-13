import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";

export async function POST(req: NextRequest) {
  await connect();

  const { budgetId } = await req.json();

  try {
    const BudgetWithUser = await Budget.findOne({ _id: budgetId });
    if (BudgetWithUser) {
      await Budget.deleteOne({ _id: budgetId });
      const remainingBudgets = await Budget.find();
      return NextResponse.json(
        { message: "Budget deleted successfully",remainingBudgets },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json(
      { error: "Failed to delete budget" },
      { status: 500 }
    );
  }
}
