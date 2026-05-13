// src/db/seed.ts
import { db } from "./db";
import { courses, instructors } from "../models/schema";

// ── INSTRUCTORS ──────────────────────────────────────────────
const INSTRUCTORS = [
  {
    name: "Jaxson Culhane",
    avatar: "https://i.pravatar.cc/150?u=p1",
    bio: "Senior UI/UX designer with 10+ years building design systems for Fortune 500 companies.",
  },
  {
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/150?u=p2",
    bio: "React Native engineer and open-source contributor. Builds cross-platform apps used by millions.",
  },
  {
    name: "Kim Lee",
    avatar: "https://i.pravatar.cc/150?u=p3",
    bio: "Digital marketing strategist who has scaled brands from 0 to 1M+ followers.",
  },
  {
    name: "Alex Rivera",
    avatar: "https://i.pravatar.cc/150?u=p4",
    bio: "Serial entrepreneur and growth hacker. Founded 3 startups, two acquired.",
  },
];

// ── COURSES ───────────────────────────────────────────────────
// instructorId is filled dynamically after inserting instructors
const getCourses = (instructorIds: string[]) => [
  {
    title: "Advanced UI/UX Design Systems",
    description: "Learn how to build scalable design systems for modern applications with clarity and emotional connection.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    instructorId: instructorIds[0],
    price: 4500,        // store cents to avoid float issues
    duration: 480,      // minutes
    totalLessons: 24,
    averageRating: 5,   // out of 5
    totalReviews: 1200,
    studentsCount: 4300,
    category: "Design",
  },
  {
    title: "React Native Masterclass 2024",
    description: "Master cross-platform mobile development with React Native, Reanimated, and NativeWind styling.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    instructorId: instructorIds[1],
    price: 5999,
    duration: 600,
    totalLessons: 32,
    averageRating: 5,
    totalReviews: 850,
    studentsCount: 3100,
    category: "Code",
  },
  {
    title: "Digital Marketing Strategy",
    description: "Develop a comprehensive digital marketing strategy to grow your brand and reach new customers effectively.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    instructorId: instructorIds[2],
    price: 3250,
    duration: 360,
    totalLessons: 18,
    averageRating: 5,
    totalReviews: 2100,
    studentsCount: 7800,
    category: "Marketing",
  },
  {
    title: "Startup Growth Hacking",
    description: "Learn the secrets behind the rapid growth of some of the world's most successful tech startups.",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
    instructorId: instructorIds[3],
    price: 4900,
    duration: 420,
    totalLessons: 20,
    averageRating: 5,
    totalReviews: 540,
    studentsCount: 2200,
    category: "Business",
  },
];

// ── SEED ──────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Seeding instructors...");

  const insertedInstructors = await db
    .insert(instructors)
    .values(INSTRUCTORS)
    .onConflictDoNothing()
    .returning({ id: instructors.id, name: instructors.name });

  console.log(`✅ Seeded ${insertedInstructors.length} instructors`);
  insertedInstructors.forEach((i) => console.log(`   • ${i.name} → ${i.id}`));

  const instructorIds = insertedInstructors.map((i) => i.id);

  console.log("\n🌱 Seeding courses...");

  const insertedCourses = await db
    .insert(courses)
    .values(getCourses(instructorIds))
    .onConflictDoNothing()
    .returning({ id: courses.id, title: courses.title });

  console.log(`✅ Seeded ${insertedCourses.length} courses`);
  insertedCourses.forEach((c) => console.log(`   • ${c.title} → ${c.id}`));

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});