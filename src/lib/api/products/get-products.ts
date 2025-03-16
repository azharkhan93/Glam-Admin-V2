import axios from "@/config/axios.config";
import { headers } from "next/headers";
import { ProductsResProps } from "../../types/types";

export async function getProductsServer() {

 
  const { data } = await axios.get("/api/products", {
  });

  return data as ProductsResProps;
}
