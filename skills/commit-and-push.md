---
name: commit-and-push
description: 作業完了後にGitHubにcommit/pushを行い、自動的にPRを作成。Protectedブランチで作業中の場合は自動的に作業ブランチを作成
tools: Bash, Read
model: sonnet
---

# Commit, Push and Create PR

作業が完了した際に、GitHubへのcommitとpushを自動的に行い、プルリクエストを作成するスキル。
Protected ブランチ（develop, main, production）で作業している場合は、自動的に作業ブランチを作成してからcommit/push/PR作成を実行します。

## 目的

- 作業完了後のcommit/push/PR作成プロセスを自動化
- Protected ブランチでの直接作業を防止
- 適切なブランチ命名規則に従った作業ブランチの自動作成
- 変更内容を解析した詳細なPR説明文の自動生成

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

### 7. ベースブランチの特定

作業ブランチが作成された元のProtectedブランチを特定します。

```bash
# reflogから作業ブランチ作成時の元ブランチを取得
git reflog show HEAD | grep "checkout: moving from" | head -1

# または merge-base で共通祖先から推定
git merge-base HEAD main
git merge-base HEAD develop
git merge-base HEAD production
```

**フォールバック順序:**
1. git reflog から取得
2. git merge-base で最も新しい共通祖先を持つブランチ
3. リポジトリのデフォルトブランチ（`gh repo view --json defaultBranchRef`）
4. ハードコードされた "main"

### 8. PR説明文の自動生成

git diffとgit logから変更内容を解析し、詳細なPR説明文を生成します。

```bash
# コミット履歴の取得
git log ${BASE_BRANCH}..HEAD --format="%s%n%n%b"

# 変更ファイルの統計
git diff ${BASE_BRANCH}..HEAD --stat

# 変更ファイルの一覧
git diff ${BASE_BRANCH}..HEAD --name-status
```

**PR説明文のフォーマット:**

```markdown
## Summary

[変更の要約 - コミットメッセージから生成]

## Changes

### [カテゴリ1: Documentation/Features/etc.]
- Added/Updated/Deleted [ファイル名]: [説明]
- ...

### [カテゴリ2]
- ...

## Testing

- [テストファイルの変更があれば記載]
- [なければ manual testing performed と記載]

## Review Checklist

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Security considerations reviewed
- [ ] Performance impact assessed
```

**セクション別生成ロジック:**

- **Summary**: 最新のコミットメッセージ、または複数コミットの統合要約
- **Changes**: ファイルタイプごとにグループ化（Documentation, Features, Tests, Configuration）
- **Testing**: テスト関連ファイル（test/, *.test.*, *.spec.*）の変更を検出
- **Review Checklist**: 固定テンプレート + 動的追加（ドキュメント変更があれば自動チェック）

### 9. プルリクエストの作成

```bash
# PR作成
gh pr create \
  --title "${COMMIT_TITLE}" \
  --body "${PR_DESCRIPTION}" \
  --base "${BASE_BRANCH}"

# PR URL の表示
echo "Pull request created: ${PR_URL}"
```

**作成されるPRの特徴:**
- タイトル: 最新のコミットメッセージの件名
- 説明: 自動生成された詳細な説明文
- ベース: 作業を開始した元のブランチ

## 成果物

- GitHubリポジトリに反映されたコミット
- 必要に応じて作成された作業ブランチ
- リモートブランチとの同期
- 自動生成されたプルリクエスト
- 詳細な変更内容を含むPR説明文

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

### GitHub CLIが未インストール

```
gh: command not found
```

→ GitHub CLI のインストール方法を案内
- macOS: `brew install gh`
- その他: https://cli.github.com/

### GitHub CLI認証エラー

```
error: authentication required
```

→ `gh auth login` の実行を案内
- 認証状態の確認: `gh auth status`

### PR既存エラー

既に同じブランチのPRが存在する場合:
- 既存PRのURLを表示
- PR説明文の更新を提案（`gh pr edit`）
- またはそのまま処理を完了

### ベースブランチ検出失敗

自動検出できない場合:
- デフォルトブランチ（main）を使用
- 検出結果をユーザーに表示
- `--base` オプションで明示的に指定可能

### PR作成失敗

```
error: pull request create failed
```

考えられる原因:
- ベースブランチとの差分がない
- ブランチ保護ルールの制約
- ネットワークエラー

→ 手動PR作成を案内、または再試行を提案

## 前提条件

- Gitリポジトリが初期化されていること
- リモートリポジトリ（origin）が設定されていること
- 認証情報が設定されていること（SSH key または credential helper）
- コミットするべき変更が存在すること
- **GitHub CLI (gh) がインストールされていること**
- **GitHub CLI で認証が完了していること (`gh auth login`)**

## セーフガード

