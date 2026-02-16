import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function TechnicianDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // TODO: Fetch real service calls assigned to this technician
  const calls = [
    {
      id: "1",
      callNumber: "SC-2024-001",
      date: "2024-02-15",
      customer: "מלון דן תל אביב",
      site: "קומה 3",
      status: "pending",
    },
    {
      id: "2",
      callNumber: "SC-2024-002",
      date: "2024-02-15",
      customer: "בית חולים איכילוב",
      site: "מחלקת ילדים",
      status: "in_progress",
    },
    {
      id: "3",
      callNumber: "SC-2024-003",
      date: "2024-02-16",
      customer: "קניון עזריאלי",
      site: "חניון תת קרקעי",
      status: "pending",
    },
  ];

  const statusMap = {
    pending: { label: "ממתין", color: "bg-yellow-100 text-yellow-800" },
    in_progress: { label: "בטיפול", color: "bg-blue-100 text-blue-800" },
    completed: { label: "הושלם", color: "bg-green-100 text-green-800" },
  };

  const pendingCalls = calls.filter((c) => c.status === "pending").length;
  const inProgressCalls = calls.filter((c) => c.status === "in_progress").length;
  const todayCalls = calls.filter((c) => c.date === "2024-02-16").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">שלום {user.name}!</h1>
        <p className="text-gray-600 mt-1">הקריאות שלך להיום</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">קריאות ממתינות</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {pendingCalls}
              </p>
            </div>
            <span className="text-4xl">⏳</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">בטיפול</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {inProgressCalls}
              </p>
            </div>
            <span className="text-4xl">🔧</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">קריאות היום</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {todayCalls}
              </p>
            </div>
            <span className="text-4xl">📅</span>
          </div>
        </div>
      </div>

      {/* Calls List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">הקריאות שלי</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {calls.map((call) => {
            const status = statusMap[call.status as keyof typeof statusMap];
            return (
              <Link
                key={call.id}
                href={`/calls/${call.id}`}
                className="block p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">
                        {call.callNumber}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900">{call.customer}</p>
                      <p>{call.site}</p>
                      <p className="mt-1">📅 {call.date}</p>
                    </div>
                  </div>
                  <div className="mr-4">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
