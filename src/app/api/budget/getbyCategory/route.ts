import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Budget from "@/models/budgetModel";

export async function POST(req:NextRequest) {
  try {
    const { id } = await req.json()
    await connect();
    const budget = await Budget.findOne({_id:id});

    return NextResponse.json(
      { message: "category fetched", budget },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { message: "Error fetching budget" },
      { status: 500 }
    );
  }
}