- **Protected ブランチへの直接プッシュを防止**: develop/main/productionブランチで作業中の場合、自動的に作業ブランチを作成
- **PR既存チェック**: 同じブランチのPRが既に存在する場合、新規作成せず既存PRの説明文を更新
- **ベースブランチの自動検出**: 複数のフォールバック戦略により、適切なベースブランチを自動検出
- **コミット前に変更内容を確認**: `git status`で変更ファイルを確認
- **エラー発生時は詳細なメッセージを表示**: 問題の原因と解決方法を明示
- **GitHub CLI認証チェック**: PR作成前に認証状態を確認

## 使用例

### 基本的な使用

```plaintext
作業が完了したので、変更をGitHubにpushしてPRを作成してください
```

**実行内容:**
1. 変更をステージング（`git add .`）
2. コミット作成（コミットメッセージは変更内容から自動生成）
3. リモートにプッシュ
4. ベースブランチを検出（例: main）
5. PR説明文を自動生成
6. PRを作成し、URLを表示

### Protected ブランチからの使用

```plaintext
mainブランチで作業していますが、この変更をcommitしてpushしてPRを作成してください
```

**実行内容:**
1. 現在のブランチがProtected（main）であることを検出
2. 新しい作業ブランチを作成（例: `feature/add-authentication`）
3. 作業ブランチに切り替え
4. 変更をステージング
5. コミット作成
6. リモートにプッシュ
7. ベースブランチ（main）を検出
8. PR説明文を自動生成
9. main に対してPRを作成

### カスタムコミットメッセージ指定

```plaintext
"feat: Add user authentication system" というメッセージでcommitしてPRを作成してください
```

**実行内容:**
- 指定されたコミットメッセージを使用
- その他の処理は基本的な使用と同じ

### PR作成のスキップ

```plaintext
作業をcommitしてpushしてください。ただし、PRは作成しないでください
```

**実行内容:**
- commit/pushのみ実行
- PR作成をスキップ（`--skip-pr`オプション相当）

### ドラフトPRの作成

```plaintext
ドラフトPRとして作成してください
```

**実行内容:**
- 通常のワークフローを実行
- PRをドラフト状態で作成（`--pr-draft`オプション相当）

### ベースブランチの明示的指定

```plaintext
developブランチに対してPRを作成してください
```

**実行内容:**
- ベースブランチとして `develop` を使用
- 自動検出をスキップ（`--base develop`オプション相当）

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
[変更をステージング]       [ベースブランチ特定]
    ↓                          ↓
[コミット作成]             [git diff/log解析]
    ↓                          ↓
[リモートにプッシュ]       [PR説明文生成]
    ↓                          ↓
[ベースブランチ特定]       [gh pr create実行]
    ↓                          ↓
[git diff/log解析]         [PR URL表示]
    ↓                          ↓
[PR説明文生成]             [完了]
    ↓
[gh pr create実行]
    ↓
[PR URL表示]
    ↓
[完了]
```

## カスタマイズオプション

スキル実行時に以下のオプションを指定可能：

- **commit-message**: カスタムコミットメッセージ
- **branch-name**: 作業ブランチ名（Protected ブランチの場合）
- **force-push**: 強制プッシュ（注意が必要）
- **skip-branch-creation**: Protected ブランチでもブランチ作成をスキップ（非推奨）
- **base-branch**: PRのベースブランチを明示的に指定
- **skip-pr**: PR作成をスキップ
- **pr-draft**: ドラフトPRとして作成

## 注意事項

1. **Protected ブランチへの直接プッシュ**
   - このスキルは自動的に新しいブランチを作成しますが、GitHub側でブランチ保護ルールが設定されている場合は、プルリクエストを作成する必要があります

2. **コミットメッセージの品質**
   - 自動生成されたコミットメッセージは、常にレビューすることを推奨します

3. **大量の変更**
   - 大量のファイル変更がある場合は、複数のコミットに分割することを検討してください

4. **認証エラー**
   - SSH keyまたはPersonal Access Tokenが正しく設定されていることを確認してください

5. **GitHub CLI認証**
   - 初回使用時は `gh auth login` を実行してGitHubアカウントと連携してください
   - 認証状態は `gh auth status` で確認できます

6. **PR説明文の品質**
   - 自動生成されたPR説明文は、必要に応じて手動で編集できます
   - `gh pr edit [PR番号] --body "新しい説明"` で後から更新可能

7. **ベースブランチの確認**
   - 自動検出されたベースブランチが正しいか確認してください
   - 誤っている場合は `--base` オプションで明示的に指定できます

## 関連スキル

- **sync-with-upstream**: アップストリームとの同期（今後実装予定）
- **cherry-pick-commits**: コミットのcherry-pick（今後実装予定）
