import CustomToaster from "@/providers/customToastProvider";
import { SheetProvider } from "@/providers/sheetProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/queryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vaxplus",
  description: "A webapp admin for capstone project Vaxplus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <QueryProvider>
            <TooltipProvider>
              <SheetProvider />
              <CustomToaster />
              {children}
            </TooltipProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
