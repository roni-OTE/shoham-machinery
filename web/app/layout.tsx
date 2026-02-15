import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "שוהם מכונות ומבלטים - מערכת ניהול קריאות שירות",
  description: "מערכת דיגיטלית לניהול קריאות שירות ומעקב אחר טכנאי שטח",
};

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="he" dir="rtl">
        <body>
          {userId ? (
            <div className="min-h-screen flex bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-auto">{children}</main>
              </div>
            </div>
          ) : (
            children
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
