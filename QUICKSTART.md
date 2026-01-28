# Claude Utilization Framework - クイックスタート

## 5分で始める

### ステップ1: プロジェクトに移動

```bash
cd /path/to/your/project
```

### ステップ2: セットアップスクリプトを実行

```bash
bash ~/workspace/claude_utilization/setup.sh
```

これで、プロジェクトの`.claude/`ディレクトリに全てのエージェントがコピーされます。

### ステップ3: プロジェクト情報を追記 ⚠️ 重要

エージェントを効果的に機能させるには、**プロジェクト固有の情報を追記する必要があります。**

`.claude/agents/`配下の各エージェントファイル（*.md）を開き、`<!-- ✏️ EDIT THIS SECTION -->` マーカーがある箇所を編集してください。

#### 必須編集項目

**Project Overview**（全エージェント共通）
```markdown
## Project Overview

**[YOUR PROJECT NAME]** is [brief description].

- **Target**: [Your target audience]
- **Platform**: [Web, Mobile, Desktop, CLI, etc.]
- **MVP Features**: [List 3-5 core features]
```

**Reference Documents**（該当エージェント）
```markdown
- **Requirements**: `./docs/requirements.md`
- **Product Concept**: `./docs/product-concept.md`
```

詳しくは後述の「プロジェクト情報のカスタマイズ」セクションを参照してください。

### ステップ4: エージェントを使う

Claude Codeセッションで、以下のように指示します：

```plaintext
Use the tech-lead agent to decide on the technology stack for the project
```

## プロジェクト情報のカスタマイズ

エージェントをプロジェクトに最適化するため、以下のセクションを編集してください。

### 編集すべきファイルと箇所

各エージェントファイル（`.claude/agents/*.md`）には `<!-- ✏️ EDIT THIS SECTION -->` マーカーがあります。このマーカーがある箇所がカスタマイズ可能なセクションです。

#### 1. Project Overview（全エージェント必須）

各エージェントの冒頭セクションを編集：

```markdown
**TaskMaster** is a team task management tool designed to help small dev teams stay organized.

- **Target**: Small to medium development teams (10-50 members)
- **Platform**: Web application (React + Node.js), future mobile support
- **MVP Features**: Task creation, team collaboration, kanban board, notifications, integrations
```

#### 2. Reference Documents（該当エージェント）

プロジェクトのドキュメントへのパスを指定：

```markdown
- **Requirements**: `./docs/requirements.md`
- **Product Concept**: `./docs/product-concept.md`
- **Technical Specifications**: `./docs/tech-specs.md`
```

#### 3. Key Implementation Areas（実装系エージェント）

**backend-dev.md** のAPI例：
```markdown
### User Management
- `GET /users` - List all users (admin only)
- `POST /users` - Create new user
```

**data-modeler.md** のエンティティ例：
```markdown
### 1. User
- id (UUID, PK)
- email (string, unique, indexed)
```

**frontend-dev.md** の画面例：
```markdown
### 1. Dashboard
- Project overview cards
- Recent activity feed
```

## 開発ワークフロー例

### Phase 0: 設計フェーズ

```plaintext
# 1. 技術スタック決定
Use the tech-lead agent to decide on the technology stack for the project

# 2. UI/UX設計
Use the ui-ux-designer agent to create wireframes and design system

# 3. データモデル設計
Use the data-modeler agent to design the database schema

# 4. 開発計画
Use the project-manager agent to create a development plan for MVP
```

### Phase 1: 実装フェーズ

```plaintext
# バックエンド実装
Use the backend-dev agent to implement authentication and API endpoints

# フロントエンド実装
Use the frontend-dev agent to implement the UI based on wireframes

# テスト作成
Use the qa-tester agent to create comprehensive tests

# ドキュメント作成
Use the doc-writer agent to create user documentation
```

### Phase 2: デプロイフェーズ

```plaintext
# インフラ構築
Use the devops-engineer agent to set up CI/CD pipeline and deployment
```

## 利用可能なエージェント

| エージェント | 用途 |
|------------|------|
| tech-lead | 技術選定・設計 |
| ui-ux-designer | UI/UX設計 |
| data-modeler | DB設計 |
| project-manager | プロジェクト管理 |
| backend-dev | バックエンド実装 |
| frontend-dev | フロントエンド実装 |
| qa-tester | テスト・QA |
| doc-writer | ドキュメント作成 |

## 詳細ドキュメント

- [README.md](README.md) - 詳細な説明
- [AGENTS.md](AGENTS.md) - エージェント一覧とリファレンス
- [examples/agent-usage-examples.md](examples/agent-usage-examples.md) - 使用例

## トラブルシューティング

### エージェントがプロジェクト情報を認識しない

**原因**: `<!-- ✏️ EDIT THIS SECTION -->` マーカーの箇所を編集していない

**解決策**: 各エージェントファイルの「Project Overview」セクションを必ず編集してください

### エージェントが参照ドキュメントを見つけられない

**原因**: 「Reference Documents」セクションのパスが間違っている

**解決策**:
1. パスを相対パス（`./docs/requirements.md`）で正しく指定
2. ドキュメントがまだ存在しない場合は、まずドキュメントを作成

### エージェントが認識されない

```bash
# 再度セットアップを実行
bash ~/workspace/claude_utilization/setup.sh

# .claude/agents/ ディレクトリを確認
ls -la .claude/agents/
```

## 次のステップ

1. **プロジェクト情報を追記**: `.claude/agents/*.md` の `<!-- ✏️ EDIT THIS SECTION -->` 箇所を編集
2. **エージェントの動作確認**: `Use the tech-lead agent to read the project overview and confirm you understand our project`
3. **設計フェーズを開始**: tech-lead → ui-ux-designer → data-modeler → project-manager の順で利用
4. [README.md](README.md) で全体像を理解
5. [GENERALIZATION_PROPOSAL.md](GENERALIZATION_PROPOSAL.md) でテンプレート設計思想を理解

---

**ハッピーコーディング！**
