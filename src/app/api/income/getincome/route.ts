import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import Income from "@/models/income";

export async function POST(req:NextRequest) {
  try {
    const { id } = await req.json()
    await connect();
    const income = await Income.find({user:id});

    return NextResponse.json(
      { message: "income fetched", income },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching income:", error);
    return NextResponse.json(
      { message: "Error fetching income" },
      { status: 500 }
    );
  }
}
