import { GoogleGenerativeAI } from '@google/generative-ai';
import { SectionLayout } from '../types.js';
import { generateMockLayout } from './mock-engine.js';

/**
 * Gemini Free Tier Engine
 * Connects to Google Gemini (free tier) to generate real AI structured JSON trees.
 * Automatically falls back to the Mock AI Engine if no API key is provided or on network error.
 */
export async function generateGeminiLayout(prompt: string, apiKey?: string): Promise<SectionLayout> {
  const key = apiKey || process.env.GEMINI_API_KEY;

  if (!key) {
    console.log('[Gemini Engine] No GEMINI_API_KEY provided. Using Mock AI Engine.');
    return generateMockLayout(prompt);
  }

  const candidateModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-pro'];

  for (const modelName of candidateModels) {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' },
      });

      const systemPrompt = `
You are an expert UI Section Generator. Your job is to convert a user's prompt into a structured, nested UI AST JSON tree.
Crucial Rules:
1. Return ONLY a valid JSON object representing a SectionLayout. Do not return raw HTML strings.
2. The color palette must strictly follow:
   - Canvas background: #FBF9F6
   - Navy Ink text: #202940
   - Warm Bronze/Amber accent: #8B6240
   - Emerald Green accent: #1DA851
   - Terracotta Red accent: #C94C3D
   - Card borders: rgba(32,41,64,0.12)
   - Rounded card radius: 20px
3. The JSON structure MUST adhere to this TypeScript schema:
{
  "id": "sec_...",
  "title": "Section Title",
  "category": "hero" | "pricing" | "features" | "testimonials" | "cta" | "faq" | "stats" | "custom",
  "promptUsed": "...",
  "createdAt": "...",
  "updatedAt": "...",
  "root": {
    "id": "node_1",
    "type": "section" | "container" | "grid" | "stack" | "card" | "heading" | "paragraph" | "button" | "badge" | "image" | "avatar" | "input",
    "content": "Text if applicable",
    "props": {
      "tag": "h1"|"h2"|"h3"|"p",
      "size": "sm"|"md"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl",
      "variant": "primary"|"secondary"|"outline"|"amber"|"emerald"|"terracotta",
      "align": "left"|"center"|"right",
      "direction": "row"|"col",
      "columns": 2|3|4,
      "gap": "sm"|"md"|"lg"|"xl",
      "padding": "sm"|"md"|"lg"|"xl"|"2xl",
      "bgColor": "#...",
      "textColor": "#...",
      "borderRadius": "xl"|"2xl",
      "badgeType": "bronze"|"success"|"alert"|"navy",
      "src": "https://images.unsplash.com/... or https://api.dicebear.com/7.x/avataaars/svg?seed=..."
    },
    "children": []
  }
}
User Prompt: "${prompt}"
`;

      const result = await model.generateContent(systemPrompt);
      let text = result.response.text();
      text = text.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();

      const parsed = JSON.parse(text) as SectionLayout;

      if (!parsed.root || !parsed.root.type) {
        throw new Error('Invalid JSON structure returned by Gemini');
      }

      parsed.id = parsed.id || `sec_${Date.now()}`;
      parsed.promptUsed = prompt;
      parsed.createdAt = parsed.createdAt || new Date().toISOString();
      parsed.updatedAt = new Date().toISOString();

      console.log(`[Gemini Engine] Successfully generated layout with model: ${modelName}`);
      return parsed;
    } catch (err: any) {
      console.warn(`[Gemini Engine] Model ${modelName} failed, trying next candidate:`, err.message);
    }
  }

  console.warn('[Gemini Engine] All Gemini model candidates failed. Falling back to Mock Engine.');
  return generateMockLayout(prompt);
}
