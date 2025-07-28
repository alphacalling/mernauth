import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import config from "./config/index.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const PORT = config.PORT;
const NODE_ENV = config.NODE_ENV;

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: NODE_ENV === "production" ? false : ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/health", (req, res) => {
  res.send("Server is running");
});
app.use("/api/users", userRoutes);

// Serve frontend in production
if (NODE_ENV === "production") {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handling middleware must be last
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, (err) => {
  if (err) throw new Error("Error while connecting with server");
  console.log(`✅ Server running on port ${PORT}`);
});
// Connect to MongoDB
connectDB();
