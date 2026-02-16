"use client";

import { UserButton } from "@clerk/nextjs";

export default function TopBar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">לוח בקרה</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications - future feature */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
          </button>

          {/* User menu */}
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </header>
  );
}
