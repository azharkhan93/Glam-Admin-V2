import { db } from "@/lib/prisma";
import {
  error400,
  error500,
  formateDate,
  success200,
} from "@/lib/utils";
import { ZodProductSchema } from "@/lib/zod-schemas/schema";
import { NextRequest } from "next/server";
import { z } from "zod";
import { ColorVariant } from "@/lib/types/types";
import { uid } from "uid";
import { uploadImage } from "@/config/cloudinary.config";

function extractColorAsString(colors: ColorVariant[]) {
  if (colors[0].color.toLowerCase() === "default") return null;
  return colors.map((item) => item.color).join(",");
}

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        Image: true,
        Category: {
          select: {
            name: true,
          },
        },
      },
    });
    

    return success200({
      products: products.map((product) => ({
        id: product.id,
        slug: product.slug,
        title: product.title,
        description: product.description,
        shortDescription: product.shortDescription,
        basePrice: product.basePrice,
        offerPrice: product.offerPrice,
        stock: product.stock,
        color: product.color,
        category: product.Category.name,
        categoryId: product.categoryId,
        image: product.Image.find((image) =>
          image.imagePublicId.endsWith("-thumb"),
        )?.imagePublicId,
        variantName: product.variantName,
        variantValues: product.variantValues,
        keywords: product.keywords,
        createdAt: formateDate(product.createdAt),
        
      })),
    });
  } catch (error) {
    return error500({});
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse JSON data from the request
    const data = await req.json();
    console.log("Received product data:", data);

   
    const promises = data.colors.flatMap((color: { others: string[]; color: string; thumbnail: string; }) => [
      ...color.others.map((otherImages: string) =>
        uploadImage(otherImages, data.slug, color.color, uid())
      ),
      uploadImage(color.thumbnail, data.slug, color.color, `${uid()}-thumb`),
    ]);
    const response = await Promise.all(promises);

    console.log("Upload responses:", response);

   


    const product = await db.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription === "" ? null : data.shortDescription,
        description: data.description,
        basePrice: Number(data.basePrice),
        offerPrice: Number(data.offerPrice),
        stock: Number(data.stock),
        categoryId: parseInt(data.categoryId),
        color: extractColorAsString(data.colors),
        variantName: data.variantName,
        
        variantValues: data.variantValues?.replace(/\s/g, ""),
        keywords: data.keywords.replace(/\s/g, "").split(","),
        Image: {
          createMany: {
            data: response.map((res) => ({ imagePublicId: res.public_id })),
          },
          
        },
      },
      include: {
        Image: true, 
      },
    });
    console.log("Created product:", product);
    return success200({ product });
  } catch (error) {
    console.error("Error creating product:", error);
    return error500({ product: null });
  }
}


// export async function POST(req: NextRequest) {
//   try {
//     const data: z.infer<typeof ZodProductSchema> = await req.json();
//     console.log("Received Data:", data);
    
//     if (!data) {
//       return error400("Invalid data format.", {});
//     }
    
//     const result = ZodProductSchema.safeParse(data);

//     if (!result.success) {
//       return error400("Invalid data format.", {});
//     }

//     const product = await db.product.create({
//       data: {
//         title: data.title,
//         slug: data.slug,
//         shortDescription: data.shortDescription || null,
//         description: data.description,
//         basePrice: data.basePrice,
//         offerPrice: data.offerPrice,
//         stock: data.stock,
//          color: extractColorAsString(data.colors),
//         variantName: data.variantName,
//         variantValues: data.variantValues?.replace(/\s/g, ""),
//         keywords: data.keywords.replace(/\s/g, "").split(","),
//       },
//     });

//     return success200({ product });
//   } catch (error) {
//     return error500({ product: null });
//   }
// }
