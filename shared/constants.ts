// Shared constants for web and mobile

// Treatment types (can be extended)
export const TREATMENT_TYPES = [
  "טיפול שוטף",
  "טיפול דחוף",
  "טיפול מונע",
  "בדיקה שוטפת",
  "הדברת מזיקים",
  "טיפול מיוחד",
] as const;

// Call status labels (Hebrew)
export const CALL_STATUS_LABELS = {
  PENDING: "ממתין",
  IN_PROGRESS: "בטיפול",
  COMPLETED: "הושלם",
  SYNCED: "סונכרן",
} as const;

// Call status colors
export const CALL_STATUS_COLORS = {
  PENDING: "#f59e0b",
  IN_PROGRESS: "#2563eb",
  COMPLETED: "#10b981",
  SYNCED: "#64748b",
} as const;

// Photo type labels (Hebrew)
export const PHOTO_TYPE_LABELS = {
  BEFORE: "לפני",
  DURING: "במהלך",
  AFTER: "אחרי",
} as const;

// Role labels (Hebrew)
export const ROLE_LABELS = {
  TECHNICIAN: "טכנאי",
  MANAGER: "מנהל",
  ADMIN: "מנהל מערכת",
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  DISPLAY_WITH_TIME: "dd/MM/yyyy HH:mm",
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  API: "yyyy-MM-dd",
} as const;

// API endpoints (relative to base URL)
export const API_ENDPOINTS = {
  // Auth
  AUTH_WEBHOOK: "/auth/webhook",

  // Users
  USERS: "/users",
  USER_BY_ID: (id: string) => `/users/${id}`,

  // Service Calls
  CALLS: "/calls",
  CALL_BY_ID: (id: string) => `/calls/${id}`,
  CALL_STATUS: (id: string) => `/calls/${id}/status`,
  CALL_PHOTOS: (id: string) => `/calls/${id}/photos`,

  // Customers & Sites
  CUSTOMERS: "/customers",
  CUSTOMER_BY_ID: (id: string) => `/customers/${id}`,
  CUSTOMER_SITES: (customerId: string) => `/customers/${customerId}/sites`,
  SITES: "/sites",
  SITE_BY_ID: (id: string) => `/sites/${id}`,

  // Materials
  MATERIALS: "/materials",
  MATERIAL_BY_ID: (id: string) => `/materials/${id}`,

  // Reports
  REPORTS_BY_TECHNICIAN: "/reports/by-technician",
  REPORTS_BY_CUSTOMER: "/reports/by-customer",
  REPORTS_SUMMARY: "/reports/summary",
  REPORTS_EXPORT: "/reports/export",

  // Sync
  SYNC: "/sync",
  SYNC_PULL: "/sync/pull",
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

// Offline sync settings
export const SYNC_SETTINGS = {
  MAX_RETRY_ATTEMPTS: 5,
  RETRY_DELAY_MS: 5000,
  AUTO_SYNC_INTERVAL_MS: 60000, // 1 minute
  MAX_OFFLINE_PHOTOS: 10,
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_PHOTO_SIZE_MB: 10,
  MAX_PHOTOS_PER_CALL: 20,
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png"] as const,
} as const;

// App info
export const APP_INFO = {
  NAME: "שוהם מכונות ומבלטים",
  VERSION: "0.1.0",
  DESCRIPTION: "מערכת ניהול קריאות שירות",
} as const;
