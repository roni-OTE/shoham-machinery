"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";

export default function ManagerDashboard() {
  const [viewMode, setViewMode] = useState<"manager" | "technician">("manager");

  const stats = {
    todayCalls: 12,
    weekCalls: 47,
    activeTechnicians: 5,
    pendingCalls: 8,
  };

  if (viewMode === "technician") {
    // Redirect to technician view
    window.location.href = "/technician";
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">לוח בקרה - מנהל</h1>
          <p className="text-gray-600 mt-1">סקירה כללית של כל הקריאות והטכנאים</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("manager")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "manager"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            תצוגת מנהל
          </button>
          <button
            onClick={() => setViewMode("technician")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === "technician"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            תצוגת טכנאי
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/manager/technicians"
          className="bg-blue-600 text-white rounded-lg shadow p-6 hover:bg-blue-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">👷</span>
            <div>
              <h3 className="font-semibold text-lg">ניהול טכנאים</h3>
              <p className="text-sm text-blue-100">הוספה, עריכה, צפייה בטכנאים</p>
            </div>
          </div>
        </Link>

        <Link
          href="/manager/calls/new"
          className="bg-green-600 text-white rounded-lg shadow p-6 hover:bg-green-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">➕</span>
            <div>
              <h3 className="font-semibold text-lg">קריאה חדשה</h3>
              <p className="text-sm text-green-100">צור קריאת שירות והקצה לטכנאי</p>
            </div>
          </div>
        </Link>

        <Link
          href="/manager/reports"
          className="bg-purple-600 text-white rounded-lg shadow p-6 hover:bg-purple-700 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <div>
              <h3 className="font-semibold text-lg">דוחות</h3>
              <p className="text-sm text-purple-100">צפייה בדוחות וסטטיסטיקות</p>
            </div>
          </div>
        </Link>
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
