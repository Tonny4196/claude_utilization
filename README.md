# Claude Utilization Framework

プロジェクト間で再利用可能なClaude Code設定を管理するための統一フレームワーク。

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

現在利用可能な専門エージェント：

- **tech-lead**: 技術選定とシステム設計
- **ui-ux-designer**: UI/UXデザインとユーザビリティ改善
- **data-modeler**: データベース設計とクエリ最適化
- **project-manager**: プロジェクト計画とタスク管理
- **backend-dev**: バックエンド実装とAPI開発
- **frontend-dev**: フロントエンド実装とUI開発
- **qa-tester**: テスト戦略と品質保証
- **doc-writer**: ドキュメント作成と技術文書

## 更新

`claude_utilization/`配下のファイルを更新した場合、再度セットアップスクリプトを実行してください：

```bash
bash ~/workspace/claude_utilization/setup.sh
```

## 新規プロジェクトへの展開

1. 新規プロジェクトのルートディレクトリに移動
2. セットアップスクリプトを実行
3. 必要に応じて`.claude/`配下の設定をプロジェクト固有にカスタマイズ

## ライセンス

このフレームワークは自由に使用・改変できます。
