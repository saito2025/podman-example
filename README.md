# Podmanのインストール方法

PodmanはDockerの代替となるコンテナエンジンです。rootless（非特権）でコンテナを実行できるのが特徴です。

## Windows環境でのWSLセットアップ（前提条件）

Windowsでpodmanを使用する場合、まずWSL（Windows Subsystem for Linux）をセットアップする必要があります。

### WSLのインストール
PowerShellを**管理者モード**で開き、以下のコマンドを実行：
```powershell
wsl --install
```

インストール完了後、PCを再起動してください。

### WSLの確認
```powershell
wsl --list --verbose
```

## Ubuntu/Debian系でのインストール

### 1. パッケージリストを更新
```bash
sudo apt update
```

### 2. Podmanをインストール
```bash
sudo apt install -y podman
```

### 3. Podman Composeをインストール（オプション）
Docker Composeライクな機能を使いたい場合：
```bash
sudo apt install -y podman-compose
```

## インストール確認
```bash
podman --version
```

## Podman Composeを使った環境構築

このリポジトリには、Node.js（Express）とPostgreSQLを使った開発環境のためのpodman-compose.yamlが含まれています。

### 構成
- **Node.js**: バージョン18（Alpine Linux）
- **Express**: Node.jsのWebフレームワーク
- **PostgreSQL**: バージョン15（Alpine Linux）
- **pgAdmin**: PostgreSQL管理ツール（オプション）

### 使用方法

#### 1. 環境の起動
```bash
podman-compose up -d
```

#### 2. アプリケーションの確認
起動後、以下のURLにアクセスしてデータベースの情報を確認できます：
```
http://localhost:3000/api/users
```
初期データとして3人のユーザー情報（山田太郎、佐藤花子、田中次郎）が表示されます。

#### 3. 環境の停止
```bash
podman-compose down
```

#### 4. ログの確認
```bash
podman-compose logs -f app
```

### アクセス情報
- **Node.jsアプリ**: http://localhost:3000
- **ユーザーAPI**: http://localhost:3000/api/users （データベース内容確認）
- **pgAdmin**: http://localhost:8080
  - Email: admin@example.com
  - Password: admin123
- **PostgreSQL**: localhost:5432
  - Database: myapp_db
  - User: myapp_user
  - Password: myapp_password