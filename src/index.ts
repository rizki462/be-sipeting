import express from "express";
import { PORT } from "./utils/env";
import cors from "cors";

import db from "./config/database";
import router from "./routers/api";
import helmet from "helmet";

async function init() {
  try {
    const result = await db();
    const app = express();

    // 1. Pindahkan express.json() ke ATAS sebelum route apapun
    app.use(express.json()); 

    // 2. Konfigurasi CORS (Sudah bagus)
    const corsOptions = {
      origin: ["http://localhost:5173", "https://sipeting.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    };
    app.use(cors(corsOptions));

    // 3. Konfigurasi Helmet (Tambahkan connect-src untuk API Google)
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
            "connect-src": ["'self'", "https://generativelanguage.googleapis.com"], // Izinkan akses ke Gemini
            "img-src": [
              "'self'",
              "data:",
              "https://*.tile.openstreetmap.org",
              "https://server.arcgisonline.com",
              "https://firebasestorage.googleapis.com",
            ],
          },
        },
        crossOriginEmbedderPolicy: false,
      })
    );

    // 4. Routes
    app.get("/", (req, res) => {
      res.status(200).json({ message: "success", data: "OK" });
    });

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init()