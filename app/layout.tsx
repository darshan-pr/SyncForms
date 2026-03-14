import type { Metadata } from "next";
import { poppins } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sync Forms",
  description: "A comprehensive form management system for streamlined data collection and administration",
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