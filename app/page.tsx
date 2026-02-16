import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";

// Force dynamic rendering to avoid DB queries during build
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let user = null;

  try {
    user = await getCurrentUser();
  } catch (error) {
    console.log("DB not connected yet, showing default dashboard");
  }

  // If not logged in with Clerk, redirect to login
  if (user === null) {
    // Show default dashboard for now (demo mode)
    const stats = {
      todayCalls: 12,
      weekCalls: 47,
      activeTechnicians: 5,
      pendingCalls: 8,
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">סקירה כללית</h1>
            <p className="text-gray-600 mt-1">ברוכים הבאים למערכת ניהול קריאות השירות</p>
          </div>
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            🔐 כניסה למערכת
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="קריאות היום"
            value={stats.todayCalls}
            icon="📞"
            trend="+12%"
            trendUp
          />
          <StatsCard
            title="קריאות השבוע"
            value={stats.weekCalls}
            icon="📅"
            trend="+8%"
            trendUp
          />
          <StatsCard
            title="טכנאים פעילים"
            value={stats.activeTechnicians}
            icon="👷"
          />
          <StatsCard
            title="קריאות פתוחות"
            value={stats.pendingCalls}
            icon="⏳"
            trend="-5%"
            trendUp={false}
          />
        </div>

        {/* Recent Calls */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">קריאות אחרונות</h2>
          <RecentCallsTable />
        </div>
      </div>
    );
  }

  // Role-based routing (when DB is connected)
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
