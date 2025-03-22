"use client";

import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter(); 

  async function handleSignOut() {
    try {
      localStorage.removeItem("token"); 
      toast.success("Signed out successfully.");

      router.push("/"); 
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Button onClick={handleSignOut} color="primary">
      Sign out
    </Button>
  );
};

export default SignOutButton;

