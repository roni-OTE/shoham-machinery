"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ServiceCallPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "2024-02-15",
    customer: "מלון תל אביב",
    site: "בית חולים איכילוב",
    technician: "יוסף כהן",
    treatments: [] as string[],
    materials: [{ name: "", quantity: "" }],
    workHours: { start: "08:00", end: "12:00" },
    notes: "",
    status: "בטיפול",
  });

  const treatmentOptions = [
    "הדברת מזיקים",
    "טיפול כימי",
    "התקנת מלכודות",
    "ניקוי ועיקור",
    "בדיקת מערכות",
  ];

  const handleTreatmentToggle = (treatment: string) => {
    setFormData((prev) => ({
      ...prev,
      treatments: prev.treatments.includes(treatment)
        ? prev.treatments.filter((t) => t !== treatment)
        : [...prev.treatments, treatment],
    }));
  };

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, { name: "", quantity: "" }],
    }));
  };

  const updateMaterial = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      ),
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("קריאת שירות נשמרה בהצלחה! (זו הדגמה בלבד)");
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">קריאת שירות #{params.id}</h1>
          <p className="text-gray-600 mt-1">עדכון פרטי קריאת שירות</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          ← חזרה
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* פרטי קריאה */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">פרטי קריאה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                תאריך
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                סטטוס
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ממתין">ממתין</option>
                <option value="בטיפול">בטיפול</option>
                <option value="הושלם">הושלם</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                לקוח
              </label>
              <input
                type="text"
                value={formData.customer}
                onChange={(e) =>
                  setFormData({ ...formData, customer: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                אתר
              </label>
              <input
                type="text"
                value={formData.site}
                onChange={(e) =>
                  setFormData({ ...formData, site: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                טכנאי
              </label>
              <input
                type="text"
                value={formData.technician}
                onChange={(e) =>
                  setFormData({ ...formData, technician: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
            </div>
          </div>
        </div>

        {/* סוגי טיפול */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">סוגי טיפול</h2>
          <div className="space-y-2">
            {treatmentOptions.map((treatment) => (
              <label
                key={treatment}
                className="flex items-center space-x-3 space-x-reverse cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.treatments.includes(treatment)}
                  onChange={() => handleTreatmentToggle(treatment)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{treatment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* חומרים */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">חומרים בשימוש</h2>
            <button
              type="button"
              onClick={addMaterial}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + הוסף חומר
            </button>
          </div>
          <div className="space-y-3">
            {formData.materials.map((material, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  placeholder="שם החומר"
                  value={material.name}
                  onChange={(e) =>
                    updateMaterial(index, "name", e.target.value)
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="כמות"
                  value={material.quantity}
                  onChange={(e) =>
                    updateMaterial(index, "quantity", e.target.value)
                  }
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.materials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* שעות עבודה */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">שעות עבודה</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שעת התחלה
              </label>
              <input
                type="time"
                value={formData.workHours.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workHours: { ...formData.workHours, start: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                שעת סיום
              </label>
              <input
                type="time"
                value={formData.workHours.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workHours: { ...formData.workHours, end: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* תמונות */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">תמונות</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-500">
              <span className="text-4xl">📷</span>
              <p className="mt-2">לחץ או גרור תמונות לכאן</p>
              <p className="text-sm mt-1">(תכונה זו תהיה זמינה בקרוב)</p>
            </div>
          </div>
        </div>

        {/* הערות */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">הערות</h2>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            placeholder="הוסף הערות נוספות..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* כפתורי פעולה */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            שמור שינויים
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
}
