import express from "express";
import cors from "cors";
import db from "./db/conn";
import userRoutes from "./routes/user.route";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use("/api/v1", userRoutes);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
  db(); // Ensure db() is a valid function
});
