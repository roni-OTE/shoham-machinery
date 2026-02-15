import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "שוהם מכונות ומבלטים - מערכת ניהול קריאות שירות",
  description: "מערכת דיגיטלית לניהול קריאות שירות ומעקב אחר טכנאי שטח",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="he" dir="rtl">
        <body>
          <DashboardLayout>{children}</DashboardLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
