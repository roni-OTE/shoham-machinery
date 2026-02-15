import StatsCard from "@/components/dashboard/StatsCard";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";

export default async function DashboardPage() {
  // TODO: Fetch real data from API
  const stats = {
    todayCalls: 12,
    weekCalls: 47,
    activeTechnicians: 5,
    pendingCalls: 8,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">סקירה כללית</h1>
        <p className="text-gray-600 mt-1">ברוכים הבאים למערכת ניהול קריאות השירות</p>
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
