import { z } from "zod";

export const ZodAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const ZodProfileSchema = z.object({
  name: z.string().min(3).max(20),
});

export const ZodCustomerSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .union([z.string().length(0), z.string().min(7)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});

export const ZodCustomerSchemaWithPassword = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
  gender: z.string().optional(),
  phone: z
    .string()
    .refine((value) => /^(?:\d{10})?$/.test(value), {
      message: "Invalid phone number format. Please enter a 10-digit number.",
    })
    .optional(),
});

export const ZodAdminSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .union([z.string().length(0), z.string().min(7)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  role: z.enum(["ADMIN", "GUEST"]),
});

export const ZodAdminSchemaWithPassword = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password must be 8 or more characters long"),
  role: z.enum(["ADMIN", "GUEST"]),
});

export const ZodProductSchema = z.object({
  title: z
    .string()
    .min(5, "Value must be 5 or more characters long")
    .max(100, "Value must be less than 100 characters long"),
  slug: z
    .string()
    .min(5, "Value must be 5 or more characters long")
    .max(100, "Value must be less than 100 characters long"),
  shortDescription: z
    .string()
    .max(150, "Value must be less than 150 characters long")
    .optional(),
  description: z
    .string()
    .min(10, "Value must be 10 or more characters long")
    .max(1000, "Value must be less than 1000 characters long"),

  categoryId: z
    .preprocess((val) => Number(val), z.number().int().positive("Invalid category id")),

  basePrice: z.preprocess((val) => Number(val), z.number().int().min(0, "Base price cannot be negative")),

  offerPrice: z.preprocess((val) => Number(val), z.number().int().min(0, "Offer price cannot be negative")),

  stock: z.preprocess(
    (val) => (val === null || val === undefined ? 0 : Number(val)), 
    z.number().int().min(0, "Stock must be a positive integer")
  ),
  

  colors: z
    .object({
      color: z.string(),
      thumbnail: z.string(),
      others: z.string().array(),
    })
    .array(),

  variantName: z.string().optional(),
  variantValues: z.string().optional(),

  keywords: z
    .string()
    .refine(
      (data) => {
        const values = data.split(",").map((value) => value.trim());
        return values.length <= 10;
      },
      {
        message: "Maximum 10 keywords!",
      }
    ),
});




// export const ZodProductSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Value must be 5 or more characters long")
//     .max(100, "Value must be less than 100 characters long"),

//   slug: z
//     .string()
//     .min(5, "Value must be 5 or more characters long")
//     .max(100, "Value must be less than 100 characters long"),

//   shortDescription: z
//     .string()
//     .max(150, "Value must be less than 150 characters long")
//     .optional(),

//   description: z
//     .string()
//     .min(10, "Value must be 10 or more characters long")
//     .max(1000, "Value must be less than 1000 characters long"),

//   // categoryId is a string and should be validated as a valid string ID
//   categoryId: z
//     .string()
//     .refine((value) => /^\d+$/.test(value), { message: "Invalid category ID" }),

//   basePrice: z
//     .number()
//     .int("Base price must be an integer")
//     .min(1, "Enter a valid base price"),

//   offerPrice: z
//     .number()
//     .int("Offer price must be an integer")
//     .min(1, "Enter a valid offer price"),

//   stock: z
//     .number()
//     .int("Stock must be an integer")
//     .min(0, "Enter a valid stock number"),

//   color: z.string().optional(),

//   variantName: z.string().optional(),

//   variantValues: z.string().optional(),

//   purchases: z
//     .number()
//     .int("Purchases must be an integer")
//     .default(0),

//   earnings: z
//     .number()
//     .int("Earnings must be an integer")
//     .default(0),

  
//   keywords: z
//     .string()
//     .refine((data) => {
//       const values = data.split(",").map((value) => value.trim());
//       return values.length <= 10;
//     }, { message: "Maximum 10 keywords!" }),

  
//   colors: z
//     .object({
//       color: z.string(),
//       thumbnail: z.string(),
//       others: z.string().array(),
//     })
//     .array(),

  
// });


export const ZodCategorySchema = z.object({
  category: z.string(),
  parentId: z.string().optional()
});

export const ZodBestDealSchema = z.object({
  title: z.string(),
  id: z.string().length(25, "Invalid product ID"),
  slug: z.string(),
  description: z
    .string()
    .max(100, "Value must be less than 100 characters long"),
  price: z.string(),
});

export const ZodMarqueeOfferSchema = z.object({
  title: z
    .string()
    .min(3, "Value must be 3 or more characters long")
    .max(70, "Value must be less than 70 characters long"),
  url: z.string(),
});

export const ZodHeroBannerSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z
    .string()
    .max(100, "Value must be less than 100 characters long"),
  basePrice: z.string(),
  offerPrice: z.string(),
});




// id               String      @id @default(cuid())
//   slug             String
//   title            String
//   description      String
//   categoryId       Int
//   basePrice        Float
//   offerPrice       Float
//   stock            Int
//   color            String?
//   variantName      String?
//   variantValues    String?
//   createdAt        DateTime    @default(now())
//   shortDescription String?
//   purchases        Int         @default(0)
//   keywords         String[]
//   earnings         Float       @default(0)
//   CartItem         CartItem[]
//   Image            Image[]
//   OrderItem        OrderItem[]
//   Category         Category    @relation(fields: [categoryId], references: [id])

// model Category {
//   id       Int        @id @default(autoincrement())
//   name     String
//   parentId Int?
//   parent   Category?  @relation("Category", fields: [parentId], references: [id])
//   Category Category[] @relation("Category")
//   Product  Product[]
// }
// model Image {
//   id            Int     @id @default(autoincrement())
//   imagePublicId String
//   productId     String
//   Product       Product @relation(fields: [productId], references: [id], onDelete: Cascade)

//   @@unique([productId, id])
// }