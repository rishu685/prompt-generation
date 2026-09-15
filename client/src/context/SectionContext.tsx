import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SectionLayout, UIElementNode, NodeProps } from '../types/section';

interface SectionContextType {
  section: SectionLayout | null;
  isGenerating: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  selectedNodeId: string | null;
  activeToolbarNode: UIElementNode | null;
  toolbarPosition: { top: number; left: number } | null;
  canUndo: boolean;
  canRedo: boolean;
  setSelectedNodeId: (id: string | null) => void;
  setActiveToolbar: (node: UIElementNode | null, pos: { top: number; left: number } | null) => void;
  generateSection: (prompt: string) => Promise<void>;
  saveCurrentSection: () => Promise<void>;
  updateNodeContent: (id: string, content: string) => void;
  updateNodeProps: (id: string, props: Partial<NodeProps>) => void;
  deleteNode: (id: string) => void;
  setSection: (section: SectionLayout) => void;
  undo: () => void;
  redo: () => void;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

// Helper to immutably update node in tree
function updateNodeInTree(
  node: UIElementNode,
  targetId: string,
  updater: (node: UIElementNode) => UIElementNode
): UIElementNode {
  if (node.id === targetId) {
    return updater(node);
  }
  if (!node.children || node.children.length === 0) {
    return node;
  }
  return {
    ...node,
    children: node.children.map((child) => updateNodeInTree(child, targetId, updater)),
  };
}

// Helper to remove node in tree
function removeNodeFromTree(node: UIElementNode, targetId: string): UIElementNode {
  if (!node.children) return node;
  return {
    ...node,
    children: node.children
      .filter((child) => child.id !== targetId)
      .map((child) => removeNodeFromTree(child, targetId)),
  };
}

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [section, setSectionState] = useState<SectionLayout | null>(null);
  const [history, setHistory] = useState<SectionLayout[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeToolbarNode, setActiveToolbarNode] = useState<UIElementNode | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);

  // Push to history
  const pushHistory = useCallback(
    (newSection: SectionLayout) => {
      setHistory((prev) => {
        const next = prev.slice(0, historyIndex + 1);
        return [...next, newSection];
      });
      setHistoryIndex((prev) => prev + 1);
      setSectionState(newSection);
    },
    [historyIndex]
  );

  const setSection = (newSection: SectionLayout) => {
    pushHistory(newSection);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = historyIndex - 1;
      setHistoryIndex(prev);
      setSectionState(history[prev]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = historyIndex + 1;
      setHistoryIndex(next);
      setSectionState(history[next]);
    }
  };

  // Generate section via backend API
  const generateSection = async (prompt: string) => {
    setIsGenerating(true);
    setSaveMessage(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.success && data.section) {
        setSection(data.section);
      } else {
        alert(data.error || 'Failed to generate layout.');
      }
    } catch (err: any) {
      console.error('Generation network error:', err);
      alert('Network error connecting to backend API.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Save current section to backend database
  const saveCurrentSection = async () => {
    if (!section) return;
    setIsSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMessage('✓ Layout saved successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
      } else {
        setSaveMessage('Failed to save layout.');
      }
    } catch (err: any) {
      setSaveMessage('Network error while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  // Update node text content inline
  const updateNodeContent = (id: string, content: string) => {
    if (!section) return;
    const updatedRoot = updateNodeInTree(section.root, id, (node) => ({
      ...node,
      content,
    }));
    const updatedSection = {
      ...section,
      updatedAt: new Date().toISOString(),
      root: updatedRoot,
    };
    pushHistory(updatedSection);
  };

  // Update node props (styling, variants, tags, etc.)
  const updateNodeProps = (id: string, props: Partial<NodeProps>) => {
    if (!section) return;
    const updatedRoot = updateNodeInTree(section.root, id, (node) => ({
      ...node,
      props: { ...node.props, ...props },
    }));
    const updatedSection = {
      ...section,
      updatedAt: new Date().toISOString(),
      root: updatedRoot,
    };
    pushHistory(updatedSection);
  };

  // Delete node
  const deleteNode = (id: string) => {
    if (!section || section.root.id === id) return;
    const updatedRoot = removeNodeFromTree(section.root, id);
    const updatedSection = {
      ...section,
      updatedAt: new Date().toISOString(),
      root: updatedRoot,
    };
    pushHistory(updatedSection);
    setSelectedNodeId(null);
    setActiveToolbarNode(null);
  };

  // Set active floating toolbar
  const setActiveToolbar = (node: UIElementNode | null, pos: { top: number; left: number } | null) => {
    setActiveToolbarNode(node);
    setToolbarPosition(pos);
  };

  // Auto-generate initial template on mount
  useEffect(() => {
    if (!section) {
      generateSection('A pricing section with 3 tiers');
    }
  }, []);

  return (
    <SectionContext.Provider
      value={{
        section,
        isGenerating,
        isSaving,
        saveMessage,
        selectedNodeId,
        activeToolbarNode,
        toolbarPosition,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        setSelectedNodeId,
        setActiveToolbar,
        generateSection,
        saveCurrentSection,
        updateNodeContent,
        updateNodeProps,
        deleteNode,
        setSection,
        undo,
        redo,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};
