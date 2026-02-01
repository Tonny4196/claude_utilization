# Plugins（プラグイン）

Claude Codeのプラグイン情報と設定を格納するディレクトリ。

## 概要

Pluginsは、Claude Codeの機能を拡張するためのパッケージや設定です。プラグインを使用することで、特定のワークフローやツールチェーンをClaude Codeに統合できます。

## プラグインとは

プラグインは以下のようなものを含みます：

- カスタムツールの定義
- 特定言語/フレームワークのサポート
- IDE統合
- ワークフロー自動化
- 外部サービスとの連携

## プラグインの種類

### 1. 言語/フレームワーク プラグイン

特定の言語やフレームワークに特化した機能を提供。

**例**:
- React/React Native プラグイン
- TypeScript プラグイン
- Python/Django プラグイン
- Go プラグイン

### 2. IDE統合プラグイン

開発環境との統合。

**例**:
- VS Code 統合
- IntelliJ IDEA 統合
- Vim/Neovim 統合
- Emacs 統合

### 3. ワークフロープラグイン

特定のワークフローを自動化。

**例**:
- CI/CD パイプライン統合
- Git ワークフロー自動化
- デプロイメント自動化
- テスト自動化

### 4. ツールチェーンプラグイン

開発ツールとの統合。

**例**:
- Linter統合 (ESLint, Prettier)
- ビルドツール統合 (Webpack, Vite)
- テストフレームワーク統合 (Jest, Vitest)
- パッケージマネージャー統合 (npm, pnpm, yarn)

## プラグインの設定

プラグイン設定ファイルの例：

### plugin-config.json

```json
{
  "plugins": [
    {
      "name": "react-native",
      "version": "1.0.0",
      "enabled": true,
      "config": {
        "metro": true,
        "flipper": true,
        "detox": true
      }
    },
    {
      "name": "typescript",
      "version": "1.0.0",
      "enabled": true,
      "config": {
        "strict": true,
        "noImplicitAny": true
      }
    }
  ]
}
```

## カスタムプラグインの作成

### 1. プラグイン定義ファイルを作成

```json
{
  "name": "my-custom-plugin",
  "version": "1.0.0",
  "description": "Custom plugin for specific workflow",
  "enabled": true,
  "features": {
    "feature1": {
      "enabled": true,
      "config": {}
    }
  },
  "commands": {
    "custom-command": "command to execute"
  },
  "hooks": {
    "pre-commit": "./hooks/pre-commit.sh",
    "post-deploy": "./hooks/post-deploy.sh"
  }
}
```

### 2. プラグインスクリプトを作成

```javascript
// plugins/my-custom-plugin/index.js

export default {
  name: 'my-custom-plugin',

  activate() {
    console.log('Plugin activated');
    // 初期化処理
  },

  deactivate() {
    console.log('Plugin deactivated');
    // クリーンアップ処理
  },

  commands: {
    'custom-command': async (args) => {
      // コマンドの実装
      return 'Command result';
    }
  },

  hooks: {
    'pre-commit': async () => {
      // pre-commitフックの実装
    }
  }
};
```

### 3. プラグインを有効化

```bash
# プロジェクトに適用
cd /path/to/your/project
bash ~/workspace/claude_utilization/setup.sh
```

## プラグイン管理

### プラグインの有効化/無効化

```json
{
  "plugins": [
    {
      "name": "plugin-name",
      "enabled": false  // 無効化
    }
  ]
}
```

### プラグインの優先順位

```json
{
  "plugins": [
    {
      "name": "plugin-a",
      "priority": 1  // 高優先度
    },
    {
      "name": "plugin-b",
      "priority": 10  // 低優先度
    }
  ]
}
```

## ベストプラクティス

### プラグイン設計

1. **単一責任**: 1つのプラグインは1つの明確な目的
2. **軽量**: 起動時間への影響を最小化
3. **設定可能**: ユーザーが動作をカスタマイズ可能
4. **エラーハンドリング**: 適切なエラー処理とログ

### パフォーマンス

1. **遅延ロード**: 必要になるまでロードしない
2. **キャッシュ**: 計算結果をキャッシュ
3. **非同期処理**: ブロッキング操作を避ける

### セキュリティ

1. **検証**: ユーザー入力を検証
2. **最小権限**: 必要最小限の権限のみ
3. **依存関係**: 信頼できるパッケージのみ使用

## プラグインの配布

### npm パッケージとして配布

```json
{
  "name": "@your-org/claude-code-plugin-name",
  "version": "1.0.0",
  "main": "index.js",
  "keywords": ["claude-code", "plugin"],
  "peerDependencies": {
    "@anthropic/claude-code": "^1.0.0"
  }
}
```

### GitHub リポジトリとして配布

```bash
# インストール
git clone https://github.com/your-org/claude-code-plugin-name
cd claude-code-plugin-name
npm install
npm link
```

## トラブルシューティング

### プラグインが読み込まれない

1. プラグイン設定ファイルの構文を確認
2. `enabled: true`になっているか確認
3. Claude Codeを再起動
4. プラグインのログを確認

### プラグインがクラッシュする

1. プラグインのログを確認
2. 依存関係が正しくインストールされているか確認
3. プラグインのバージョンを確認
4. 一時的に無効化して問題を切り分け

### コマンドが実行できない

1. コマンドが正しく定義されているか確認
2. 実行権限があるか確認
3. パスが正しいか確認

## 現在の状態

このディレクトリは現在空です。プロジェクトのニーズに応じてプラグイン設定を追加できます。

## 参考リンク

- [../README.md](../README.md) - フレームワーク全体の説明
- [../mcp-configs/README.md](../mcp-configs/README.md) - MCPサーバーとの違い
