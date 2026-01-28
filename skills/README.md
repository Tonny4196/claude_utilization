# Skills（スキル）

特定のワークフローやドメイン知識を持つスキル定義を格納するディレクトリ。

## 概要

Skillsは、複雑なワークフローや特定ドメインの専門知識をカプセル化したものです。エージェントよりも具体的なタスク実行にフォーカスします。

## Agentsとの違い

| 項目 | Agents | Skills |
|------|--------|--------|
| 抽象度 | 高い（役割ベース） | 低い（タスクベース） |
| 用途 | 設計・実装全般 | 特定ワークフロー実行 |
| 呼び出し | Task tool | Skill tool |
| 例 | tech-lead, backend-dev | deploy-to-production, run-migration |

## 使用例

### スキルの定義例

```yaml
---
name: deploy-to-production
description: アプリケーションを本番環境にデプロイする
tools: Bash, Read
---

本番環境へのデプロイを実行します。

## 前提条件

- ビルドが成功していること
- テストが全て通過していること
- 環境変数が設定されていること

## 実行手順

1. ビルド成果物の確認
2. 環境変数の検証
3. デプロイスクリプトの実行
4. ヘルスチェック
5. ロールバック準備

## セーフガード

- 本番環境への影響を最小化
- 問題発生時は即座にロールバック
- デプロイログを詳細に記録
```

### スキルの呼び出し

```plaintext
Use the deploy-to-production skill to deploy the backend service
```

## スキルの種類（例）

### デプロイ・リリース系

- **deploy-to-staging**: ステージング環境へのデプロイ
- **deploy-to-production**: 本番環境へのデプロイ
- **rollback-deployment**: デプロイのロールバック
- **create-release**: リリースノート作成とタグ付け

### データベース操作系

- **run-migration**: データベースマイグレーション実行
- **seed-database**: テストデータの投入
- **backup-database**: データベースバックアップ
- **optimize-queries**: クエリ最適化分析

### テスト・検証系

- **run-e2e-tests**: E2Eテストの実行
- **performance-test**: パフォーマンステスト実行
- **security-audit**: セキュリティ監査
- **accessibility-check**: アクセシビリティチェック

### コード品質系

- **code-review**: コードレビュー実行
- **refactor-legacy**: レガシーコードのリファクタリング
- **update-dependencies**: 依存関係の更新
- **fix-linting**: リンティングエラーの修正

### ドキュメント系

- **generate-api-docs**: API仕様書の自動生成
- **update-changelog**: CHANGELOGの更新
- **create-pr-description**: プルリクエスト説明の作成

## スキルファイルの構造

```markdown
---
name: skill-name
description: スキルの説明
tools: [使用するツールのリスト]
model: sonnet  # または haiku（高速実行が必要な場合）
---

# スキル名

## 目的

このスキルが解決する問題

## 前提条件

- 条件1
- 条件2

## 実行手順

1. ステップ1
2. ステップ2
3. ステップ3

## 成果物

実行後に生成されるもの

## エラーハンドリング

エラー時の対処方法

## 使用例

具体的な使用例
```

## カスタムスキルの作成

### 1. スキルファイルを作成

```bash
cd ~/workspace/claude_utilization/skills
touch my-custom-skill.md
```

### 2. スキル定義を記述

```markdown
---
name: my-custom-skill
description: カスタムスキルの説明
tools: Bash, Read, Write
model: sonnet
---

# カスタムスキル

[スキルの詳細な説明]
```

### 3. プロジェクトに適用

```bash
cd /path/to/your/project
bash ~/workspace/claude_utilization/setup.sh
```

## ベストプラクティス

### スキル設計

1. **具体的なタスク**: スキルは具体的で実行可能なタスクに特化
2. **冪等性**: 同じスキルを複数回実行しても安全
3. **明確な前提条件**: 実行前に満たすべき条件を明示
4. **適切なエラーハンドリング**: 失敗時の対処方法を定義

### 命名規則

- 動詞で始める（deploy-, run-, create-, update-）
- ハイフン区切り（kebab-case）
- 具体的で分かりやすい名前

### ドキュメント

- 前提条件を明確に
- 実行手順を詳細に
- エラーケースを網羅
- 使用例を含める

## Skills vs Agents の使い分け

### Agentsを使うべき場合

- 設計や計画などの高レベルな判断が必要
- 複数の成果物を作成する
- 長期的なコンテキストが必要
- 役割ベースのタスク分担

**例**:
```
Use the tech-lead agent to design the system architecture
```

### Skillsを使うべき場合

- 定型的なワークフローの実行
- 自動化可能なタスク
- 繰り返し実行するオペレーション
- 具体的な1つの成果物

**例**:
```
Use the deploy-to-staging skill to deploy the latest build
```

## 現在の状態

以下のスキルが利用可能です：

### Git/GitHub操作系

- **commit-and-push**: 作業完了後にGitHubにcommit/pushを行う。Protectedブランチ（develop, main, production）で作業中の場合は自動的に作業ブランチを作成

プロジェクトのニーズに応じてさらにカスタムスキルを追加できます。

### 推奨される最初のスキル

プロジェクトの種類に応じて、以下のようなスキルを作成することを推奨：

**モバイルアプリプロジェクト:**
1. **run-mobile-tests**: モバイルアプリのテスト実行
2. **build-ios**: iOSアプリのビルド
3. **build-android**: Androidアプリのビルド
4. **deploy-backend**: バックエンドのデプロイ
5. **run-migration**: データベースマイグレーション

**Webアプリプロジェクト:**
1. **run-unit-tests**: ユニットテストの実行
2. **build-production**: 本番ビルドの作成
3. **deploy-frontend**: フロントエンドのデプロイ
4. **deploy-backend**: バックエンドのデプロイ
5. **run-e2e-tests**: E2Eテストの実行

## 参考リンク

- [../README.md](../README.md) - フレームワーク全体の説明
- [../agents/README.md](../agents/README.md) - Agentsとの比較
