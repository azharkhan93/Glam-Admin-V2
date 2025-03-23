import { db } from "@/lib/prisma";
import { error400, error500, success200 } from "@/lib/utils";
import { ZodAuthSchema } from "@/lib/zod-schemas/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ZodAuthSchema.safeParse(body);

    if (!result.success) {
      return error500({});
    }

    const { email, password } = result.data;

  
    const existingAdmin = await db.admin.findFirst();

    if (!existingAdmin) {
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await db.admin.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

     
      const token = jwt.sign(
        { id: newAdmin.id, email: newAdmin.email },
        SECRET_KEY,
      );

      return success200({ message: "Admin registered successfully", token });
    }

    if (existingAdmin.email !== email) {
      return error500({});
    }

    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordValid) {
      return error500({});
    }

    const token = jwt.sign(
      { id: existingAdmin.id, email: existingAdmin.email },
      SECRET_KEY,
     
    );

    return success200({ message: "Login successful", token });
  } catch (error) {
    return error500({ message: "Error processing request." });
  }
}
