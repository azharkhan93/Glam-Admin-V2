import type { Metadata } from "next";
import "./globals.css";
import NextUIProvider from "@/providers/nextui-provider";
import { Toaster } from "sonner";
// import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
// import AutoSignOutProvider from "@/providers/auto-signout-provider";
import { GlobalContextProvider } from "@/context/store";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Glam Squad Inventory",
  description: "Discover the Latest Salon Services: At Home!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100 font-poppins dark:bg-[#020817]">
        {/* <AuthProvider>
          <AutoSignOutProvider> */}
            <QueryProvider>
              <GlobalContextProvider>
                <NextUIProvider>{children}</NextUIProvider>
              </GlobalContextProvider>
            </QueryProvider>
          {/* </AutoSignOutProvider>
        </AuthProvider> */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
