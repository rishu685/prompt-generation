import React, { useState } from 'react';
import { useSection } from '../context/SectionContext';
import { Wand2, Loader2, Save } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    generateSection,
    isGenerating,
    saveCurrentSection,
    isSaving,
    saveMessage,
  } = useSection();

  const [prompt, setPrompt] = useState('');

  const suggestions = [
    { label: '3-Tier Pricing', query: 'A pricing section with 3 tiers' },
    { label: 'Hero Section', query: 'A modern architectural hero section with CTA buttons' },
    { label: 'Features Grid', query: 'A 3-column features grid with capability badges' },
    { label: 'Testimonials', query: 'Customer testimonials section with 5-star ratings' },
    { label: 'FAQ Accordion', query: 'Frequently asked questions accordion with status pills' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      generateSection(prompt.trim());
    }
  };

  const handleSuggestionClick = (query: string) => {
    setPrompt(query);
    generateSection(query);
  };

  return (
    <header className="w-full bg-white border-b border-navy/10 px-4 sm:px-8 py-3 sticky top-0 z-40 select-none shadow-sm flex flex-col gap-2">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Brand Title */}
        <div className="flex-shrink-0">
          <span className="font-space font-bold text-navy text-lg tracking-tight">
            AI Section Generator
          </span>
        </div>

        {/* Center: Prompt Input & Generate Button */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl flex items-center gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Enter your prompt, e.g., "a pricing section with 3 tiers"...'
            className="w-full px-4 py-2 rounded-xl bg-canvas border border-navy/15 text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-bronze/50 focus:border-bronze text-xs sm:text-sm shadow-inner transition-all"
          />

          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="px-5 py-2 rounded-xl bg-navy hover:bg-navy-light text-white font-space font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50 flex-shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 size={14} className="animate-spin text-bronze" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 size={14} className="text-bronze" />
                <span>Generate</span>
              </>
            )}
          </button>
        </form>

        {/* Right: Save Changes Button */}
        <div className="flex-shrink-0">
          <button
            onClick={saveCurrentSection}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald hover:bg-emerald-hover text-white shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-75"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto text-xs py-0.5">
        <span className="text-navy/50 font-medium text-[11px] mr-1">
          Suggestions:
        </span>
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => handleSuggestionClick(s.query)}
            className="px-2.5 py-0.5 rounded-full bg-canvas hover:bg-bronze-light text-navy hover:text-bronze border border-navy/10 hover:border-bronze/30 transition-all whitespace-nowrap text-[11px] font-medium"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Save Notification Toast */}
      {saveMessage && (
        <div className="bg-emerald-light border border-emerald/30 text-emerald px-3 py-1.5 rounded-xl text-xs font-semibold text-center animate-in fade-in slide-in-from-top-1">
          {saveMessage}
        </div>
      )}
    </header>
  );
};
