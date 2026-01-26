import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP Forms",
  description: "A comprehensive ERP form management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-slate-100`}>
        {children}
      </body>
    </html>
  )
}