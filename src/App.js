import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import bautizadoRoutes from "./routes/bautizado.routes.js";
import ministroRoutes from "./routes/ministro.routes.js";
import rolRoutes from "./routes/rol.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trustedscripts.example.com"],
      styleSrc: ["'self'", "https://trustedstyles.example.com"],
      imgSrc: ["'self'", "data:", "https://trustedimages.example.com"],
      connectSrc: ["'self'", "https://api.example.com"],
      fontSrc: ["'self'", "https://trustedfonts.example.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// Añadir cabeceras Cache-Control
app.use((req, res, next) => {
  if (req.url === "/robots.txt" || req.url === "/sitemap.xml") {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  } else if (req.url.startsWith("/public/")) {
    res.setHeader("Cache-Control", "public, max-age=31536000");
  } else {
    res.setHeader("Cache-Control", "no-cache");
  }
  next();
});

app.use("/bauApi/auth", authRoutes);
app.use("/bauApi/roles", rolRoutes);
app.use("/bauApi/bautizados", bautizadoRoutes);
app.use("/bauApi/ministros", ministroRoutes);
app.use("/helloWorld", (req, res) => {
  res.send("Hello World");
});

export default app;
