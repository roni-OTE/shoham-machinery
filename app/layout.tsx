import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
