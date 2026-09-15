import { Router } from 'express';
import { generateMockLayout } from '../engines/mock-engine.js';
import { generateGeminiLayout } from '../engines/gemini-engine.js';

export const generateRouter = Router();

generateRouter.post('/', async (req, res) => {
  try {
    const { prompt, engine = 'mock', apiKey } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required and must be a string.',
      });
    }

    console.log(`[API /generate] Generating layout for prompt: "${prompt}" (Engine: ${engine})`);

    let section;
    if (engine === 'gemini') {
      section = await generateGeminiLayout(prompt, apiKey);
    } else {
      section = generateMockLayout(prompt);
    }

    return res.status(200).json({
      success: true,
      section,
    });
  } catch (err: any) {
    console.error('[API /generate] Error generating section:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  }
});
