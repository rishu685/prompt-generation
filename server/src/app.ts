import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRouter } from './routes/generate.js';
import { sectionsRouter } from './routes/sections.js';

dotenv.config();

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Section Generator API Server',
  });
});
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Section Generator API Server',
  });
});

// API Routes (supports both direct /api prefix and serverless rewrite)
app.use('/api/generate', generateRouter);
app.use('/generate', generateRouter);

app.use('/api/sections', sectionsRouter);
app.use('/sections', sectionsRouter);
