const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL接続設定
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp_db',
  user: process.env.DB_USER || 'myapp_user',
  password: process.env.DB_PASSWORD || 'myapp_password',
});

// JSONパースのミドルウェア
app.use(express.json());

// ルートエンドポイント
app.get('/', (req, res) => {
  res.json({
    message: 'Express + PostgreSQL API Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// 全ユーザー取得
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      error: 'データベースエラーが発生しました'
    });
  }
});

// ユーザー作成
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: '名前とメールアドレスは必須です'
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Database error:', error);
    if (error.code === '23505') {
      res.status(409).json({
        success: false,
        error: 'このメールアドレスは既に使用されています'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'データベースエラーが発生しました'
      });
    }
  }
});

// ヘルスチェック
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/health`);
  console.log(`👥 Users API: http://localhost:${port}/api/users`);
});
