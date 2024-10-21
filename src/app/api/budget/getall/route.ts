import { NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";

export async function GET() {
  try {
    await connect();
    const budgets = await Budget.find();

    return NextResponse.json(
      { message: "All budgets fetched", budgets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { message: "Error fetching budgets" },
      { status: 500 }
    );
  }
}
