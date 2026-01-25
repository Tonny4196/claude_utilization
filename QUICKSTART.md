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

### ステップ3: エージェントを使う

Claude Codeセッションで、以下のように指示します：

```plaintext
Use the tech-lead agent to decide on the technology stack for the project
```

## StudyMate プロジェクト用クイックスタート

StudyMateプロジェクトでエージェントを使い始める手順：

### Phase 0: 設計フェーズ

#### 1. 技術スタック決定

```plaintext
Use the tech-lead agent to:
1. Read all reference documents in /Users/tomohirotakahashi/Documents/Obsidian Vault/studymate/
2. Evaluate React Native vs Flutter
3. Evaluate Supabase vs Firebase
4. Create tech-stack-decision.md with full analysis
```

#### 2. UI/UX設計

```plaintext
Use the ui-ux-designer agent to:
1. Create wireframes for all 5 MVP screens
2. Design the screen transition flow
3. Define the design system
4. Validate 15-second recording constraint
```

#### 3. データモデル設計

```plaintext
Use the data-modeler agent to:
1. Review tech-lead's database overview
2. Create detailed schema for User, Subject, StudySession
3. Design ER diagram
4. Create migration plan
```

#### 4. 開発計画

```plaintext
Use the project-manager agent to:
1. Review all design documents
2. Break down MVP into tasks
3. Create detailed development plan
4. Identify risks and dependencies
```

### Phase 1: 実装フェーズ

設計が完了したら、実装エージェントを使用：

```plaintext
Use the backend-dev agent to implement authentication and API endpoints

Use the frontend-dev agent to implement the mobile app screens

Use the qa-tester agent to create comprehensive tests

Use the doc-writer agent to create documentation
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

### エージェントが認識されない

```bash
# 再度セットアップを実行
bash ~/workspace/claude_utilization/setup.sh

# .claude/agents/ ディレクトリを確認
ls -la .claude/agents/
```

### セットアップの検証

```bash
cd ~/workspace/claude_utilization
./verify.sh
```

## 次のステップ

1. [AGENTS.md](AGENTS.md) でエージェントの詳細を確認
2. [examples/agent-usage-examples.md](examples/agent-usage-examples.md) で具体的な使用例を確認
3. StudyMateプロジェクトで実際にエージェントを使い始める

---

**ハッピーコーディング！**
