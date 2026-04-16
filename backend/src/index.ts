import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import generateRouter from "./routes/generate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

app.use("/api/generate", generateRouter);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "CryptoPunks Backend",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`CryptoPunks Backend running on port ${PORT}`);
});

export default app;
