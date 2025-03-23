import { db } from "@/lib/prisma";
import { ZodAuthSchema } from "@/lib/zod-schemas/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
console.log("🔑 JWT Secret:", SECRET_KEY);

if (!SECRET_KEY) {
  throw new Error("❌ JWT_SECRET is missing from environment variables.");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Received login request:", body);

    // Validate input using Zod
    const result = ZodAuthSchema.safeParse(body);
    if (!result.success) {
      console.error("❌ Zod validation failed:", result.error);
      return new Response(JSON.stringify({ success: false, message: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { email, password } = result.data;
    console.log("📧 Checking email:", email);

    // Check if admin exists in the database
    const existingAdmin = await db.admin.findFirst();
    if (!existingAdmin) {
      console.log("❌ Admin not found, registering new admin...");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await db.admin.create({
        data: { email, password: hashedPassword },
      });

      const token = jwt.sign({ id: newAdmin.id, email: newAdmin.email }, SECRET_KEY || "");

      return new Response(
        JSON.stringify({ success: true, message: "Admin registered successfully", token }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if email matches
    if (existingAdmin.email !== email) {
      console.log("❌ Email mismatch");
      return new Response(JSON.stringify({ success: false, message: "Invalid email" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      console.log("❌ Incorrect password");
      return new Response(JSON.stringify({ success: false, message: "Invalid password" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: existingAdmin.id, email: existingAdmin.email }, SECRET_KEY || "");
    console.log("✅ Login successful!");

    return new Response(
      JSON.stringify({ success: true, message: "Login successful", token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("🔥 API error:", error);
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

