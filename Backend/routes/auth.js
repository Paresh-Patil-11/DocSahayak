const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, gender, birthDate, email } = req.body;

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT * FROM users WHERE mobile = $1',
      [mobile]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User with this mobile number already exists' });
    }

    // Hash password (using mobile as password for demo)
    const hashedPassword = await bcrypt.hash(mobile, 10);

    // Create new user
    const newUser = await db.query(
      'INSERT INTO users (name, mobile, gender, birth_date, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, mobile, gender, birth_date, email, created_at',
      [name, mobile, gender, birthDate, email || null, hashedPassword]
    );

    const user = newUser.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT * FROM users WHERE mobile = $1',
      [mobile]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password || mobile, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, mobile: user.mobile },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Google OAuth placeholder
router.post('/google', (req, res) => {
  res.status(501).json({ error: 'Google OAuth not implemented yet' });
});

module.exports = router;