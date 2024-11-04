import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
// import Budget from "@/models/budgetModel";

export async function POST(req: NextRequest) {
  connect();

  const reqbody = await req.json();
  console.log(reqbody);
  return NextResponse.json({ message: "Api is working" }, { status: 200 });

  //   try {
  //     const BudgetWithUser = await Budget.findOne({ category, user });
  //     if (BudgetWithUser) {
  //       const updateFields: { amount: any; label?: string } = { amount };
  //       if (label) {
  //         updateFields.label = label;
  //       }
  //       await Budget.updateOne({ category, user }, { $set: updateFields });
  //       return NextResponse.json({ message: "Budget updated" }, { status: 200 });
  //     } else {
  //       return NextResponse.json(
  //         { message: "Budget not found" },
  //         { status: 404 }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error creating income record:", error);
  //     return NextResponse.json(
  //       { error: "Failed to create income record" },
  //       { status: 500 }
  //     );
  //   }
}
