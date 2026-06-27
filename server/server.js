import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

export const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Mount routes
app.use('/api/tasks', taskRoutes);

export const startDb = async () => {
    await connectDB();
};
