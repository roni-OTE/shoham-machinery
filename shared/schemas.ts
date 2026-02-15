import { z } from "zod";

// ============= ENUMS =============

export const RoleSchema = z.enum(["TECHNICIAN", "MANAGER", "ADMIN"]);

export const CallStatusSchema = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "SYNCED",
]);

export const PhotoTypeSchema = z.enum(["BEFORE", "DURING", "AFTER"]);

// ============= VALIDATION SCHEMAS =============

export const CreateServiceCallSchema = z.object({
  date: z.string().datetime(),
  technicianId: z.string().cuid(),
  customerId: z.string().cuid(),
  siteId: z.string().cuid().optional(),
  treatmentTypes: z.array(z.string()).min(1, "נדרש לפחות סוג טיפול אחד"),
  notes: z.string().optional(),
  localId: z.string().uuid().optional(),
});

export const UpdateServiceCallSchema = z.object({
  status: CallStatusSchema.optional(),
  treatmentTypes: z.array(z.string()).optional(),
  notes: z.string().optional(),
  completedAt: z.string().datetime().optional(),
});

export const CreateWorkHourSchema = z.object({
  serviceCallId: z.string().cuid(),
  technicianId: z.string().cuid(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const CreateMaterialUsageSchema = z.object({
  serviceCallId: z.string().cuid(),
  materialId: z.string().cuid(),
  quantity: z.number().positive("כמות חייבת להיות חיובית"),
  notes: z.string().optional(),
});

export const CreateCustomerSchema = z.object({
  name: z.string().min(2, "שם לקוח חייב להכיל לפחות 2 תווים"),
  phone: z.string().optional(),
  email: z.string().email("אימייל לא תקין").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export const CreateSiteSchema = z.object({
  name: z.string().min(2, "שם אתר חייב להכיל לפחות 2 תווים"),
  address: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  customerId: z.string().cuid(),
});

export const CreateMaterialSchema = z.object({
  name: z.string().min(2, "שם חומר חייב להכיל לפחות 2 תווים"),
  unit: z.string().min(1, "יחידת מידה היא שדה חובה"),
});

export const CreateUserSchema = z.object({
  clerkId: z.string().min(1, "Clerk ID הוא שדה חובה"),
  email: z.string().email("אימייל לא תקין"),
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  phone: z.string().optional(),
  role: RoleSchema.default("TECHNICIAN"),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים").optional(),
  phone: z.string().optional(),
  role: RoleSchema.optional(),
  isActive: z.boolean().optional(),
});

// ============= FILTER SCHEMAS =============

export const ServiceCallsFilterSchema = z.object({
  status: CallStatusSchema.optional(),
  technicianId: z.string().cuid().optional(),
  customerId: z.string().cuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export const ReportFilterSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  technicianId: z.string().cuid().optional(),
  customerId: z.string().cuid().optional(),
});

// ============= SYNC SCHEMAS =============

export const SyncRequestSchema = z.object({
  serviceCalls: z.array(CreateServiceCallSchema).optional(),
  workHours: z.array(CreateWorkHourSchema).optional(),
  materials: z.array(CreateMaterialUsageSchema).optional(),
  photos: z
    .array(
      z.object({
        serviceCallId: z.string().cuid(),
        type: PhotoTypeSchema,
        caption: z.string().optional(),
        base64: z.string().optional(),
        url: z.string().url().optional(),
        publicId: z.string().optional(),
      })
    )
    .optional(),
});

// ============= TYPE EXPORTS =============

export type CreateServiceCallInput = z.infer<typeof CreateServiceCallSchema>;
export type UpdateServiceCallInput = z.infer<typeof UpdateServiceCallSchema>;
export type CreateWorkHourInput = z.infer<typeof CreateWorkHourSchema>;
export type CreateMaterialUsageInput = z.infer<
  typeof CreateMaterialUsageSchema
>;
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>;
export type CreateSiteInput = z.infer<typeof CreateSiteSchema>;
export type CreateMaterialInput = z.infer<typeof CreateMaterialSchema>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type ServiceCallsFilterInput = z.infer<typeof ServiceCallsFilterSchema>;
export type ReportFilterInput = z.infer<typeof ReportFilterSchema>;
export type SyncRequestInput = z.infer<typeof SyncRequestSchema>;
