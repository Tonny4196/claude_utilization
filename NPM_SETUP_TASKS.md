# npmパッケージ化タスク指示書

## 概要
claude_utilizationをnpmパッケージとして公開し、`npx`コマンドで最新版を自動取得・セットアップできるようにする。

---

## タスク1: package.json作成 ✅ (完了)

### 目的
npmパッケージの基本情報を定義する

### 作成内容
- パッケージ名: `claude-utilization-setup`
- bin エントリー: `./bin/cli.js`
- 依存パッケージ: node-fetch, adm-zip, chalk
- files フィールド: 公開するファイル/ディレクトリを指定

### 完了条件
- package.jsonが作成され、適切なメタデータが設定されている

---

## タスク2: CLIツール実装 (bin/cli.js)

### 目的
GitHubから最新のブランチを取得し、.claudeディレクトリにセットアップするCLIツールを実装

### 実装機能
1. **コマンドライン引数処理**
   - `--branch <branch>`: 取得するブランチ指定（デフォルト: main）
   - `--dry-run`: テスト実行
   - `--help`: ヘルプ表示

2. **GitHub連携**
   - GitHubのtarball URLから最新コードをダウンロード
   - URL: `https://github.com/Tonny4196/claude_utilization/archive/refs/heads/{branch}.zip`

3. **ファイル操作**
   - zipファイルのダウンロード・展開
   - agents/, skills/, commands/, rules/, hooks/, mcp-configs/, plugins/ を .claude/ にコピー
   - 一時ファイルのクリーンアップ

4. **ユーザーフィードバック**
   - chalkでカラー出力
   - 進捗状況を視覚的に表示

### 技術仕様
- Node.js標準モジュール: fs, path, https
- 外部依存: adm-zip (zip展開), chalk (カラー出力)
- shebang: `#!/usr/bin/env node`
- 実行権限: chmod +x

### 完了条件
- bin/cli.js が実装されている
- 実行権限が付与されている
- エラーハンドリングが適切に実装されている

---

## タスク3: .npmignore作成

### 目的
npm公開時に不要なファイルを除外する

### 除外対象
```
.git
.github
.claude
node_modules
*.log
.DS_Store
.tmp-*
setup.sh
verify.sh
GENERALIZATION_*.md
OPTIMIZATION.md
QUICKSTART.md
NPM_SETUP_TASKS.md
```

### 含めるもの
- bin/
- agents/, skills/, commands/, rules/, hooks/, mcp-configs/, plugins/
- README.md
- package.json
- LICENSE (あれば)

### 完了条件
- .npmignoreが作成され、適切なファイルが除外される設定になっている

---

## タスク4: ローカルテスト

### 目的
npm公開前にローカル環境で動作確認

### テスト手順
1. **依存パッケージのインストール**
   ```bash
   npm install
   ```

2. **実行権限の付与**
   ```bash
   chmod +x bin/cli.js
   ```

3. **ローカルリンク**
   ```bash
   npm link
   ```

4. **別プロジェクトでテスト**
   ```bash
   cd /path/to/test-project
   claude-utilization-setup --dry-run
   claude-utilization-setup
   ```

5. **npxテスト（ローカル）**
   ```bash
   npx /path/to/claude_utilization
   ```

### 確認項目
- [ ] GitHubから正しくダウンロードできる
- [ ] zipが正しく展開される
- [ ] .claude/にファイルがコピーされる
- [ ] --branch オプションが動作する
- [ ] --dry-run オプションが動作する
- [ ] エラー時に適切なメッセージが表示される
- [ ] カラー出力が正しく表示される

### 完了条件
- すべての確認項目がクリアされている
- エラーなく動作する

---

## タスク5: README更新

### 目的
npmパッケージとしての使用方法を追加

### 追加セクション

#### インストール方法（セットアップ）セクションを更新

**Before:**
```bash
bash ~/workspace/claude_utilization/setup.sh
```

**After:**
```bash
# 方法1: npxで実行（推奨）
npx claude-utilization-setup

# 方法2: グローバルインストール
npm install -g claude-utilization-setup
claude-utilization-setup

# オプション
npx claude-utilization-setup --branch production  # 別ブランチ指定
npx claude-utilization-setup --dry-run            # テスト実行
```

#### npm公開手順セクションを追加

```markdown
## npm公開手順（メンテナー向け）

### 初回公開
1. npmアカウントでログイン
   ```bash
   npm login
   ```

2. パッケージ公開
   ```bash
   npm publish
   ```

### 更新公開
1. バージョンアップ
   ```bash
   npm version patch  # 1.0.0 → 1.0.1
   npm version minor  # 1.0.0 → 1.1.0
   npm version major  # 1.0.0 → 2.0.0
   ```

2. 公開
   ```bash
   npm publish
   ```

3. Gitにプッシュ
   ```bash
   git push origin main --tags
   ```
```

### 完了条件
- README.mdが更新され、npmパッケージとしての使用方法が明記されている

---

## タスク6: npm公開

### 目的
npmレジストリに公開し、誰でも使えるようにする

### 前提条件
- npmアカウントを持っている
- パッケージ名が利用可能（重複していない）

### 公開手順
1. **npmログイン**
   ```bash
   npm login
   ```

2. **パッケージ名の確認**
   ```bash
   npm search claude-utilization-setup
   ```
   ※ 既に存在する場合は package.json の name を変更

3. **公開前チェック**
   ```bash
   npm publish --dry-run
   ```

4. **公開**
   ```bash
   npm publish
   ```

5. **確認**
   ```bash
   npm info claude-utilization-setup
   ```

### トラブルシューティング
- パッケージ名が使用済み → package.jsonのnameを変更（例: `@username/claude-utilization-setup`）
- 権限エラー → `npm login` でログイン確認
- 2FAが必要 → npmのワンタイムパスワードを入力

### 完了条件
- npmレジストリに公開されている
- `npx claude-utilization-setup` で実行できる

---

## オプションタスク: GitHub Actions自動公開

### 目的
タグをプッシュすると自動的にnpmに公開される

### 実装内容
.github/workflows/publish.yml を作成

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 設定手順
1. npmアクセストークンを取得
2. GitHubリポジトリのSecrets に NPM_TOKEN を追加
3. ワークフローファイルをコミット

### 完了条件
- GitHub Actionsが設定されている
- タグプッシュ時に自動公開される

---

## 進行状況

- [x] タスク1: package.json作成
- [ ] タスク2: CLIツール実装
- [ ] タスク3: .npmignore作成
- [ ] タスク4: ローカルテスト
- [ ] タスク5: README更新
- [ ] タスク6: npm公開
- [ ] オプション: GitHub Actions自動公開
