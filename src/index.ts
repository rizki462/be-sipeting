import express from "express";
import { PORT } from "./utils/env";
import cors from "cors";

import db from "./config/database";
import router from "./routers/api";
import helmet from "helmet";

async function init() {
  try {
    const result = await db();
    console.log(`Database Status : ${result}`);

    const app = express();

    // Konfigurasi CORS
    const corsOptions = {
      origin: [
        "http://localhost:5173", // untuk development
        "https://sipeting.vercel.app" // untuk production 
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
      credentials: true,
    };

    app.use(cors(corsOptions));

    // Konfigurasi Helmet dengan CSP
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'", "'unsafe-inline'"],
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

    app.get("/", (req, res) => {
      res.status(200).json({
        message: "success hit endpoint",
        data: "OK",
      });
    });

    app.use(express.json());
    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
