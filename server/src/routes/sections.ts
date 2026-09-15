import { Router } from 'express';
import { listSections, getSection, saveSection, deleteSection } from '../storage.js';
import { SectionLayout } from '../types.js';

export const sectionsRouter = Router();

// GET /api/sections - List all saved sections
sectionsRouter.get('/', (req, res) => {
  try {
    const sections = listSections();
    return res.status(200).json({
      success: true,
      count: sections.length,
      sections,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/sections/:id - Get specific section by ID
sectionsRouter.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const section = getSection(id);
    if (!section) {
      return res.status(404).json({ success: false, error: `Section '${id}' not found.` });
    }
    return res.status(200).json({ success: true, section });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/sections - Save or update section
sectionsRouter.post('/', (req, res) => {
  try {
    const section = req.body as SectionLayout;
    if (!section || !section.id || !section.root) {
      return res.status(400).json({
        success: false,
        error: 'Invalid section payload. id and root are required.',
      });
    }

    const saved = saveSection(section);
    console.log(`[API /sections] Successfully saved section: "${saved.title}" (ID: ${saved.id})`);

    return res.status(200).json({
      success: true,
      message: 'Section saved successfully',
      section: saved,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/sections/:id - Delete section
sectionsRouter.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteSection(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: `Section '${id}' not found.` });
    }
    return res.status(200).json({
      success: true,
      message: `Section '${id}' deleted successfully.`,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});
