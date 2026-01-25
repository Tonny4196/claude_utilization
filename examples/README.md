# Examples（設定例）

Claude Utilization Frameworkの各種設定例とサンプルを格納するディレクトリ。

## 概要

このディレクトリには、各種設定ファイルのサンプルや、よくある使用パターンの例が含まれています。プロジェクトに合わせてカスタマイズして使用できます。

## 利用可能な例

### 1. agent-usage-examples.md

8つの専門エージェントの具体的な使用例。

**内容**:
- 各エージェントの基本的な呼び出し方
- フェーズ別の使用フロー
- 複数エージェントの連携例
- ベストプラクティス
- トラブルシューティング

**参照**: [agent-usage-examples.md](./agent-usage-examples.md)

## 追加可能な例

以下のような設定例を追加することを推奨します：

### 2. workflow-examples.md

実際の開発ワークフローの例。

**内容例**:
```markdown
# ワークフロー例

## 新機能開発フロー

### Phase 0: 設計
1. tech-lead で技術調査
2. ui-ux-designer でワイヤーフレーム作成
3. data-modeler でDB設計
4. project-manager でタスク分解

### Phase 1: 実装
1. backend-dev でAPI実装
2. frontend-dev でUI実装
3. qa-tester でテスト作成

### Phase 2: リリース
1. doc-writer でドキュメント作成
2. QA検証
3. デプロイ

## バグ修正フロー

1. 問題の再現確認
2. 原因の特定
3. 修正実装
4. テスト追加
5. レビュー
6. デプロイ
```

### 3. command-examples/

よく使うスラッシュコマンドの例。

**ファイル構成**:
```
command-examples/
├── review.md          # コードレビュー
├── test-plan.md       # テスト計画作成
├── refactor.md        # リファクタリング
└── doc-update.md      # ドキュメント更新
```

### 4. rule-examples/

プロジェクトタイプ別のルール例。

**ファイル構成**:
```
rule-examples/
├── mobile-app/              # モバイルアプリ用
│   ├── coding-standards.md
│   ├── security-rules.md
│   └── performance-rules.md
├── web-app/                 # Webアプリ用
│   ├── coding-standards.md
│   ├── accessibility-rules.md
│   └── seo-rules.md
└── api-server/              # APIサーバー用
    ├── coding-standards.md
    ├── security-rules.md
    └── api-design-rules.md
```

### 5. hook-examples/

実用的なフックスクリプト例。

**ファイル構成**:
```
hook-examples/
├── pre-commit/
│   ├── lint-check.sh
│   ├── test-check.sh
│   └── security-check.sh
├── post-commit/
│   └── notify-team.sh
└── pre-push/
    └── full-test-suite.sh
```

### 6. mcp-examples/

MCPサーバー設定例。

**ファイル構成**:
```
mcp-examples/
├── database-servers.json    # DB接続設定
├── api-servers.json         # 外部API設定
├── filesystem-servers.json  # ファイルシステム設定
└── custom-servers/          # カスタムサーバー例
    └── example-server.js
```

### 7. plugin-examples/

プラグイン設定例。

**ファイル構成**:
```
plugin-examples/
├── react-native.json        # React Native設定
├── typescript.json          # TypeScript設定
├── testing.json             # テスト設定
└── custom-plugin/           # カスタムプラグイン例
    ├── plugin.json
    └── index.js
```

## StudyMate プロジェクト固有の例

### studymate-setup-guide.md

StudyMateプロジェクトの初回セットアップガイド。

```markdown
# StudyMate プロジェクト セットアップガイド

## 1. 前提条件

- Node.js 18+
- React Native CLI
- Xcode（iOS開発用）
- Android Studio（Android開発用）
- Supabase CLI

## 2. セットアップ手順

### リポジトリのクローン
\`\`\`bash
git clone https://github.com/your-org/studymate
cd studymate
\`\`\`

### Claude Utilization Framework のセットアップ
\`\`\`bash
bash ~/workspace/claude_utilization/setup.sh
\`\`\`

### 依存関係のインストール
\`\`\`bash
npm install
cd ios && pod install && cd ..
\`\`\`

### 環境変数の設定
\`\`\`bash
cp .env.example .env
# .env を編集して必要な値を設定
\`\`\`

### データベースのセットアップ
\`\`\`bash
supabase start
supabase db reset
\`\`\`

## 3. 開発開始

### エージェントで設計確認
\`\`\`
Use the tech-lead agent to review the current architecture
\`\`\`

### タスク確認
\`\`\`
Use the project-manager agent to show current task status
\`\`\`

### 開発開始
\`\`\`
npm run ios    # iOS
npm run android # Android
\`\`\`
```

