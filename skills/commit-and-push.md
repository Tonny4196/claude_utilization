---
name: commit-and-push
description: 作業完了後にGitHubにcommit/pushを行う。Protectedブランチで作業中の場合は自動的に作業ブランチを作成
tools: Bash, Read
model: sonnet
---

# Commit and Push to GitHub

作業が完了した際に、GitHubへのcommitとpushを自動的に行うスキル。
Protected ブランチ（develop, main, production）で作業している場合は、自動的に作業ブランチを作成してからcommit/pushを実行します。

## 目的

- 作業完了後のcommit/pushプロセスを自動化
- Protected ブランチでの直接作業を防止
- 適切なブランチ命名規則に従った作業ブランチの自動作成

## Protected ブランチ

以下のブランチはProtectedブランチとして扱われます：
- `develop`
- `main`
- `production`

これらのブランチで作業中の場合、自動的に作業ブランチが作成されます。

## 実行手順

### 1. 現在のブランチを確認

```bash
git branch --show-current
```

### 2. Protected ブランチチェック

現在のブランチが以下のいずれかの場合：
- develop
- main
- production

新しい作業ブランチを作成します。

### 3. 作業ブランチの作成（Protected ブランチの場合のみ）

ブランチ命名規則: `feature/<説明的な名前>` または `fix/<説明的な名前>`

```bash
# 例: feature/add-user-authentication
git checkout -b feature/<branch-name>
```

**ブランチ名の決定方法:**
- 最近のコミットメッセージや変更内容から推測
- ユーザーに確認が必要な場合は質問する

### 4. 変更のステージング

```bash
# 変更されたファイルを確認
git status

# 全ての変更をステージング
git add .
```

### 5. コミット

```bash
# コミットメッセージを作成
git commit -m "<meaningful-commit-message>"
```

**コミットメッセージのガイドライン:**
- 変更内容を簡潔に説明
- プレフィックスを使用（例: feat:, fix:, docs:, refactor:）
- 必要に応じてユーザーに確認

### 6. プッシュ

```bash
# 現在のブランチをリモートにプッシュ
git push origin <current-branch>

# 新規ブランチの場合は upstream を設定
git push -u origin <current-branch>
```

## 成果物

- GitHubリポジトリに反映されたコミット
- 必要に応じて作成された作業ブランチ
- リモートブランチとの同期

## エラーハンドリング

### 未コミットの変更がない場合

```
Nothing to commit, working tree clean
```

→ ユーザーに変更がないことを通知し、処理を終了

### プッシュの競合

```
error: failed to push some refs
```

→ プルしてからプッシュするようユーザーに提案

### ブランチ名の競合

同名のブランチが既に存在する場合:
- ユーザーに別の名前を提案
- または既存ブランチへの切り替えを提案

### リモートリポジトリが設定されていない

```
fatal: No configured push destination
```

→ リモートリポジトリの設定をユーザーに依頼

## 前提条件

- Gitリポジトリが初期化されていること
- リモートリポジトリ（origin）が設定されていること
- 認証情報が設定されていること（SSH key または credential helper）
- コミットするべき変更が存在すること

## セーフガード

- Protected ブランチへの直接プッシュを防止
- コミット前に変更内容を確認
- プッシュ前にユーザーへの最終確認（オプション）
- エラー発生時は詳細なメッセージを表示

## 使用例

### 基本的な使用

```plaintext
作業が完了したので、変更をGitHubにpushしてください
```

### Protected ブランチからの使用

```plaintext
mainブランチで作業していますが、この変更をcommitしてpushしてください
```

→ 自動的に `feature/...` ブランチを作成してからcommit/push

### カスタムコミットメッセージ指定

```plaintext
"feat: Add user authentication system" というメッセージでcommitしてpushしてください
```

## ワークフロー図

```
[作業完了]
    ↓
[現在のブランチ確認]
    ↓
[Protected ブランチ?] ─No→ [変更をステージング]
    ↓Yes                      ↓
[作業ブランチ作成]         [コミット作成]
    ↓                          ↓
[新ブランチに切り替え]     [リモートにプッシュ]
    ↓                          ↓
[変更をステージング]       [完了]
    ↓
[コミット作成]
    ↓
[リモートにプッシュ]
    ↓
[完了]
```

## カスタマイズオプション

スキル実行時に以下のオプションを指定可能：

- **commit-message**: カスタムコミットメッセージ
- **branch-name**: 作業ブランチ名（Protected ブランチの場合）
- **force-push**: 強制プッシュ（注意が必要）
- **skip-branch-creation**: Protected ブランチでもブランチ作成をスキップ（非推奨）

## 注意事項

1. **Protected ブランチへの直接プッシュ**
   - このスキルは自動的に新しいブランチを作成しますが、GitHub側でブランチ保護ルールが設定されている場合は、プルリクエストを作成する必要があります

2. **コミットメッセージの品質**
   - 自動生成されたコミットメッセージは、常にレビューすることを推奨します

3. **大量の変更**
   - 大量のファイル変更がある場合は、複数のコミットに分割することを検討してください

4. **認証エラー**
   - SSH keyまたはPersonal Access Tokenが正しく設定されていることを確認してください

## 関連スキル

- **create-pull-request**: プルリクエストの作成（今後実装予定）
- **sync-with-upstream**: アップストリームとの同期（今後実装予定）
- **cherry-pick-commits**: コミットのcherry-pick（今後実装予定）
