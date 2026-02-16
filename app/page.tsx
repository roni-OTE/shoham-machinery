import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  // If not logged in, redirect to login
  if (!user) {
    redirect("/login");
  }

  // Role-based routing
  if (user.role === "TECHNICIAN") {
    redirect("/technician");
  } else if (user.role === "MANAGER" || user.role === "ADMIN") {
    redirect("/manager");
  }

  // Fallback: show welcome message
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ברוכים הבאים למערכת ניהול קריאות השירות
        </h1>
        <p className="text-gray-600">
          נא לפנות למנהל המערכת לקבלת הרשאות גישה
        </p>
      </div>
    </div>
  );
}
