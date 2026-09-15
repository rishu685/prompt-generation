# ⚡ AI Section Generator & Editor

A full-stack prototype that transforms natural language prompts into responsive, dynamic website sections represented as structured JSON Abstract Syntax Trees (AST), with real-time recursive UI rendering, inline click-to-edit capabilities, and backend database persistence.

Built with **React (Frontend)** and **Node.js Express (Backend)** matching the take-home assignment specifications.

---

## 🎨 Visual Design System & Palette

The application strictly follows the custom curated design palette:
- **Canvas (Background)**: `#FBF9F6` — Warm, organic cream canvas.
- **Navy Ink (Primary Text)**: `#202940` — High-contrast deep navy headers & content.
- **Warm Bronze / Amber**: `#8B6240` — Primary accent, CTA buttons, active highlights.
- **Emerald Green**: `#1DA851` — Success pills, active badges, pricing checkmarks.
- **Terracotta Red**: `#C94C3D` — Alert badges, notice tags, warning states.
- **Borders & Grids**: `rgba(32, 41, 64, 0.12)` — Subtle slate grey borders.
- **Rounded Cards**: `20px` border-radius (`rounded-card`) matching modern SaaS platforms.
- **Typography**: **Space Grotesk** for geometric headers + **Inter** for neutral UI text.

---

## 🚀 Key Features & Assignment Requirements Met

| Requirement | Implementation Details |
| :--- | :--- |
| **1. Prompt & Generate** | User types a prompt (e.g. *"A pricing section with 3 tiers"* or *"Hero with CTA"*) and submits to the backend API. |
| **2. Mock AI Backend** | Express server parses keywords/intent and returns a **structured, nested JSON AST tree** (`UIElementNode`), **NOT raw HTML strings**. Supports Hero, 3-Tier Pricing, Feature Grids, Testimonials, FAQ Accordion, Stats, CTA banners, and custom layouts. |
| **3. Dynamic UI Rendering** | The frontend uses `DynamicRenderer.tsx` to recursively walk the JSON tree, dynamically resolving `section`, `container`, `grid`, `stack`, `card`, `heading`, `paragraph`, `button`, `badge`, `image`, `avatar`, and `input` nodes without hardcoding markup. |
| **4. Inline Text Editing** | Click directly on any text element on canvas to edit inline. Displays a floating format toolbar (`B`, `I`, `S`, color picker, tag sizes, delete element) as shown in the mockup. |
| **5. State Management & 2-Way Sync** | Immutably updates the JSON state tree as you edit text. Includes a **Live AST JSON Inspector** with real-time two-way synchronization and Undo / Redo history. |
| **6. Mock Database Storage** | Backend persists saved sections to `server/data/sections.json` and in-memory cache via `POST /api/sections`, queryable via `GET /api/sections`. |
| **Free-Tier Visuals Integration** | Embedded high-res photography via Unsplash Direct CDN, SVG user avatars via DiceBear API, and built-in Lucide icons. |
| **Bonus: Gemini Free Tier Engine** | Toggleable engine switch to test live generation with free Google Gemini 1.5 Flash API keys. |

---

## 📁 Architecture & File Structure

```
.
├── client/                          # React Frontend (Vite + TypeScript + Tailwind)
│   ├── index.html                   # HTML Entry with Google Fonts (Space Grotesk, Inter)
│   ├── vite.config.ts               # Vite configuration with /api proxy to port 5000
│   ├── tailwind.config.js           # Custom design palette & 20px card radius
│   └── src/
│       ├── main.tsx                 # React DOM Root
│       ├── App.tsx                  # Main Studio canvas, viewport frame, split view
│       ├── index.css                # Global styles, fonts, and inline editing rings
│       ├── types/
│       │   └── section.ts           # UIElementNode & SectionLayout TypeScript interfaces
│       ├── context/
│       │   └── SectionContext.tsx    # State store, AST manipulation, undo/redo, save logic
│       ├── components/
│       │   ├── Navbar.tsx           # Brand header, viewport selector, view mode, save button
│       │   ├── PromptBar.tsx        # Prompt input, suggestions chips, engine toggle
│       │   ├── JSONTreeInspector.tsx# 2-way live synchronized AST editor
│       │   ├── SavedSectionsDrawer.tsx # Slide-out drawer for saved layouts
│       │   ├── ExportModal.tsx      # Export to React JSX, HTML/CSS, or JSON
│       │   ├── ApiKeyModal.tsx      # Optional Gemini API key configuration
│       │   └── renderer/
│       │       ├── DynamicRenderer.tsx # Recursive JSON UI component engine
│       │       ├── InlineTextEditor.tsx # Click-to-edit inline text component
│       │       └── FloatingToolbar.tsx # Floating B/I/S/Color/Size format bar
│
├── server/                          # Node.js Express Backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts                 # Express entry point (Port 5000)
│   │   ├── types.ts                 # Backend data models & schema
│   │   ├── storage.ts               # File & in-memory database persistence
│   │   ├── engines/
│   │   │   ├── mock-engine.ts       # Mock AI keyword & intent parser (Zero keys required)
│   │   │   └── gemini-engine.ts     # Optional Google Gemini Free Tier engine
│   │   └── routes/
│   │       ├── generate.ts          # POST /api/generate
│   │       └── sections.ts          # GET/POST/DELETE /api/sections
│   └── data/
│       └── sections.json            # Persisted layout records
│
├── package.json                     # Root orchestrator scripts
└── README.md
```

---

## 🛠️ Installation & Local Setup

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### 2. Install Dependencies
From the project root:
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```
*Or install manually:*
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Run Development Servers
From the root directory:
```bash
# Starts both Express backend (Port 5000) and React frontend (Port 3000) concurrently
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 🧪 Testing the Workflow

1. **Generate a Layout**:
   - Type `"A pricing section with 3 tiers"` or click a suggestion pill and press **Generate**.
   - Watch the backend generate the structured JSON tree and the frontend dynamically render it.
2. **Inline Edit**:
   - Click on the title `"Starter"` or price `"$10"`.
   - Edit the text directly. Observe the floating formatting toolbar (`B`, `I`, `S`, Color Picker).
3. **Inspect the Live AST**:
   - Switch to **Split View** or **JSON AST** tab.
   - Notice how any edits you made on screen immediately sync to the underlying JSON tree in real time!
4. **Save to Database**:
   - Click **Save Changes** in the top right.
   - Open the **Saved** drawer to see your layout stored on the backend.
5. **Export**:
   - Click **Export** to copy clean React JSX code, HTML/CSS, or download the raw JSON AST.
