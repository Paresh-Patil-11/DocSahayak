const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();
const db = require('../db');

// Get document history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'SELECT * FROM documents WHERE user_id = $1 ORDER BY submitted_at DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get document history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get applied documents with status filter
router.get('/applied', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;
    
    let query = 'SELECT * FROM documents WHERE user_id = $1';
    let params = [userId];
    
    if (status && status !== 'all') {
      query += ' AND status = $2';
      params.push(status);
    }
    
    query += ' ORDER BY submitted_at DESC';
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get applied documents error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new document application
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, documentType, summary } = req.body;
    
    const result = await db.query(
      'INSERT INTO documents (user_id, name, document_type, summary) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, documentType, summary]
    );
    
    res.status(201).json({
      message: 'Document application created successfully',
      document: result.rows[0]
    });
  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update document status
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const userId = req.user.id;
    const { status, summary } = req.body;
    
    const result = await db.query(
      'UPDATE documents SET status = COALESCE($1, status), summary = COALESCE($2, summary), last_edited = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
      [status, summary, documentId, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.json({
      message: 'Document updated successfully',
      document: result.rows[0]
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;