import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { ZodAuthSchema } from "@/lib/zod-schemas/schema";
import axios from "axios";
// import axios from "@/config/axios.config"; s

async function handleLogin(values: z.infer<typeof ZodAuthSchema>) {
  const { data } = await axios.post("/api/login", values);
  return data;
}

export function useLogin() {
  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Signed in successfully.");
      window.location.href = "/dashboard"; 
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error logging in!");
    },
  });
}
