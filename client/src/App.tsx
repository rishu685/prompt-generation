import React from 'react';
import { SectionProvider, useSection } from './context/SectionContext';
import { Navbar } from './components/Navbar';
import { DynamicRenderer } from './components/renderer/DynamicRenderer';
import { FloatingToolbar } from './components/renderer/FloatingToolbar';
import { Sparkles } from 'lucide-react';

const StudioContent: React.FC = () => {
  const {
    section,
    isGenerating,
    setSelectedNodeId,
    setActiveToolbar,
  } = useSection();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodeId(null);
      setActiveToolbar(null, null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-canvas text-navy font-inter selection:bg-bronze-light selection:text-bronze overflow-hidden">
      {/* Top Navbar: Brand on Left, Prompt in Center, Save Changes on Right */}
      <Navbar />

      {/* Main Canvas Area */}
      <main className="flex-1 min-h-0 flex overflow-hidden relative">
        {/* Floating Format Toolbar */}
        <FloatingToolbar />

        {/* Canvas Preview Area */}
        <div
          onClick={handleCanvasClick}
          className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-8 pb-36 flex flex-col items-center justify-start bg-canvas relative select-text"
        >
          {/* Main Section Container */}
          <div className="w-full max-w-6xl transition-all duration-300 relative flex flex-col mb-16 flex-shrink-0">
            {isGenerating ? (
              <div className="py-24 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-bronze-light text-bronze flex items-center justify-center shadow-md animate-pulse">
                  <Sparkles size={24} />
                </div>
                <p className="font-space font-bold text-navy text-base">
                  Generating Structured UI AST...
                </p>
                <p className="text-xs text-navy/60">
                  Parsing prompt keywords and composing responsive JSON tree
                </p>
              </div>
            ) : section ? (
              <DynamicRenderer node={section.root} />
            ) : (
              <div className="py-24 text-center text-navy/50">
                <Sparkles size={36} className="mx-auto mb-2 text-bronze/50" />
                <p className="font-space font-semibold">Ready to generate your first section</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <SectionProvider>
      <StudioContent />
    </SectionProvider>
  );
}
