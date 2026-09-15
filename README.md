# AI Section Generator & Editor

A full-stack prototype that transforms natural language prompts into responsive website sections represented as structured JSON Abstract Syntax Trees (AST), featuring recursive UI rendering, single-click inline text editing with a floating formatting toolbar, and backend database persistence.

---

## 🏗️ Simple Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 React Frontend (Vite + TS)                  │
│                                                             │
│  [ Prompt Bar ] ──► [ React AST State ] ──► [ Undo/Redo ]   │
│                             │                               │
│                             ▼                               │
│              [ Recursive Dynamic Renderer ]                 │
│                             │                               │
│                             ▼                               │
│         [ Interactive Canvas & Inline Text Editor ]         │
└─────────────────────────────┬───────────────────────────────┘
                              │ HTTP (/api)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Node.js / Express Backend                    │
│                                                             │
│  • POST /api/generate ──► Mock AI / Gemini Engine (AST)     │
│  • GET/POST /api/sections ──► JSON File & In-Memory Storage │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/rishu685/prompt-generation.git
cd prompt-generation
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Run Development Servers
```bash
npm run dev
```

This starts both the **Node.js Express backend** on port `5000` and the **React frontend** on port `3000`.

Open your browser at **`http://localhost:3000`**.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, TypeScript
- **Deployment**: Netlify (SPA Client + Netlify Serverless Functions)
- **Design Tokens**: Cream Canvas (`#FBF9F6`), Navy Ink (`#202940`), Warm Bronze (`#8B6240`), Emerald Green (`#1DA851`), Terracotta Red (`#C94C3D`)

---

## 📦 Project Structure

```
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/  # Navbar, InlineTextEditor, FloatingToolbar
│   │   ├── context/     # SectionContext (AST state management)
│   │   └── types/       # UIElementNode schema definitions
├── server/              # Node.js Express backend API
│   ├── src/
│   │   ├── engines/     # Mock AI & Gemini AST generator engines
│   │   ├── routes/      # /api/generate and /api/sections
│   │   └── storage.ts   # JSON file & in-memory persistence
├── netlify/             # Netlify Serverless Functions wrapper
└── package.json         # Root scripts & orchestration
```
