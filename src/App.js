import express from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/bauApi/auth', authRoutes);

export default app;