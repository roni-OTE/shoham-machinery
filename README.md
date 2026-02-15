# 🚀 Shoham Machinery & Equipment - Service Management System

מערכת ניהול קריאות שירות דיגיטלית לחברת שוהם מכונות ומבלטים.

## 📋 תוכן עניינים

- [סקירה כללית](#-סקירה-כללית)
- [תכונות מרכזיות](#-תכונות-מרכזיות)
- [סטאק טכנולוגי](#-סטאק-טכנולוגי)
- [מבנה הפרויקט](#-מבנה-הפרויקט)
- [התקנה והרצה](#-התקנה-והרצה)
- [הגדרות](#-הגדרות)
- [שימוש](#-שימוש)
- [פיתוח](#-פיתוח)
- [פריסה (Deployment)](#-פריסה-deployment)

---

## 🎯 סקירה כללית

המערכת מחליפה את התהליך הידני של מילוי טפסים על נייר בפתרון דיגיטלי מלא:

- **אפליקציית מובייל (iOS + Android)** - לטכנאי שטח, כולל תמיכה במצב Offline
- **דשבורד Web** - למנהלים, לניהול, מעקב ודוחות
- **מערכת הרשאות** - טכנאים רואים רק את הקריאות שלהם, מנהלים רואים הכל
- **סנכרון אוטומטי** - נתונים נשמרים מקומית ומסתנכרנים ברגע שחוזר אינטרנט

### נוצר למי?

- **טכנאי שטח** - ממלאים טפסים בשטח, עובדים גם ללא אינטרנט
- **מנהלים** - רואים מצב כלל הטכנאים, מקצים קריאות, מפיקים דוחות

---

## ✨ תכונות מרכזיות

### Mobile App (טכנאים)
- ✅ התחברות מאובטחת (Clerk)
- ✅ רשימת קריאות שירות של הטכנאי
- ✅ טופס מילוי קריאה עם כל השדות:
  - תאריך, לקוח, אתר
  - סוגי טיפולים (multi-select)
  - חומרים ורכיבים + כמויות
  - שעות עבודה (start/end)
  - תמונות (לפני/אחרי/במהלך)
  - הערות
- ✅ עבודה במצב Offline מלא
- ✅ סנכרון אוטומטי
- ✅ UI בעברית (RTL)

### Web Dashboard (מנהלים)
- ✅ התחברות מאובטחת
- ✅ סקירה כללית (Overview) עם סטטיסטיקות
- ✅ ניהול קריאות שירות (CRUD)
- ✅ הקצאת קריאות לטכנאים
- ✅ ניהול לקוחות ואתרים
- ✅ ניהול טכנאים
- ✅ מערכת דוחות:
  - דוח לפי טכנאי
  - דוח לפי לקוח
  - דוח סיכום כללי
  - ייצוא לאקסל
- ✅ UI בעברית (RTL)

### Backend & Database
- ✅ PostgreSQL + Prisma ORM
- ✅ RESTful API
- ✅ מערכת הרשאות (RBAC)
- ✅ Webhook של Clerk לסנכרון משתמשים
- ✅ סכמה מלאה: Users, ServiceCalls, Customers, Sites, Materials, WorkHours, Photos

---

## 🛠 סטאק טכנולוגי

### Frontend - Web
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **React Query** (TanStack Query)
- **Zustand** (state management)
- **React Hook Form** + **Zod**

### Frontend - Mobile
- **React Native** + **Expo** (SDK 52)
- **TypeScript**
- **React Native Paper** (Material Design 3)
- **Expo Router** (file-based routing)
- **React Query** (TanStack Query)
- **WatermelonDB** (offline database)
- **Expo SQLite**

### Backend
- **Next.js API Routes**
- **PostgreSQL** (database)
- **Prisma** (ORM)
- **Clerk** (authentication)
- **Cloudinary** (image storage)
- **Zod** (validation)

### DevOps
- **Vercel** (web hosting)
- **Vercel Postgres** or **Railway** (database)
- **Expo EAS Build** (mobile builds)
- **Git + GitHub** (version control)

---

## 📁 מבנה הפרויקט

```
shoham-machinery-service-management/
├── web/                      # Next.js Web Dashboard
│   ├── app/                  # App Router
│   │   ├── (auth)/          # Login
│   │   ├── (dashboard)/     # Dashboard pages
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── dashboard/       # Dashboard-specific
│   │   └── forms/           # Form components
│   ├── lib/                 # Utilities
│   │   ├── db.ts            # Prisma client
│   │   └── permissions.ts   # Authorization
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.ts          # Seed data
│   └── package.json
│
├── mobile/                  # React Native Mobile App
│   ├── app/                 # Expo Router
│   │   ├── (auth)/         # Login
│   │   ├── (tabs)/         # Bottom tabs
│   │   └── call/[id].tsx   # Call detail
│   ├── components/         # React Native components
│   ├── database/           # WatermelonDB setup
│   ├── lib/                # Utilities & API client
│   ├── hooks/              # Custom hooks
│   └── package.json
│
├── shared/                 # Shared code
│   ├── types.ts           # TypeScript types
│   ├── schemas.ts         # Zod schemas
│   ├── constants.ts       # Constants
│   └── index.ts
│
└── README.md              # This file
```

---

## 🚀 התקנה והרצה

### דרישות מקדימות

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud)
- **Git**
- **Expo Go app** (for mobile testing - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### שלב 1: Clone הפרויקט

```bash
git clone <repository-url>
cd shamir-milut-service-management
```

### שלב 2: התקנת Dependencies

#### Web Dashboard
```bash
cd web
npm install
```

#### Mobile App
```bash
cd mobile
npm install
```

### שלב 3: הגדרת Database

#### אפשרות 1: Local PostgreSQL
```bash
# התקנת PostgreSQL
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# יצירת database
createdb shoham_machinery

# עדכן DATABASE_URL בקובץ .env.local
```

#### אפשרות 2: Vercel Postgres (מומלץ)
1. היכנס ל-[Vercel](https://vercel.com)
2. צור פרויקט חדש
3. הוסף Storage → Postgres
4. העתק את ה-DATABASE_URL

#### אפשרות 3: Railway
1. היכנס ל-[Railway](https://railway.app)
2. צור פרויקט חדש → Add PostgreSQL
3. העתק את ה-DATABASE_URL

---

## ⚙️ הגדרות

### Web Dashboard (.env.local)

צור קובץ `web/.env.local`:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shoham_machinery"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Cloudinary (אופציונלי ל-MVP, אפשר לדלג)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Mobile App (.env)

צור קובץ `mobile/.env`:

```bash
# API
API_URL=http://localhost:3000/api

# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."

# Environment
EXPO_PUBLIC_ENV=development
```

---

## 🔑 הגדרת Clerk (Authentication)

### 1. צור חשבון Clerk
1. היכנס ל-[Clerk.com](https://clerk.com)
2. צור Application חדש
3. בחר Email/Password authentication

### 2. הגדרות Web
1. ב-Clerk Dashboard → API Keys
2. העתק את:
   - **Publishable key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY`

### 3. הגדרות Mobile
1. ב-Clerk Dashboard → Configure → Sessions
2. הוסף Custom Scheme: `shohammachinery://`
3. העתק **Publishable key** → `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`

### 4. הגדרת Webhook (אופציונלי)
1. ב-Clerk Dashboard → Webhooks
2. צור Endpoint: `https://your-domain.com/api/auth/webhook`
3. בחר Events: `user.created`, `user.updated`

---

## 🗄 הרצת Database

### 1. Generate Prisma Client
```bash
cd web
npm run db:generate
```

### 2. Push Schema (פיתוח)
```bash
npm run db:push
```

**או** הרץ Migrations (production):
```bash
npm run db:migrate
```

### 3. Seed Demo Data
```bash
npm run db:seed
```

הנתונים שנוספו:
- 4 משתמשים (1 מנהל, 3 טכנאים)
- 5 חומרים
- 3 לקוחות עם 6 אתרים
- 5 קריאות שירות לדוגמה

### 4. פתח Prisma Studio (אופציונלי)
```bash
npm run db:studio
```
פתח דפדפן: `http://localhost:5555`

---

## ▶️ הרצת האפליקציה

### Web Dashboard

```bash
cd web
npm run dev
```

פתח דפדפן: `http://localhost:3000`

**כניסה:**
- מנהל: `manager@shoham.com` / `Demo1234!`
- טכנאי: `tech1@shoham.com` / `Demo1234!`

> **שים לב:** המשתמשים האלו צריכים להיווצר ב-Clerk תחילה!

### Mobile App

```bash
cd mobile
npm start
```

תראה QR code:
- **iOS**: סרוק עם מצלמת iPhone
- **Android**: סרוק עם אפליקציית Expo Go

או הרץ ישירות:
```bash
npm run android   # Android emulator/device
npm run ios       # iOS simulator (Mac only)
```

---

## 🧪 שימוש (Testing המערכת)

### תרחיש 1: טכנאי ממלא קריאה (Online)
1. פתח אפליקציית Mobile
2. התחבר כטכנאי (`tech1@shoham.com`)
3. בחר קריאת שירות מהרשימה
4. מלא את כל השדות:
   - תאריך
   - לקוח ואתר
   - סוגי טיפולים
   - חומרים + כמות
   - שעות (start/end)
   - תמונות
   - הערות
5. שלח
6. פתח Web Dashboard → קריאות שירות
7. ודא שהקריאה מופיעה

### תרחיש 2: טכנאי ממלא קריאה (Offline)
1. כבה WiFi/נתונים סלולריים
2. פתח אפליקציית Mobile
3. מלא קריאה חדשה
4. שלח → נשמר מקומית עם סימון "ממתין לסנכרון"
5. הפעל WiFi/נתונים
6. לחץ על כפתור סנכרון או חכה לסנכרון אוטומטי
7. ודא ב-Web Dashboard שהקריאה הופיעה

### תרחיש 3: מנהל מקצה קריאה
1. התחבר ל-Web Dashboard כמנהל
2. לקוחות ואתרים → צור לקוח חדש + אתר
3. קריאות שירות → קריאה חדשה
4. מלא פרטים והקצה לטכנאי
5. שמור
6. פתח Mobile App כטכנאי → ודא שהקריאה מופיעה

### תרחיש 4: הפקת דוח
1. התחבר ל-Web Dashboard כמנהל
2. דוחות
3. בחר סוג דוח: "לפי טכנאי"
4. בחר טווח תאריכים
5. הפק דוח
6. ודא נתונים (שעות, קריאות, חומרים)
7. ייצא לאקסל

---

## 👨‍💻 פיתוח

### הוספת API Endpoint חדש

**web/app/api/example/route.ts**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Your logic here
    const data = await db.serviceCall.findMany();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

### הוספת מסך חדש (Mobile)

**mobile/app/new-screen.tsx**:
```tsx
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">מסך חדש</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

### הוספת טבלה חדשה (Prisma)

1. ערוך `web/prisma/schema.prisma`:
```prisma
model NewTable {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())

  @@map("new_table")
}
```

2. הרץ migration:
```bash
npx prisma migrate dev --name add_new_table
```

3. Update seed (אם צריך):
```bash
npm run db:seed
```

---

## 🚀 פריסה (Deployment)

### Web Dashboard (Vercel)

1. **Push ל-GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercel Deployment**:
   - היכנס ל-[Vercel](https://vercel.com)
   - Import Project מ-GitHub
   - בחר את ה-repo
   - Root Directory: `web`
   - Framework: Next.js
   - Environment Variables: העתק מ-`.env.local`
   - Deploy!

3. **Database Migration** (Vercel Postgres):
```bash
# מה-local machine:
npm run db:migrate
npm run db:seed
```

### Mobile App (Expo EAS)

1. **התקנת EAS CLI**:
```bash
npm install -g eas-cli
```

2. **Login ל-Expo**:
```bash
eas login
```

3. **הגדרת EAS**:
```bash
cd mobile
eas build:configure
```

4. **Build Android APK**:
```bash
eas build --platform android --profile preview
```

5. **Build iOS** (צריך Apple Developer Account):
```bash
eas build --platform ios --profile preview
```

6. **הורדת Build**:
   - קבל לינק לאחר ש-Build מוכן
   - הורד APK/IPA
   - התקן על מכשיר

---

## 📚 משאבים נוספים

- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [WatermelonDB Documentation](https://watermelondb.dev/)

---

## 🐛 Troubleshooting

### בעיה: Prisma Client לא נמצא
```bash
cd web
npm run db:generate
```

### בעיה: Clerk authentication לא עובד
- ודא שהעתקת את ה-Keys הנכונים
- ודא ש-URL Redirects נכונים ב-Clerk Dashboard

### בעיה: Mobile app לא מתחבר ל-API
- ודא ש-`API_URL` ב-`.env` תקין
- אם ב-emulator, השתמש ב:
  - Android: `http://10.0.2.2:3000/api`
  - iOS: `http://localhost:3000/api`
- אם במכשיר פיזי, השתמש ב-IP של המחשב: `http://192.168.x.x:3000/api`

### בעיה: Database connection error
- ודא ש-PostgreSQL רץ
- ודא ש-`DATABASE_URL` תקין
- בדוק username/password

---

## 📝 רישיון

פרויקט פרטי עבור שוהם מכונות ומבלטים.

---

## 👥 צור קשר

לשאלות או בעיות, פנה למפתח הפרויקט.

---

**🎉 בהצלחה!**
