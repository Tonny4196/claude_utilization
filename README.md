# Claude Utilization Framework

**プロジェクトに特化した開発を加速するClaude Code設定テンプレート**

これは、あらゆるプロジェクトで利用できる汎用的なClaude Code設定のテンプレートリポジトリです。各プロジェクトの`.claude/`ディレクトリにコピーして、プロジェクト固有の情報を追記することで、Claude Codeをプロジェクトに最適化できます。

## ディレクトリ構造

```
claude_utilization/
├── agents/           # 専門エージェント
├── skills/           # ワークフロー定義とドメイン知識
├── commands/         # スラッシュコマンド
├── rules/            # 常に従うルール
├── hooks/            # トリガーベース自動化
├── mcp-configs/      # MCPサーバー設定
├── plugins/          # プラグイン情報
└── examples/         # 設定例
```

## 特徴

### 汎用的なエージェントテンプレート

すべてのエージェント（agents/*.md）は、プロジェクトに依存しない汎用的なテンプレートです。各エージェントファイル内の `<!-- ✏️ EDIT THIS SECTION -->` マーカーで示された箇所に、プロジェクト固有の情報を追記することで、あなたのプロジェクトに最適化されたエージェントになります。

**編集が必要なセクション例:**
- Project Overview: プロジェクト名、概要、対象ユーザー、プラットフォーム、MVP機能
- Reference Documents: プロジェクトのドキュメントへのパス
- Key Constraints & Priorities: プロジェクトの制約と優先事項
- Key Implementation Areas: プロジェクト固有の実装領域（API、画面、エンティティなど）

### 柔軟なカスタマイズ

- 各セクションに具体例がHTML コメントで含まれているため、参考にしながら編集できます
- プロジェクトに不要なセクションは削除可能
- 必要に応じて新しいセクションを追加可能

## セットアップ

### プロジェクトへの適用

プロジェクトルートで以下を実行：

```bash
# セットアップスクリプトを実行
bash ~/workspace/claude_utilization/setup.sh
```

これにより、`claude_utilization/`の内容が`.claude/`ディレクトリにコピーされます。

### 手動セットアップ

個別のコンポーネントのみ使用する場合：

```bash
# エージェントのみコピー
cp -r ~/workspace/claude_utilization/agents/* .claude/agents/

# スラッシュコマンドのみコピー
cp -r ~/workspace/claude_utilization/commands/* .claude/commands/
```

## 各ディレクトリの説明

### agents/
Task toolで呼び出せる専門サブエージェント定義。

**使用例:**
```
Use the tech-lead agent to design the system architecture
Have the frontend-dev agent implement the dashboard component
```

### skills/
特定のワークフローやドメイン知識を持つスキル定義。

### commands/
`/`で始まるスラッシュコマンド定義。

**使用例:**
```
/review-pr 123
/plan-sprint
```

### rules/
Claude Codeが常に従うべきルールやガイドライン。

### hooks/
特定のイベント（ツール実行、プロンプト送信など）に反応する自動化。

### mcp-configs/
Model Context Protocol サーバー設定。

### plugins/
Claude Codeプラグイン情報。

### examples/
各種設定例とテンプレート。

## 利用可能なエージェント

以下の専門エージェントテンプレートが利用可能です（全てv3.0.0、プロジェクト非依存）：

- **tech-lead**: 技術選定とシステム設計（技術スタック、アーキテクチャ、API設計、セキュリティ）
- **ui-ux-designer**: UI/UXデザインとユーザビリティ改善（ワイヤーフレーム、画面遷移、デザインシステム）
- **data-modeler**: データベース設計とクエリ最適化（スキーマ設計、ER図、マイグレーション）
- **project-manager**: プロジェクト計画とタスク管理（タスク分解、マイルストーン、リスク管理）
- **backend-dev**: バックエンド実装とAPI開発（サーバーロジック、データベース統合、認証）
- **frontend-dev**: フロントエンド/モバイル実装（UI コンポーネント、状態管理、オフライン対応）
- **qa-tester**: テスト戦略と品質保証（ユニットテスト、統合テスト、E2Eテスト、パフォーマンス）
- **doc-writer**: ドキュメント作成と技術文書（ユーザーガイド、API ドキュメント、セットアップ）
- **devops-engineer**: インフラとデプロイメント（CI/CD、コンテナ化、モニタリング）

各エージェントはプロジェクト固有の情報を追記することで、あなたのプロジェクトに最適化されます。

## 更新

`claude_utilization/`配下のファイルを更新した場合、再度セットアップスクリプトを実行してください：

```bash
bash ~/workspace/claude_utilization/setup.sh
```

## 新規プロジェクトへの展開

### ステップ1: テンプレートをコピー

1. 新規プロジェクトのルートディレクトリに移動
2. セットアップスクリプトを実行して`.claude/`ディレクトリを作成

```bash
cd /path/to/your/project
bash ~/workspace/claude_utilization/setup.sh
```

### ステップ2: プロジェクト固有情報を追記 ⚠️ 重要

#### 方法1: 自動カスタマイズ（推奨）

Claude Codeの `/customize_agents` コマンドを使用して、対話形式で全エージェントファイルを自動的にカスタマイズできます：

```bash
cd /path/to/your/project
claude
```

Claude Codeセッション内で：
```
/customize_agents
```

コマンドが対話形式でプロジェクト情報を質問し、全エージェントファイルの編集セクションに自動的に追記します。

#### 方法2: 手動編集

コピーしたエージェントファイル（`.claude/agents/*.md`）を開き、`<!-- ✏️ EDIT THIS SECTION -->` マーカーがある箇所にプロジェクト固有の情報を追記してください。

**必須編集項目:**
- **Project Overview**: プロジェクト名、概要、ターゲット、プラットフォーム、MVP機能
- **Reference Documents**: プロジェクトの要件定義書や設計書へのパス

**推奨編集項目:**
- **Key Constraints & Priorities**: プロジェクトの制約や優先事項
- **Key Implementation Areas**: プロジェクト固有のAPI、画面、エンティティなど

各セクションにはHTML コメント内に記載例があるため、参考にしながら編集できます。

### ステップ3: Claude Codeで利用開始

プロジェクト情報を追記したら、Claude Codeを起動してエージェントを利用できます：

```
Use the tech-lead agent to design the system architecture for this project
Have the ui-ux-designer agent create wireframes based on our requirements
```

## ライセンス

このフレームワークは自由に使用・改変できます。
