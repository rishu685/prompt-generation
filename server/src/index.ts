import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRouter } from './routes/generate.js';
import { sectionsRouter } from './routes/sections.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI Section Generator API Server',
  });
});

// API Routes
app.use('/api/generate', generateRouter);
app.use('/api/sections', sectionsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 AI Section Generator Server running on http://localhost:${PORT}`);
  console.log(`👉 POST /api/generate (Mock AI & Gemini generation)`);
  console.log(`👉 GET/POST /api/sections (JSON layout storage)`);
  console.log(`=================================================\n`);
});
