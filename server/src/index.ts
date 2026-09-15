import { app } from './app.js';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 AI Section Generator Server running on http://localhost:${PORT}`);
  console.log(`👉 POST /api/generate (Mock AI & Gemini generation)`);
  console.log(`👉 GET/POST /api/sections (JSON layout storage)`);
  console.log(`=================================================\n`);
});
