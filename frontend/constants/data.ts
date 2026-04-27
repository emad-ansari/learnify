import { C } from "./theme";

export const CATEGORIES = ["All", "Programming", "Design", "Data", "Business", "Creative"];

export const POPULAR_COURSES = [
  {
    id: "p1",
    category: "Design",
    title: "Advanced UI/UX Design Systems",
    instructor: "Jaxson Culhane",
    instructorAvatar: "https://i.pravatar.cc/150?u=p1",
    description: "Learn how to build scalable design systems for modern applications with clarity and emotional connection.",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: "1.2k",
    price: "$45.00"
  },
  {
    id: "p2",
    category: "Code",
    title: "React Native Masterclass 2024",
    instructor: "Sarah Jenkins",
    instructorAvatar: "https://i.pravatar.cc/150?u=p2",
    description: "Master cross-platform mobile development with React Native, Reanimated, and NativeWind styling.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: "850",
    price: "$59.99"
  },
  {
    id: "p3",
    category: "Marketing",
    title: "Digital Marketing Strategy",
    instructor: "Kim Lee",
    instructorAvatar: "https://i.pravatar.cc/150?u=p3",
    description: "Develop a comprehensive digital marketing strategy to grow your brand and reach new customers effectively.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: "2.1k",
    price: "$32.50"
  },
  {
    id: "p4",
    category: "Business",
    title: "Startup Growth Hacking",
    instructor: "Alex Rivera",
    instructorAvatar: "https://i.pravatar.cc/150?u=p4",
    description: "Learn the secrets behind the rapid growth of some of the world's most successful tech startups.",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: "540",
    price: "$49.00"
  }
];

export const CONTINUE_COURSES = [
  { 
    id: "1", 
    title: "Advanced React Patterns",
    author: "By David Miller", 
    progress: 0.65,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=200&auto=format&fit=crop"
  },
  { 
    id: "2", 
    title: "UI Motion Design",
    author: "By Maya Patel", 
    progress: 0.40,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=200&auto=format&fit=crop"
  },
  { 
    id: "3", 
    title: "Product Strategy",
    author: "By James Chen", 
    progress: 0.80,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop"
  },
];

export const FEATURED = [
  { id: "0", tag: "Featured",    title: "UI/UX Design Fundamentals", author: "By Sarah Jenkins", colors: [C.primary, C.primaryDark] as const },
  { id: "1", tag: "Trending",    title: "Machine Learning A–Z",      author: "By Raj Patel",    colors: ["#5B7FA6", "#3A5A80"] as const },
  { id: "2", tag: "New Launch",  title: "iOS App Development",       author: "By Kim Lee",      colors: ["#9B8EC4", "#7B6AAD"] as const },
];
