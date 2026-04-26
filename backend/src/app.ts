import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import courseRoutes from "./routes/courseRoute";
import enrollmentRoutes from "./routes/enrollRoute";
import bookmarkRoutes from "./routes/bookmarkRoute";
import ratingRoutes from "./routes/ratingRoute";
import profileRoutes from "./routes/profileRoute";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/bookmarks", bookmarkRoutes)
app.use("/api/ratings", ratingRoutes);
app.use("/api/profile", profileRoutes);

export default app;
