import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import doctorRoutes from "./role/doctor/doctor.routes.js";
import patientRoutes from "./role/patient/patient.routes.js";
import consultationRoutes from "./role/consultation/consultation.routes.js";

dotenv.config();

const app = express();

app.use(helmet());

// Configure CORS: restrict in production via CORS_ORIGIN env (comma-separated list)
const corsOptions = process.env.NODE_ENV === 'production'
	? { origin: (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean), credentials: true }
	: { origin: true };

app.use(cors(corsOptions));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

// rate limiter for auth endpoints
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, message: 'Demasiados intentos, prueba más tarde' });
app.use('/api/doctors/login', authLimiter);

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/consultations", consultationRoutes);

export default app;
