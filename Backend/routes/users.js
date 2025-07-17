const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();
const db = require('../db');

// Get user profile
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user is accessing their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await db.query(
      'SELECT id, name, mobile, gender, birth_date, email, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user is updating their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { name, email, gender, birthDate } = req.body;
    
    const result = await db.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), gender = COALESCE($3, gender), birth_date = COALESCE($4, birth_date), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING id, name, mobile, gender, birth_date, email, created_at, updated_at',
      [name, email, gender, birthDate, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user account
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user is deleting their own account
    if (req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;