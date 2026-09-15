import React, { useState } from 'react';
import { useSection } from '../../context/SectionContext';
import { Bold, Italic, Strikethrough, Palette, Trash2, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

export const FloatingToolbar: React.FC = () => {
  const {
    activeToolbarNode,
    toolbarPosition,
    updateNodeProps,
    deleteNode,
    setActiveToolbar,
  } = useSection();

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  if (!activeToolbarNode || !toolbarPosition) return null;

  const currentProps = activeToolbarNode.props || {};

  const toggleBold = () => {
    const isBold = currentProps.weight === 'bold' || currentProps.weight === 'extrabold';
    updateNodeProps(activeToolbarNode.id, { weight: isBold ? 'normal' : 'bold' });
  };

  const toggleItalic = () => {
    const isItalic = currentProps.className?.includes('italic');
    const newClass = isItalic
      ? (currentProps.className || '').replace('italic', '').trim()
      : `${currentProps.className || ''} italic`.trim();
    updateNodeProps(activeToolbarNode.id, { className: newClass });
  };

  const toggleStrikethrough = () => {
    const isStrike = currentProps.className?.includes('line-through');
    const newClass = isStrike
      ? (currentProps.className || '').replace('line-through', '').trim()
      : `${currentProps.className || ''} line-through`.trim();
    updateNodeProps(activeToolbarNode.id, { className: newClass });
  };

  const setColor = (color: string) => {
    updateNodeProps(activeToolbarNode.id, { textColor: color });
    setShowColorPicker(false);
  };

  const setSize = (size: any) => {
    updateNodeProps(activeToolbarNode.id, { size });
    setShowSizePicker(false);
  };

  const setAlign = (align: 'left' | 'center' | 'right') => {
    updateNodeProps(activeToolbarNode.id, { align });
  };

  const colors = [
    { label: 'Navy Ink', value: '#202940', bg: 'bg-[#202940]' },
    { label: 'Warm Bronze', value: '#8B6240', bg: 'bg-[#8B6240]' },
    { label: 'Emerald Green', value: '#1DA851', bg: 'bg-[#1DA851]' },
    { label: 'Terracotta Red', value: '#C94C3D', bg: 'bg-[#C94C3D]' },
    { label: 'Muted Slate', value: 'rgba(32,41,64,0.6)', bg: 'bg-slate-400' },
  ];

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];

  return (
    <div
      style={{
        position: 'fixed',
        top: `${Math.max(60, toolbarPosition.top)}px`,
        left: `${toolbarPosition.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
      className="flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-xl shadow-floating border border-navy/15 text-navy text-xs animate-in fade-in zoom-in-95 duration-150 select-none"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Bold */}
      <button
        type="button"
        onClick={toggleBold}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors font-bold ${
          currentProps.weight === 'bold' ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Bold"
      >
        <Bold size={14} />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={toggleItalic}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors italic ${
          currentProps.className?.includes('italic') ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Italic"
      >
        <Italic size={14} />
      </button>

      {/* Strikethrough */}
      <button
        type="button"
        onClick={toggleStrikethrough}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors ${
          currentProps.className?.includes('line-through') ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Strikethrough"
      >
        <Strikethrough size={14} />
      </button>

      <div className="w-[1px] h-4 bg-navy/10 mx-0.5" />

      {/* Alignments */}
      <button
        type="button"
        onClick={() => setAlign('left')}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors ${
          currentProps.align === 'left' ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Align Left"
      >
        <AlignLeft size={14} />
      </button>
      <button
        type="button"
        onClick={() => setAlign('center')}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors ${
          currentProps.align === 'center' ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Align Center"
      >
        <AlignCenter size={14} />
      </button>
      <button
        type="button"
        onClick={() => setAlign('right')}
        className={`p-1.5 hover:bg-bronze-light rounded-lg transition-colors ${
          currentProps.align === 'right' ? 'bg-bronze-light text-bronze' : ''
        }`}
        title="Align Right"
      >
        <AlignRight size={14} />
      </button>

      <div className="w-[1px] h-4 bg-navy/10 mx-0.5" />

      {/* Size Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowSizePicker(!showSizePicker);
            setShowColorPicker(false);
          }}
          className="flex items-center gap-1 px-2 py-1 hover:bg-bronze-light rounded-lg transition-colors font-medium text-[11px]"
          title="Change Size"
        >
          <Type size={13} />
          <span>{currentProps.size || 'md'}</span>
        </button>

        {showSizePicker && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-navy/15 rounded-lg shadow-lg p-1.5 grid grid-cols-3 gap-1 w-32 z-50">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-1.5 py-1 text-xs rounded hover:bg-bronze-light ${
                  currentProps.size === s ? 'bg-bronze text-white' : ''
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowColorPicker(!showColorPicker);
            setShowSizePicker(false);
          }}
          className="p-1.5 hover:bg-bronze-light rounded-lg transition-colors"
          title="Text Color"
        >
          <Palette size={14} style={{ color: currentProps.textColor || '#202940' }} />
        </button>

        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-navy/15 rounded-lg shadow-lg p-2 flex gap-1.5 z-50">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-5 h-5 rounded-full ${c.bg} border-2 ${
                  currentProps.textColor === c.value ? 'border-navy scale-110' : 'border-transparent'
                } hover:scale-110 transition-transform`}
                title={c.label}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-[1px] h-4 bg-navy/10 mx-0.5" />

      {/* Delete Element */}
      <button
        type="button"
        onClick={() => deleteNode(activeToolbarNode.id)}
        className="p-1.5 hover:bg-terracotta-light text-navy/60 hover:text-terracotta rounded-lg transition-colors"
        title="Delete element"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};
