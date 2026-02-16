"use client";

import Link from "next/link";

export default function RecentCallsTable() {
  // TODO: Fetch real data from API
  const calls = [
    {
      id: "1",
      callNumber: "SC-2024-001",
      date: "2024-02-15",
      customer: "מלון דן תל אביב",
      technician: "יוסי כהן",
      status: "completed",
    },
    {
      id: "2",
      callNumber: "SC-2024-002",
      date: "2024-02-15",
      customer: "בית חולים איכילוב",
      technician: "משה לוי",
      status: "in_progress",
    },
    {
      id: "3",
      callNumber: "SC-2024-003",
      date: "2024-02-15",
      customer: "קניון עזריאלי",
      technician: "דוד אברהם",
      status: "pending",
    },
  ];

  const statusMap = {
    pending: { label: "ממתין", color: "bg-yellow-100 text-yellow-800" },
    in_progress: { label: "בטיפול", color: "bg-blue-100 text-blue-800" },
    completed: { label: "הושלם", color: "bg-green-100 text-green-800" },
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              מספר קריאה
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              תאריך
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              לקוח
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              טכנאי
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              סטטוס
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              פעולות
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {calls.map((call) => {
            const status = statusMap[call.status as keyof typeof statusMap];
            return (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {call.callNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{call.date}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {call.customer}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {call.technician}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link href={`/calls/${call.id}`}>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      צפייה
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
