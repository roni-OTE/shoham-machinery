interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          {trend && (
            <div
              className={`text-sm mt-1 ${
                trendUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