### studymate-phase-workflows.md

各開発フェーズの詳細ワークフロー。

```markdown
# StudyMate 開発フェーズ別ワークフロー

## Phase 0: 設計フェーズ

### 週1: 技術スタック決定
\`\`\`
Day 1-2: Use the tech-lead agent to evaluate tech stacks
Day 3-4: Use the tech-lead agent to create architecture documents
Day 5: Review and finalize decisions
\`\`\`

### 週2: UI/UX設計
\`\`\`
Day 1-3: Use the ui-ux-designer agent to create wireframes
Day 4-5: Use the ui-ux-designer agent to define design system
\`\`\`

### 週3: データモデル設計
\`\`\`
Day 1-3: Use the data-modeler agent to design database schema
Day 4-5: Use the data-modeler agent to create migration plan
\`\`\`

### 週4: 開発計画
\`\`\`
Day 1-3: Use the project-manager agent to create development plan
Day 4-5: Review and adjust timeline
\`\`\`

## Phase 1: MVP実装

### Sprint 1: 認証とバックエンド基盤
\`\`\`
Week 1: Use the backend-dev agent to implement authentication
Week 2: Use the backend-dev agent to implement core API endpoints
Week 3-4: Testing and refinement
\`\`\`

### Sprint 2: モバイルアプリ基盤
\`\`\`
Week 1: Use the frontend-dev agent to setup mobile project
Week 2-3: Use the frontend-dev agent to implement core screens
Week 4: Integration testing
\`\`\`

### Sprint 3: タイマーとオフライン機能
\`\`\`
Week 1-2: Use the frontend-dev agent to implement timer
Week 3: Use the frontend-dev agent to implement offline support
Week 4: Testing and optimization
\`\`\`

### Sprint 4: テストとドキュメント
\`\`\`
Week 1-2: Use the qa-tester agent to create comprehensive tests
Week 3: Use the doc-writer agent to create documentation
Week 4: Final polish and bug fixes
\`\`\`
```

## 使い方

### 例を参照する

```bash
# 全ての例を確認
ls ~/workspace/claude_utilization/examples/

# 特定の例を読む
cat ~/workspace/claude_utilization/examples/agent-usage-examples.md
```

### 例をプロジェクトにコピー

```bash
# 例をプロジェクトにコピーしてカスタマイズ
cp ~/workspace/claude_utilization/examples/workflow-examples.md docs/
```

### 例を元にカスタマイズ

1. 例をコピー
2. プロジェクトに合わせて編集
3. 必要に応じて適切なディレクトリに配置

## 例の追加

新しい例を追加する場合：

### 1. 例ファイルを作成

```bash
cd ~/workspace/claude_utilization/examples
touch my-example.md
```

### 2. 内容を記述

```markdown
# 例のタイトル

## 概要
この例の目的

## 使用方法
ステップバイステップの説明

## コード/設定例
具体的なコード例

## 注意事項
使用時の注意点
```

### 3. README に追加

このREADMEファイルに新しい例の説明を追加。

## ベストプラクティス

### 例の作成

1. **具体的**: 実際に動作する完全な例
2. **説明的**: なぜそうするのか理由を記載
3. **コメント**: コード例には詳細なコメント
4. **バリエーション**: 複数のパターンを示す

### ドキュメント

1. **目的**: 例の目的を明確に
2. **前提条件**: 必要な環境や設定
3. **手順**: ステップバイステップで説明
4. **トラブルシューティング**: よくある問題と解決策

## 参考リンク

- [../AGENTS.md](../AGENTS.md) - エージェント一覧
- [../QUICKSTART.md](../QUICKSTART.md) - クイックスタートガイド
- [../README.md](../README.md) - フレームワーク全体の説明
