# Hooks（フック）

特定のイベントに反応して自動的に実行されるスクリプトやプロンプトを定義するディレクトリ。

## 概要

Hooksは、Claude Codeの特定のイベント（ツール実行前後、プロンプト送信時など）に自動的に実行されるスクリプトやプロンプトです。

## フックの種類

### 利用可能なフックイベント

Claude Codeは以下のフックポイントをサポート（設定により異なる場合があります）：

- `user-prompt-submit`: ユーザーがプロンプトを送信した時
- `tool-use-pre`: ツール実行前
- `tool-use-post`: ツール実行後
- `session-start`: セッション開始時
- `session-end`: セッション終了時

## フックファイルの構造

フックはシェルスクリプトまたはMarkdownファイルとして定義できます。

### シェルスクリプトフック

```bash
#!/bin/bash
# hooks/pre-commit-check.sh

# コミット前にリンティングとテストを実行
npm run lint
npm run test
```

### Markdownフック（プロンプト型）

```markdown
コードを変更する前に、以下を確認してください：

1. 既存のテストが通過するか
2. コーディング規約に準拠しているか
3. セキュリティの問題がないか
```

## フックの使用例

### user-prompt-submit

ユーザーがプロンプトを送信するたびに実行されるチェック。

**例**: `user-prompt-submit.md`
```markdown
プロンプトを処理する前に、以下を確認：

- プロジェクトの最新状態を把握していますか？
- 関連するルールファイルを確認しましたか？
- 必要なドキュメントを読みましたか？
```

### tool-use-pre

ツール実行前のバリデーション。

**例**: `write-tool-pre.sh`
```bash
#!/bin/bash
# Writeツール実行前のチェック

if [[ "$1" == *"production"* ]]; then
  echo "WARNING: 本番環境のファイルを変更しようとしています"
  exit 1
fi
```

### tool-use-post

ツール実行後の処理。

**例**: `edit-tool-post.sh`
```bash
#!/bin/bash
# ファイル編集後に自動フォーマット

if [[ "$1" == *.ts ]] || [[ "$1" == *.tsx ]]; then
  npx prettier --write "$1"
fi
```

## StudyMate用の推奨フック

### 1. コード変更前チェック

**ファイル**: `user-prompt-submit.md`
```markdown
コードを変更する前に、StudyMateのコアプリンシプルを確認：

## 必須確認事項

### プロダクト哲学
- [ ] 「今日もやった自分」を静かに肯定する設計か？
- [ ] サボった日を責めない実装か？
- [ ] 明日も机に戻りやすい体験か？

### 技術的制約
- [ ] 15秒以内に記録完了できるか？
- [ ] オフライン対応を維持しているか？
- [ ] 60fpsのスムーズさを保っているか？

これらの原則に反する変更の場合、代替案を検討してください。
```

### 2. テスト実行フック

**ファイル**: `before-commit.sh`
```bash
#!/bin/bash
# コミット前に必須チェック

echo "🧪 テストを実行中..."
npm run test

if [ $? -ne 0 ]; then
  echo "❌ テストが失敗しました。コミットを中止してください。"
  exit 1
fi

echo "✅ テスト通過"

echo "🔍 リンティング中..."
npm run lint

if [ $? -ne 0 ]; then
  echo "❌ リンティングエラーがあります。"
  exit 1
fi

echo "✅ リンティング通過"
```

### 3. パフォーマンスチェック

**ファイル**: `performance-reminder.md`
```markdown
パフォーマンスに影響する変更を行う場合、以下を確認：

## チェックリスト

### アプリ起動時間
- [ ] 変更後も3秒以内で起動できるか？
- [ ] 不要な初期化処理を追加していないか？

### アニメーション
- [ ] 60fpsを維持できるか？
- [ ] 重い処理をメインスレッドで実行していないか？

### タイマー精度
- [ ] タイマーの精度に影響しないか？
- [ ] バックグラウンド動作を妨げないか？

問題がある場合は、最適化を優先してください。
```

### 4. セキュリティチェック

