// src/app/api/auth/signin/route.ts

import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Utility function to generate JWT token
const generateToken = (userId: string) => {
  const payload = { id: userId };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

// POST route handler
export async function POST(req: NextRequest) {
  connect(); // Ensure connection to the database

  try {
    const { email, password } = await req.json();
    console.log(email, password);

    let user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user._id.toString());
        return NextResponse.json(
          { message: "Login successful", user, token },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword });
      await user.save();

      const token = generateToken(user._id.toString());
      return NextResponse.json(
        { message: "User created", user, token },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
