"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/"); 
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedAuth;
