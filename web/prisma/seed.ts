import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.photo.deleteMany();
  await prisma.materialUsage.deleteMany();
  await prisma.workHour.deleteMany();
  await prisma.serviceCall.deleteMany();
  await prisma.material.deleteMany();
  await prisma.site.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Cleared existing data");

  // Create Users (Note: Clerk IDs should be replaced with real ones after Clerk setup)
  const manager = await prisma.user.create({
    data: {
      clerkId: "user_manager_demo",
      email: "manager@shoham.com",
      name: "אבי מנהל",
      phone: "050-1234567",
      role: "MANAGER",
    },
  });

  const tech1 = await prisma.user.create({
    data: {
      clerkId: "user_tech1_demo",
      email: "yosi@shoham.com",
      name: "יוסי כהן",
      phone: "050-1111111",
      role: "TECHNICIAN",
    },
  });

  const tech2 = await prisma.user.create({
    data: {
      clerkId: "user_tech2_demo",
      email: "moshe@shoham.com",
      name: "משה לוי",
      phone: "050-2222222",
      role: "TECHNICIAN",
    },
  });

  const tech3 = await prisma.user.create({
    data: {
      clerkId: "user_tech3_demo",
      email: "david@shoham.com",
      name: "דוד אברהם",
      phone: "050-3333333",
      role: "TECHNICIAN",
    },
  });

  console.log("✅ Created users");

  // Create Materials
  const materials = await Promise.all([
    prisma.material.create({ data: { name: "קוטל מזיקים A", unit: "ליטר" } }),
    prisma.material.create({ data: { name: "קוטל מזיקים B", unit: "ליטר" } }),
    prisma.material.create({ data: { name: "פתיונות", unit: "יחידה" } }),
    prisma.material.create({ data: { name: "תרסיס", unit: "ליטר" } }),
    prisma.material.create({ data: { name: "אבקה", unit: "קילו" } }),
  ]);

  console.log("✅ Created materials");

  // Create Customers & Sites
  const customer1 = await prisma.customer.create({
    data: {
      name: "מלון דן תל אביב",
      phone: "03-5205205",
      email: "info@danhotels.com",
      address: "רחוב הירקון 99, תל אביב",
      sites: {
        create: [
          { name: "קומה 1 - מסעדה", address: "קומה 1" },
          { name: "קומה 5 - חדרים", address: "קומה 5" },
        ],
      },
    },
    include: { sites: true },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "בית חולים איכילוב",
      phone: "03-6974444",
      email: "info@tlvmc.gov.il",
      address: "רחוב וייצמן 6, תל אביב",
      sites: {
        create: [
          { name: "מחלקה A", address: "בניין ראשי" },
          { name: "מטבח מרכזי", address: "קומה -1" },
        ],
      },
    },
    include: { sites: true },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: "קניון עזריאלי",
      phone: "03-6081179",
      email: "info@azrieli.com",
      address: "מנחם בגין 132, תל אביב",
      sites: {
        create: [
          { name: "קומת קרקע", address: "קומה 0" },
          { name: "חניון תת קרקעי", address: "קומה -2" },
        ],
      },
    },
    include: { sites: true },
  });

  console.log("✅ Created customers and sites");

  // Create Service Calls
  const call1 = await prisma.serviceCall.create({
    data: {
      callNumber: "SC-2024-001",
      date: new Date("2024-02-15T08:00:00"),
      status: "COMPLETED",
      technicianId: tech1.id,
      customerId: customer1.id,
      siteId: customer1.sites[0].id,
      treatmentTypes: ["טיפול שוטף", "הדברת מזיקים"],
      notes: "בוצע טיפול מלא במסעדה. זוהו עקבות של מזיקים בפינה הדרומית.",
      completedAt: new Date("2024-02-15T11:30:00"),
      workHours: {
        create: {
          technicianId: tech1.id,
          startTime: new Date("2024-02-15T08:00:00"),
          endTime: new Date("2024-02-15T11:30:00"),
          totalMinutes: 210,
        },
      },
      materials: {
        create: [
          { materialId: materials[0].id, quantity: 2.5 },
          { materialId: materials[2].id, quantity: 10 },
        ],
      },
    },
  });

  const call2 = await prisma.serviceCall.create({
    data: {
      callNumber: "SC-2024-002",
      date: new Date("2024-02-15T09:00:00"),
      status: "IN_PROGRESS",
      technicianId: tech2.id,
      customerId: customer2.id,
      siteId: customer2.sites[1].id,
      treatmentTypes: ["טיפול דחוף", "הדברת מזיקים"],
      notes: "דיווח על מזיקים במטבח - בטיפול",
      workHours: {
        create: {
          technicianId: tech2.id,
          startTime: new Date("2024-02-15T09:00:00"),
          // endTime null - still in progress
        },
      },
      materials: {
        create: [
          { materialId: materials[1].id, quantity: 1.5 },
          { materialId: materials[3].id, quantity: 3 },
        ],
      },
    },
  });

  const call3 = await prisma.serviceCall.create({
    data: {
      callNumber: "SC-2024-003",
      date: new Date("2024-02-15T13:00:00"),
      status: "PENDING",
      technicianId: tech3.id,
      customerId: customer3.id,
      siteId: customer3.sites[0].id,
      treatmentTypes: ["בדיקה שוטפת"],
      notes: "בדיקה חודשית מתוכננת",
    },
  });

  const call4 = await prisma.serviceCall.create({
    data: {
      callNumber: "SC-2024-004",
      date: new Date("2024-02-14T10:00:00"),
      status: "COMPLETED",
      technicianId: tech1.id,
      customerId: customer2.id,
      siteId: customer2.sites[0].id,
      treatmentTypes: ["טיפול שוטף"],
      notes: "טיפול במחלקה A - הושלם בהצלחה",
      completedAt: new Date("2024-02-14T12:00:00"),
      workHours: {
        create: {
          technicianId: tech1.id,
          startTime: new Date("2024-02-14T10:00:00"),
          endTime: new Date("2024-02-14T12:00:00"),
          totalMinutes: 120,
        },
      },
      materials: {
        create: [
          { materialId: materials[0].id, quantity: 1 },
          { materialId: materials[4].id, quantity: 0.5 },
        ],
      },
    },
  });

  const call5 = await prisma.serviceCall.create({
    data: {
      callNumber: "SC-2024-005",
      date: new Date("2024-02-13T14:00:00"),
      status: "COMPLETED",
      technicianId: tech2.id,
      customerId: customer1.id,
      siteId: customer1.sites[1].id,
      treatmentTypes: ["טיפול מונע"],
      notes: "טיפול מונע בקומה 5 - חדרים",
      completedAt: new Date("2024-02-13T16:30:00"),
      workHours: {
        create: {
          technicianId: tech2.id,
          startTime: new Date("2024-02-13T14:00:00"),
          endTime: new Date("2024-02-13T16:30:00"),
          totalMinutes: 150,
        },
      },
      materials: {
        create: [
          { materialId: materials[2].id, quantity: 20 },
        ],
      },
    },
  });

  console.log("✅ Created service calls");

  console.log("\n🎉 Seed completed successfully!");
  console.log(`\nCreated:
  - ${4} Users (1 Manager, 3 Technicians)
  - ${materials.length} Materials
  - ${3} Customers with ${6} Sites
  - ${5} Service Calls
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
