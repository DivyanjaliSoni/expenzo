import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Expense from "@/models/expenseModel";

export async function POST(req:NextRequest) {
  try {
    const { id } = await req.json()
    await connect();
    const expense = await Expense.find({user:id}).populate('budget');

    return NextResponse.json(
      { message: "expense fetched", expense },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching expense:", error);
    return NextResponse.json(
      { message: "Error fetching expense" },
      { status: 500 }
    );
  }
}
