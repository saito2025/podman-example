-- PostgreSQL初期化スクリプト
-- データベース作成時に実行される

-- usersテーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータの挿入
INSERT INTO users (name, email) VALUES 
    ('山田太郎', 'yamada@example.com'),
    ('佐藤花子', 'sato@example.com'),
    ('田中次郎', 'tanaka@example.com')
ON CONFLICT (email) DO NOTHING;

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
