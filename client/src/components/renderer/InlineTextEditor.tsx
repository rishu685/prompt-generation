import React, { useRef, useEffect } from 'react';
import { useSection } from '../../context/SectionContext';
import { UIElementNode } from '../../types/section';

interface InlineTextEditorProps {
  node: UIElementNode;
  className?: string;
  tag?: string;
}

export const InlineTextEditor: React.FC<InlineTextEditorProps> = ({
  node,
  className = '',
  tag = 'span',
}) => {
  const {
    updateNodeContent,
    selectedNodeId,
    setSelectedNodeId,
    setActiveToolbar,
  } = useSection();

  const elementRef = useRef<HTMLElement>(null);
  const isFocusedRef = useRef(false);
  const isSelected = selectedNodeId === node.id;

  // Initialize and synchronize text only when not actively typing/focused
  useEffect(() => {
    if (elementRef.current && !isFocusedRef.current) {
      if (elementRef.current.innerText !== (node.content || '')) {
        elementRef.current.innerText = node.content || '';
      }
    }
  }, [node.content, node.id]);

  const updateToolbarPosition = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setActiveToolbar(node, {
        top: Math.max(12, rect.top - 48),
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleFocus = () => {
    isFocusedRef.current = true;
    setSelectedNodeId(node.id);
    updateToolbarPosition();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(node.id);
    updateToolbarPosition();
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    updateNodeContent(node.id, newText);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    isFocusedRef.current = false;
    const newText = e.currentTarget.innerText;
    if (newText !== node.content) {
      updateNodeContent(node.id, newText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      e.key === 'Enter' &&
      !e.shiftKey &&
      (node.type === 'heading' || node.type === 'badge' || node.type === 'button')
    ) {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const Tag = (node.props?.tag || tag) as any;

  return (
    <Tag
      ref={elementRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onClick={handleClick}
      onFocus={handleFocus}
      onInput={handleInput}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Click directly to edit text"
      style={{
        color: node.props?.textColor || undefined,
        outline: isSelected ? '2px solid #8B6240' : undefined,
        outlineOffset: isSelected ? '3px' : undefined,
        borderRadius: isSelected ? '4px' : undefined,
        backgroundColor: isSelected ? 'rgba(139, 98, 64, 0.06)' : undefined,
      }}
      className={`${className} inline-editable-hover cursor-text outline-none transition-all duration-150 relative inline-block`}
    />
  );
};
