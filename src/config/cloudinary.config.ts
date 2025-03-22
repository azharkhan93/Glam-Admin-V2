import { v2 as cloudinary } from "cloudinary";
import { uid } from "uid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadImage = async (
  image: string,
  slug: string,
  color: string,
  filename: string,
) => {
  try {
    console.log("Uploading image:", image);
    const response = await cloudinary.uploader.upload(image, {
      folder: "products",
      public_id: `${slug}/${color.toLowerCase() === "default" ? "" : color}/${filename}`,
    });
    console.log("Cloudinary upload response:", response);
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
// export const uploadImage = (
//   image: string,
//   slug: string,
//   color: string,
//   filename: string,
// ) => {
//   return cloudinary.uploader.upload(image, {
//     folder: "products",
//     public_id: `${slug}/${
//       color.toLowerCase() === "default" ? "" : color
//     }/${filename}`,
//   });
// };

export const uploadBanner = (
  image: string,
  folder: "banner" | "hero-banner",
  name?: string,
) => {
  return cloudinary.uploader.upload(image, {
    folder,
    public_id: folder === "banner" ? "best-deal" : name,
  });
};

export { cloudinary };
