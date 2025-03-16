import axios from "@/config/axios.config";
import { ProductResProps } from "@/lib/types/types";
import { headers } from "next/headers";

export async function getProductServer(pid: string) {
  const { data } = await axios.get(`/api/products/${pid}`, {
   
  });

  return data as ProductResProps;
}