**ファイル**: `security-check.sh`
```bash
#!/bin/bash
# セキュリティチェック

echo "🔒 セキュリティチェック中..."

# シークレットのハードコードチェック
if git diff --cached | grep -E '(API_KEY|SECRET|PASSWORD|TOKEN).*=.*["\']'; then
  echo "❌ シークレット情報がハードコードされている可能性があります"
  exit 1
fi

# console.logのチェック
if git diff --cached | grep -E 'console\.(log|debug|info)'; then
  echo "⚠️  console.logが含まれています。削除することを検討してください"
fi

echo "✅ セキュリティチェック完了"
```

### 5. ドキュメント更新リマインダー

**ファイル**: `doc-reminder.md`
```markdown
以下の場合はドキュメントの更新を検討してください：

## ドキュメント更新が必要な変更

### API変更
- [ ] エンドポイントの追加・変更
- [ ] リクエスト/レスポンス形式の変更
- [ ] 認証方法の変更

→ `api-specification.md` を更新

### データモデル変更
- [ ] 新しいエンティティの追加
- [ ] フィールドの追加・削除
- [ ] リレーションシップの変更

→ `data-model-detailed.md` を更新

### UI/UX変更
- [ ] 新しい画面の追加
- [ ] 画面遷移の変更
- [ ] デザインシステムの更新

→ `wireframes.md`, `screen-specifications/` を更新

### 設定変更
- [ ] 環境変数の追加・変更
- [ ] ビルド設定の変更

→ `README.md`, `setup-guide.md` を更新
```

## カスタムフックの作成

### 1. フックファイルを作成

```bash
cd ~/workspace/claude_utilization/hooks
touch my-hook.sh
chmod +x my-hook.sh
```

### 2. フックスクリプトを記述

```bash
#!/bin/bash
# カスタムフックの説明

# フックのロジック
echo "フックを実行中..."

# 成功時は0を返す
exit 0
```

### 3. プロジェクトに適用

```bash
cd /path/to/your/project
bash ~/workspace/claude_utilization/setup.sh
```

## ベストプラクティス

### フック設計

1. **高速実行**: フックは可能な限り高速に
2. **明確なフィードバック**: 何をチェックしているか明示
3. **適切なエラーハンドリング**: 失敗時は明確なメッセージ
4. **副作用の最小化**: 不要な変更を加えない

### パフォーマンス

- 重い処理は避ける
- 必要な場合のみ実行
- キャッシュを活用
- 並列実行を検討

### エラーメッセージ

```bash
# ❌ 悪い例
echo "Error"

# ✅ 良い例
echo "❌ テストが失敗しました"
echo "   修正方法: npm run test を実行して詳細を確認"
```

### 条件付き実行

全ての変更で実行する必要がない場合は条件を追加：

```bash
#!/bin/bash

# TypeScriptファイルの変更時のみ
if [[ "$1" == *.ts ]] || [[ "$1" == *.tsx ]]; then
  npm run type-check
fi
```

## フックの無効化

特定のフックを一時的に無効にする場合：

```bash
# フックファイルをリネーム
mv hooks/my-hook.sh hooks/my-hook.sh.disabled
```

または、スクリプト内で条件分岐：

```bash
#!/bin/bash

# 環境変数で無効化可能に
if [ "$SKIP_HOOKS" = "true" ]; then
  exit 0
fi

# フック本体
```

## 注意事項

### セキュリティ

- フックスクリプトは実行権限を持つ
- 信頼できるスクリプトのみ配置
- ユーザー入力をそのまま実行しない

### パフォーマンス

- フックが重いとClaude Codeの応答が遅くなる
- 必要最小限のチェックに留める
- タイムアウトを設定

### デバッグ

フックのデバッグ：

```bash
#!/bin/bash

# デバッグモード
set -x  # コマンドを表示
set -e  # エラーで停止

# フック本体
```

## 現在の状態

このディレクトリは現在空です。プロジェクトのニーズに応じてフックを追加できます。

## 参考リンク

- [../README.md](../README.md) - フレームワーク全体の説明
- [../rules/README.md](../rules/README.md) - Rulesとの違い
