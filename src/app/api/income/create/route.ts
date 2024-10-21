import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Income from "@/models/income";

export async function POST(req: NextRequest) {
  connect();

  const { user, source, amount } = await req.json();

  try {
    const IncomeWithUser = await Income.findOne({ user });
    if (IncomeWithUser) {
      await Income.updateOne(
        { user },
        { $set: { amount } }
      );
      return NextResponse.json(
        { message: "Income Updated" },
        { status: 200 }
      );
    }
    const newIncome = new Income({ user, source, amount });
    await newIncome.save();
    return NextResponse.json(
      { message: "Income record created", income: newIncome },
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
