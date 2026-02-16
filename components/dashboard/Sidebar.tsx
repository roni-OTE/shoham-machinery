"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "סקירה כללית", href: "/", icon: "📊" },
  { name: "קריאות שירות", href: "/calls", icon: "📞" },
  { name: "טכנאים", href: "/technicians", icon: "👷" },
  { name: "לקוחות ואתרים", href: "/customers", icon: "🏢" },
  { name: "דוחות", href: "/reports", icon: "📈" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-l border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">שוהם מכונות ומבלטים</h2>
        <p className="text-sm text-gray-500 mt-1">מערכת ניהול</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          גרסה 0.1.0 (MVP)
        </div>
      </div>
    </aside>
  );
}
