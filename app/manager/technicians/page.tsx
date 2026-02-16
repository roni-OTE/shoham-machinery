"use client";

import { useState } from "react";
import Link from "next/link";

export default function TechniciansManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "TECHNICIAN",
  });

  // TODO: Fetch real technicians from API
  const technicians = [
    {
      id: "1",
      name: "יוסי כהן",
      email: "yossi@example.com",
      phone: "050-1234567",
      role: "TECHNICIAN",
      isActive: true,
      activeCalls: 3,
    },
    {
      id: "2",
      name: "משה לוי",
      email: "moshe@example.com",
      phone: "050-2345678",
      role: "TECHNICIAN",
      isActive: true,
      activeCalls: 2,
    },
    {
      id: "3",
      name: "דוד אברהם",
      email: "david@example.com",
      phone: "050-3456789",
      role: "TECHNICIAN",
      isActive: false,
      activeCalls: 0,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to API to create technician
    alert("טכנאי חדש נוסף בהצלחה! (זו הדגמה בלבד)");
    setShowAddForm(false);
    setFormData({ name: "", email: "", phone: "", role: "TECHNICIAN" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/manager"
              className="text-blue-600 hover:text-blue-800"
            >
              ← חזרה ללוח בקרה
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">ניהול טכנאים</h1>
          <p className="text-gray-600 mt-1">הוספה, עריכה וצפייה בטכנאים</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          {showAddForm ? "ביטול" : "+ הוסף טכנאי"}
        </button>
      </div>

      {/* Add Technician Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">הוסף טכנאי חדש</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  שם מלא
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  טלפון
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  תפקיד
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TECHNICIAN">טכנאי</option>
                  <option value="MANAGER">מנהל</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                שמור
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                ביטול
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">סך הכל טכנאים</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {technicians.length}
              </p>
            </div>
            <span className="text-4xl">👷</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">טכנאים פעילים</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {technicians.filter((t) => t.isActive).length}
              </p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">קריאות פעילות</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {technicians.reduce((sum, t) => sum + t.activeCalls, 0)}
              </p>
            </div>
            <span className="text-4xl">📞</span>
          </div>
        </div>
      </div>

      {/* Technicians Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  שם
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  אימייל
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  טלפון
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  תפקיד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  קריאות פעילות
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  פעולות
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {technicians.map((tech) => (
                <tr key={tech.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {tech.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tech.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {tech.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {tech.role === "TECHNICIAN" ? "טכנאי" : "מנהל"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {tech.activeCalls}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tech.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tech.isActive ? "פעיל" : "לא פעיל"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium ml-4">
                      ערוך
                    </button>
                    <button
                      className={`font-medium ${
                        tech.isActive
                          ? "text-red-600 hover:text-red-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                    >
                      {tech.isActive ? "השבת" : "הפעל"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
