import express from 'express';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js"
import rolRoutes from "./routes/rol.routes.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const corsOptions = {
    origin: "*",
    credentials: true
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/bauApi/auth', authRoutes);
app.use('/bauApi/roles', rolRoutes);

export default app;