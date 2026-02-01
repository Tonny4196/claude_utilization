# MCP Configs（MCPサーバー設定）

Model Context Protocol (MCP) サーバーの設定を格納するディレクトリ。

## 概要

MCPは、Claude Codeが外部システムやデータソースに接続するためのプロトコルです。MCPサーバーを使用することで、Claude Codeの機能を拡張できます。

## MCPとは

Model Context Protocol (MCP)は、LLMアプリケーションが外部システムと統合するためのオープンプロトコルです。MCPサーバーを通じて、以下のような機能を追加できます：

- データベースへのアクセス
- 外部APIの呼び出し
- ファイルシステムの操作
- カスタムツールの追加

## MCPサーバーの設定

MCPサーバーは`claude_desktop_config.json`または`.claude/mcp.json`で設定します。

### 設定ファイルの構造

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## 利用可能なMCPサーバー例

### 1. ファイルシステムサーバー

プロジェクト外のファイルへのアクセスを提供。

**設定例**: `filesystem-server.json`
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
```

### 2. データベースサーバー

データベースへのクエリ実行を提供。

**設定例**: `database-server.json`
```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/dbname"
      }
    }
  }
}
```

### 3. GitHub サーバー

GitHubリポジトリへのアクセスを提供。

**設定例**: `github-server.json`
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### 4. Web検索サーバー

Web検索機能を提供（Brave Search API使用）。

**設定例**: `brave-search-server.json`
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    }
  }
}
```

### 5. Slack サーバー

Slackへのメッセージ送信などを提供。

**設定例**: `slack-server.json`
```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```

## StudyMate用の推奨MCPサーバー

### 1. Supabase/Firebase 接続サーバー

StudyMateのバックエンドに直接アクセス。

**設定例**: `studymate-backend.json`
```json
{
  "mcpServers": {
    "studymate-db": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://[YOUR_SUPABASE_DB_URL]"
      }
    }
  }
}
```

**用途**:
- データベーススキーマの確認
- データの検証
- マイグレーションのテスト

### 2. モバイルデバイステストサーバー

実機デバイスへのアクセス（カスタムMCPサーバー）。

**設定例**: `mobile-device-server.json`
```json
{
  "mcpServers": {
    "mobile-devices": {
      "command": "node",
      "args": ["/path/to/custom-mobile-server.js"],
      "env": {
        "IOS_DEVICE_ID": "your-ios-device-id",
        "ANDROID_DEVICE_ID": "your-android-device-id"
      }
    }
  }
}
```

**用途**:
- 実機でのパフォーマンステスト
- タイマー精度の検証
- オフライン動作の確認

### 3. アナリティクスサーバー

ユーザー行動データへのアクセス（カスタムMCPサーバー）。

**設定例**: `analytics-server.json`
```json
{
  "mcpServers": {
    "analytics": {
      "command": "node",
      "args": ["/path/to/analytics-server.js"],
      "env": {
        "ANALYTICS_API_KEY": "your-analytics-key"
      }
    }
  }
}
```

**用途**:
- ユーザー行動の分析
- UX改善のためのデータ収集
- A/Bテスト結果の確認

## カスタムMCPサーバーの作成

### 1. サーバースクリプトを作成

```javascript
// custom-mcp-server.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "custom-server",
  version: "1.0.0"
});

// ツールの定義
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "custom_tool",
      description: "カスタムツールの説明",
      inputSchema: {
        type: "object",
        properties: {
          param: {
            type: "string",
            description: "パラメータの説明"
          }
        }
      }
    }
  ]
}));

// ツールの実行
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "custom_tool") {
    // カスタムロジック
    return {
      content: [
        {
          type: "text",
          text: "実行結果"
        }
      ]
    };
  }
});

// サーバー起動
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 2. 設定ファイルに追加

```json
{
  "mcpServers": {
    "custom": {
      "command": "node",
      "args": ["/path/to/custom-mcp-server.js"]
    }
  }
}
```

## MCPサーバーの管理

### インストール

多くのMCPサーバーはnpmパッケージとして提供：

```bash
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-postgres
```

または、`npx`で直接実行（設定例で使用）。

### 環境変数の管理

機密情報は`.env`ファイルで管理：

```bash
# .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
BRAVE_API_KEY=BSAxxxxxxxxxxxx
```

設定ファイルで参照：

```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

### デバッグ

MCPサーバーのログ出力を有効化：

```json
{
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "DEBUG": "mcp:*"
      }
    }
  }
}
```

## ベストプラクティス

### セキュリティ

1. **最小権限の原則**: 必要最小限のアクセス権のみ
2. **認証情報の保護**: APIキーやトークンは環境変数で管理
3. **アクセス制限**: ファイルシステムサーバーはディレクトリを制限
4. **本番データへのアクセス**: 開発環境でテスト後に有効化

### パフォーマンス

1. **軽量なサーバー**: 起動時間とメモリ使用量を最小化
2. **キャッシュ**: 頻繁にアクセスするデータはキャッシュ
3. **タイムアウト**: 長時間実行を避ける

### エラーハンドリング

1. **明確なエラーメッセージ**: 何が問題かを明示
2. **適切なリトライ**: 一時的なエラーはリトライ
3. **ログ記録**: デバッグのための詳細なログ

## トラブルシューティング

### MCPサーバーが起動しない

```bash
# サーバーを手動で起動してテスト
node /path/to/server.js

# 環境変数を確認
echo $DATABASE_URL
```

### ツールが利用できない

1. MCPサーバーが正しく設定されているか確認
2. Claude Codeを再起動
3. サーバーのログを確認

### 接続エラー

1. ネットワーク接続を確認
2. 認証情報が正しいか確認
3. ファイアウォール設定を確認

## 現在の状態

このディレクトリは現在空です。プロジェクトのニーズに応じてMCPサーバー設定を追加できます。

## 参考リンク

- [Model Context Protocol公式ドキュメント](https://modelcontextprotocol.io/)
- [MCPサーバー一覧](https://github.com/modelcontextprotocol/servers)
- [../README.md](../README.md) - フレームワーク全体の説明
