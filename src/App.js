import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import bautizadoRoutes from "./routes/bautizado.routes.js";
import rolRoutes from "./routes/rol.routes.js";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/bauApi/auth", authRoutes);
app.use("/bauApi/roles", rolRoutes);
app.use("/bauApi/bautizados", bautizadoRoutes);
app.use("/helloWorld", (req, res) => {
  res.send("Hello World");
});

export default app;
