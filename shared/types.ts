// Shared TypeScript types for web and mobile

export type Role = "TECHNICIAN" | "MANAGER" | "ADMIN";

export type CallStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "SYNCED";

export type PhotoType = "BEFORE" | "DURING" | "AFTER";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  phone?: string;
  role: Role;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Site {
  id: string;
  name: string;
  address?: string;
  contactName?: string;
  contactPhone?: string;
  customerId: string;
  customer?: Customer;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ServiceCall {
  id: string;
  callNumber: string;
  date: Date | string;
  status: CallStatus;
  technicianId: string;
  technician?: User;
  customerId: string;
  customer?: Customer;
  siteId?: string;
  site?: Site;
  treatmentTypes: string[];
  notes?: string;
  workHours?: WorkHour[];
  materials?: MaterialUsage[];
  photos?: Photo[];
  isOfflineCreated: boolean;
  localId?: string;
  syncedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  completedAt?: Date | string;
}

export interface WorkHour {
  id: string;
  serviceCallId: string;
  technicianId: string;
  technician?: User;
  startTime: Date | string;
  endTime?: Date | string;
  totalMinutes?: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Material {
  id: string;
  name: string;
  unit: string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MaterialUsage {
  id: string;
  serviceCallId: string;
  materialId: string;
  material?: Material;
  quantity: number;
  notes?: string;
  createdAt: Date | string;
}

export interface Photo {
  id: string;
  serviceCallId: string;
  url: string;
  publicId: string;
  type: PhotoType;
  caption?: string;
  createdAt: Date | string;
}

// DTO Types for API requests/responses

export interface CreateServiceCallDTO {
  date: string;
  technicianId: string;
  customerId: string;
  siteId?: string;
  treatmentTypes: string[];
  notes?: string;
  localId?: string; // for offline sync
}

export interface UpdateServiceCallDTO {
  status?: CallStatus;
  treatmentTypes?: string[];
  notes?: string;
  completedAt?: string;
}

export interface CreateWorkHourDTO {
  serviceCallId: string;
  technicianId: string;
  startTime: string;
  endTime?: string;
  notes?: string;
}

export interface CreateMaterialUsageDTO {
  serviceCallId: string;
  materialId: string;
  quantity: number;
  notes?: string;
}

export interface UploadPhotoDTO {
  serviceCallId: string;
  type: PhotoType;
  caption?: string;
  base64?: string; // for mobile upload
  url?: string; // if already uploaded
  publicId?: string;
}

// Sync DTOs for offline sync

export interface SyncQueueItem {
  type: "CREATE_CALL" | "UPDATE_CALL" | "UPLOAD_PHOTO";
  localId: string;
  data: any;
  attempts: number;
  createdAt: Date | string;
}

export interface SyncRequest {
  serviceCalls?: CreateServiceCallDTO[];
  workHours?: CreateWorkHourDTO[];
  materials?: CreateMaterialUsageDTO[];
  photos?: UploadPhotoDTO[];
}

export interface SyncResponse {
  success: boolean;
  synced: {
    calls: number;
    photos: number;
    errors: number;
  };
  errors?: Array<{
    localId: string;
    error: string;
  }>;
}

// Report Types

export interface TechnicianReportData {
  technicianId: string;
  technicianName: string;
  totalCalls: number;
  completedCalls: number;
  pendingCalls: number;
  totalHours: number;
  avgCallDuration: number;
  materialsUsed: Array<{
    materialName: string;
    totalQuantity: number;
    unit: string;
  }>;
}

export interface CustomerReportData {
  customerId: string;
  customerName: string;
  totalCalls: number;
  sites: Array<{
    siteId: string;
    siteName: string;
    calls: number;
  }>;
  lastServiceDate?: Date | string;
}

export interface DashboardStats {
  todayCalls: number;
  weekCalls: number;
  activeTechnicians: number;
  pendingCalls: number;
  completedToday: number;
  inProgressCalls: number;
}
