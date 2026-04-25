import { C } from "./theme";

export const CATEGORIES = ["All", "Programming", "Design", "Data", "Business", "Creative"];

export const POPULAR_COURSES = [
  { 
    id: "1", 
    category: "Design",   
    title: "Visual Identity Design",    
    instructor: "Sarah Jenkins",
    thumbnail: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop",
    rating: 4.8,
    reviews: "1.2k",
    price: "$24.99",
  },
  { 
    id: "2", 
    category: "Business", 
    title: "Growth Marketing 101",       
    instructor: "David Miller",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    rating: 4.5,
    reviews: "850",
    price: "$19.99",
  },
  { 
    id: "3", 
    category: "Code",     
    title: "Python for Data Science",    
    instructor: "Raj Patel",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop",
    rating: 4.9,
    reviews: "2.1k",
    price: "$49.99",
  },
  { 
    id: "4", 
    category: "Creative", 
    title: "Digital Illustration",    
    instructor: "Kim Lee",
    thumbnail: "https://images.unsplash.com/photo-1541462608141-ad4d769421a1?q=80&w=400&auto=format&fit=crop",
    rating: 4.7,
    reviews: "940",
    price: "$29.99",
  },
];

export const CONTINUE_COURSES = [
  { id: "1", icon: "code", title: "Advanced React Patterns",
    author: "By David Miller", progress: 0.65, color: C.primary, bg: C.primarySubtle },
  { id: "2", icon: "layers", title: "UI Motion Design",
    author: "By Maya Patel", progress: 0.40, color: "#9B8EC4", bg: "#EDE9F8" },
  { id: "3", icon: "book-open", title: "Product Strategy",
    author: "By James Chen", progress: 0.80, color: "#D97706", bg: C.cardYellow },
];

export const FEATURED = [
  { id: "0", tag: "Featured",    title: "UI/UX Design Fundamentals", author: "By Sarah Jenkins", colors: [C.primary, C.primaryDark] as const },
  { id: "1", tag: "Trending",    title: "Machine Learning A–Z",      author: "By Raj Patel",    colors: ["#5B7FA6", "#3A5A80"] as const },
  { id: "2", tag: "New Launch",  title: "iOS App Development",       author: "By Kim Lee",      colors: ["#9B8EC4", "#7B6AAD"] as const },
];
