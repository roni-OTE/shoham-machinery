# ⚡ Quick Start Guide

התחלה מהירה לפיתוח המערכת תוך 5 דקות!

## 🏃‍♂️ Setup מהיר

### 1. התקנת Dependencies

```bash
# התקנת כל ה-dependencies בבת אחת
npm run install:all
```

### 2. הגדרות מינימליות

#### Database (בחר אחת):

**אפשרות מהירה - Vercel Postgres:**
1. [צור חשבון Vercel](https://vercel.com) (חינם)
2. New Project → Storage → Postgres
3. העתק את `DATABASE_URL`

**אפשרות לוקלית:**
```bash
# Postgres local
createdb shoham_machinery
# DATABASE_URL="postgresql://username:password@localhost:5432/shoham_machinery"
```

#### Clerk Authentication:
1. [צור חשבון Clerk](https://clerk.com) (חינם)
2. New Application → Email/Password
3. API Keys → העתק:
   - `Publishable key`
   - `Secret key`

### 3. קבצי סביבה

#### web/.env.local
```bash
DATABASE_URL="<YOUR_DATABASE_URL>"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<YOUR_CLERK_PUBLISHABLE_KEY>"
CLERK_SECRET_KEY="<YOUR_CLERK_SECRET_KEY>"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### mobile/.env
```bash
API_URL=http://localhost:3000/api
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="<YOUR_CLERK_PUBLISHABLE_KEY>"
EXPO_PUBLIC_ENV=development
```

### 4. הכנת Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to DB
npm run db:push

# Seed demo data (אופציונלי)
npm run db:seed
```

### 5. הרצה!

#### Terminal 1 - Web Dashboard:
```bash
npm run web
```
פתח: http://localhost:3000

#### Terminal 2 - Mobile App:
```bash
npm run mobile
```
סרוק QR code עם Expo Go

---

## 🎯 צעדים הבאים

1. **צור משתמש ראשון ב-Clerk:**
   - היכנס ל-[Clerk Dashboard](https://dashboard.clerk.com)
   - Users → Create User
   - Email: `manager@shoham.com`, Password: `Demo1234!`
   - Metadata → `role`: `MANAGER`

2. **בדוק שהמערכת עובדת:**
   - Web: התחבר עם המשתמש שיצרת
   - Mobile: התחבר עם אותו משתמש

3. **קרא את התיעוד המלא:**
   - [README.md](./README.md) - תיעוד מפורט
   - [Plan file](./.claude/plans/valiant-floating-axolotl.md) - תוכנית הפיתוח

---

## 🚨 בעיות נפוצות

**❌ "Module not found"**
```bash
npm run install:all
```

**❌ "Prisma Client not found"**
```bash
npm run db:generate
```

**❌ "Clerk authentication error"**
- ודא שהעתקת את ה-keys הנכונים
- ודא שיצרת משתמש ב-Clerk Dashboard

**❌ Mobile לא מתחבר ל-API**
- Android Emulator: `http://10.0.2.2:3000/api`
- iOS Simulator: `http://localhost:3000/api`
- Physical Device: `http://<YOUR_LOCAL_IP>:3000/api`

---

## 📞 צריך עזרה?

- קרא את [README.md](./README.md) המלא
- בדוק את [Plan file](./.claude/plans/valiant-floating-axolotl.md)
- פתח issue בגיטהאב

**בהצלחה! 🚀**
