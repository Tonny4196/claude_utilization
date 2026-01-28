# シンプルな汎用化改修方針

## エグゼクティブサマリー

claude_utilizationは、Claude Codeを使ったVibe Codingに必要な汎用的な設定・サブエージェント・ルールを管理するテンプレートリポジトリです。

**運用方法**:
1. 各プロジェクトの`.claude/`にこのリポジトリの内容をコピー
2. プロジェクト固有の情報を直接編集して追記
3. そのまま使用開始

**課題**: 現在のエージェントファイルにStudyMate固有の情報がハードコードされており、他プロジェクトで使用する際に全エージェントを手動で書き換える必要がある。

**解決策**: StudyMate固有の情報を削除し、明確なプレースホルダーとガイドラインを配置する。

---

## 1. 現状分析

### StudyMate固有情報の所在

全エージェントファイル（10個）で以下の箇所にStudyMate固有の情報が含まれている:

#### 1. Frontmatter（全エージェント共通）
```yaml
description: Backend development specialist for StudyMate project. Use for...
```

#### 2. Project Overviewセクション（全エージェント共通）
```markdown
## Project Overview

**StudyMate** is a learning tracking app with the core concept: **"今日もやった自分"を静かに肯定できて、明日も机に戻りやすくなる**

- **Target**: TERAKOYA community (first 100 users)
- **Platform**: Mobile-first (iOS/Android), future web support
- **MVP Features**: Timer, recording, subject management, weekly progress, cloud sync
```

#### 3. Reference Documentsセクション（tech-lead等）
```markdown
## Reference Documents

**MUST READ before making decisions:**

- **Requirements**: `/Users/tomohirotakahashi/Documents/Obsidian Vault/studymate/要件定義.md`
- **Agent Instructions**: `/Users/tomohirotakahashi/Documents/Obsidian Vault/studymate/エージェント作成指示書.md`
- ...
```

#### 4. Key Constraints & Priorities（tech-lead等）
```markdown
### Non-Functional Requirements (CRITICAL)
- **Recording completion**: Maximum 15 seconds
- **App startup**: Within 3 seconds
- **Smooth animations**: 60fps
- **Offline support**: MANDATORY
- **Cloud sync**: MANDATORY

### Product Philosophy (MUST FOLLOW)
- **Continuity ease > Information accuracy**
- **Emotional lightness > Record comprehensiveness**
- ...
```

#### 5. Key Implementation Areas（backend-dev, frontend-dev等）
```markdown
### Subject Management
- `GET /subjects` - List user's subjects
- `POST /subjects` - Create subject
- ...

### Study Sessions
- `GET /sessions` - List sessions with filters
- ...
```

---

## 2. 改修方針

### 原則

1. **複雑な仕組みは導入しない**
   - project.json、テンプレートエンジン、CLI等は不要
   - エージェントファイルを直接編集する方式を維持

2. **明確なガイドラインを提供**
   - どこを編集すべきか明確に示す
   - プレースホルダーと記入例を提供
   - README/QUICKSTARTで運用方法を詳しく説明

3. **既存の構造を維持**
   - エージェント間の依存関係、ハンドオフプロトコルは変更しない
   - permissionMode、tools等の設定も維持

### 具体的な変更内容

#### A. Frontmatter description
**現在**:
```yaml
description: Backend development specialist for StudyMate project. Use for...
```

**変更後**:
```yaml
description: Backend development specialist. Use for API implementation, database setup, authentication, and server-side logic.
```

**理由**: プロジェクト名を削除し、汎用的な説明に変更

---

#### B. Project Overviewセクション
**現在**:
```markdown
## Project Overview

**StudyMate** is a learning tracking app with the core concept: **"今日もやった自分"を静かに肯定できて、明日も机に戻りやすくなる**

- **Target**: TERAKOYA community (first 100 users)
- **Platform**: Mobile-first (iOS/Android), future web support
- **MVP Features**: Timer, recording, subject management, weekly progress, cloud sync
```

**変更後**:
```markdown
## Project Overview

<!-- ✏️ EDIT THIS SECTION: Add your project information -->

**[YOUR PROJECT NAME]** is [brief description of your project and its core concept/value proposition].

- **Target**: [Your target audience/initial users]
- **Platform**: [Your platform: Web, Mobile, Desktop, CLI, etc.]
- **MVP Features**: [List 3-5 core MVP features]

<!-- Example:
**TaskMaster** is a team task management tool designed to help small dev teams stay organized.

- **Target**: Small to medium development teams (10-50 members)
- **Platform**: Web application (React + Node.js), future mobile support
- **MVP Features**: Task creation, team collaboration, kanban board, notifications, integrations
-->
```

**理由**:
- 明確なプレースホルダーと記入ガイドを提供
- HTMLコメント内に記入例を配置
- ユーザーが何を記入すべきか一目瞭然

---

#### C. Reference Documentsセクション
**現在**:
```markdown
## Reference Documents

**MUST READ before making decisions:**

- **Requirements**: `/Users/tomohirotakahashi/Documents/Obsidian Vault/studymate/要件定義.md`
- **Agent Instructions**: `/Users/tomohirotakahashi/Documents/Obsidian Vault/studymate/エージェント作成指示書.md`
- ...
```

**変更後**:
```markdown
## Reference Documents

<!-- ✏️ EDIT THIS SECTION: Add paths to your project documents -->

**MUST READ before making decisions:**

- **Requirements**: `[Path to your requirements document]`
- **Product Concept**: `[Path to your product concept document]`
- **Technical Specifications**: `[Path to your technical specs]`
- _(Add more as needed)_

<!-- Example:
- **Requirements**: `./docs/requirements.md`
- **Product Concept**: `./docs/product-concept.md`
- **API Specification**: `./docs/api-spec.md`
- **Database Schema**: `./docs/database-schema.md`
-->

<!-- Note: If you don't have these documents yet, you can:
1. Ask the tech-lead agent to create them
2. Create them yourself and list paths here
3. Remove this section if not applicable for your project
-->
```

**理由**:
- 絶対パスを削除
- 記入例と注意事項を提供
- ドキュメントがない場合の対処法も明示

---

#### D. Key Constraints & Priorities（tech-leadなど一部エージェント）
**現在**:
```markdown
### Non-Functional Requirements (CRITICAL)
- **Recording completion**: Maximum 15 seconds
- **App startup**: Within 3 seconds
- **Smooth animations**: 60fps
- **Offline support**: MANDATORY
- **Cloud sync**: MANDATORY

### Product Philosophy (MUST FOLLOW)
- **Continuity ease > Information accuracy**
- **Emotional lightness > Record comprehensiveness**
- ...
```

**変更後**:
```markdown
<!-- ✏️ EDIT THIS SECTION: Add your project's constraints and priorities -->

### Non-Functional Requirements

- **[Requirement name]**: [Target/Description]
- **[Requirement name]**: [Target/Description]
- _(Add more as needed)_

<!-- Example:
### Non-Functional Requirements
- **Page load time**: Maximum 2 seconds
- **API response time**: <200ms (p95)
- **Concurrent users**: Support 1000+ concurrent users
- **Uptime**: 99.9% availability
- **Security**: HTTPS, JWT authentication, RBAC
-->

### Product Philosophy

- **[Priority 1] > [Priority 2]**
- **[Priority 3] > [Priority 4]**
- _(Add principles that guide your product decisions)_

<!-- Example:
### Product Philosophy
- **User experience > Feature richness**
- **Performance > Visual complexity**
- **Security > Convenience**
- Make onboarding seamless
- Never lose user data
-->
```

**理由**:
- StudyMate固有の要件を削除
- 記入例で記入方法を明示
- プロジェクトに応じて柔軟に編集可能

---

#### E. Key Implementation Areas（backend-dev、frontend-dev等）

**現在**:
```markdown
### Subject Management
- `GET /subjects` - List user's subjects
- `POST /subjects` - Create subject
- `PATCH /subjects/:id` - Update subject
- `DELETE /subjects/:id` - Delete subject (soft delete)

### Study Sessions
- `GET /sessions` - List sessions with filters
- ...
```

**変更後**:
```markdown
<!-- ✏️ EDIT THIS SECTION: Add your project's key implementation areas -->

### [Entity/Feature Name 1]
- `[HTTP METHOD] /[endpoint]` - [Description]
- `[HTTP METHOD] /[endpoint]` - [Description]
- _(Add more endpoints)_

### [Entity/Feature Name 2]
- `[HTTP METHOD] /[endpoint]` - [Description]
- _(Add more endpoints)_

<!-- Example:
### User Management
- `GET /users` - List all users (admin only)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user (soft delete)

### Task Management
- `GET /tasks` - List tasks with filters
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:id/assign` - Assign task to user
-->

<!-- Note: This section is specific to your project's domain.
- For backend-dev: List API endpoints
- For frontend-dev: List UI components/screens
- Adapt based on your project's needs
-->
```

**理由**:
- StudyMate固有のエンティティを削除
- 汎用的なプレースホルダーに変更
- 記入例でパターンを示す
- エージェントごとに適切な内容を記入できるようガイド

---

## 3. 実装ステップ

### Step 1: agents/README.mdを更新
エージェント利用者向けに、プロジェクト固有情報の追記方法を説明する。

### Step 2: 全10エージェントファイルを汎用化
各エージェントで以下を実施:
1. Frontmatter descriptionからプロジェクト名削除
2. Project Overviewをプレースホルダーに置換
3. Reference Documentsをプレースホルダーに置換
4. Key Constraints & Priorities（該当エージェントのみ）をプレースホルダーに置換
5. Key Implementation Areas（該当エージェントのみ）をプレースホルダーに置換

### Step 3: QUICKSTART.mdを更新
利用者向けガイドに「プロジェクト情報の追記方法」セクションを追加。

### Step 4: README.mdを更新
リポジトリのREADMEに汎用テンプレートとしての性質を明記。

### Step 5: バージョンを3.0.0に更新
全エージェントのバージョンを3.0.0に更新し、changelogに記載。

### Step 6: legacy/studymate/を作成（オプション）
StudyMateプロジェクト向けに、現行のエージェント（v2.0.0）を`legacy/studymate/agents/`に保存。

### Step 7: 検証
新規プロジェクトを想定して、汎用化されたエージェントの記入・利用フローを確認。

---

## 4. ユーザー運用フロー（改修後）

### 新規プロジェクトでの利用手順

#### Step 1: リポジトリをプロジェクトにコピー
```bash
cd /path/to/your-project
bash /path/to/claude_utilization/setup.sh
```

これで`.claude/`配下にエージェント、ルール、フック、コマンド等がコピーされる。

#### Step 2: プロジェクト情報を追記
`.claude/agents/`配下の各エージェントファイルを開き、`<!-- ✏️ EDIT THIS SECTION -->`と書かれた箇所を編集。

**最低限編集すべき箇所**:
- `Project Overview`セクション（全エージェント）
- `Reference Documents`セクション（該当エージェント）
- `Key Constraints & Priorities`（tech-lead等）
- `Key Implementation Areas`（backend-dev、frontend-dev等）

#### Step 3: Claude Codeを起動
```bash
claude
```

tech-leadエージェントから開始し、指示に従って開発を進める。

---

## 5. 期待される効果

### Before（v2.0.0）
- StudyMate固有情報がハードコード
- 他プロジェクトで使用時、全エージェントを手動検索・置換
- 記入漏れや不整合のリスク
- テンプレートとしての汎用性がない

### After（v3.0.0）
- プロジェクト固有情報は明確なプレースホルダー
- 記入すべき箇所が一目瞭然（`<!-- ✏️ EDIT THIS SECTION -->`）
- 記入例とガイドラインを提供
- 汎用テンプレートとして他プロジェクトで即利用可能

---

## 6. 保守性と拡張性

### 新規エージェント追加時
新しいエージェントを追加する際も、同じプレースホルダー方式を踏襲すればOK。

### エージェントの改善時
プロジェクト非依存部分（Agent Dependencies、Handoff Protocol、Working Processなど）は全プロジェクトで共通なので、1箇所の改善が全プロジェクトに反映される。

### バージョン管理
- v3.0.0: 汎用化（本改修）
- v2.0.0: StudyMate特化版（legacy/studymate/に保存）

---

## 7. リスクと対策

### リスク1: ユーザーが編集箇所を見落とす
**対策**:
- `<!-- ✏️ EDIT THIS SECTION -->`で明示
- QUICKSTART.mdで詳細に説明
- 記入例を豊富に提供

### リスク2: 記入内容が不適切
**対策**:
- 記入例で適切なフォーマットを示す
- エージェント自身が参照ドキュメントを読んで補完可能

### リスク3: 既存プロジェクトへの影響
**対策**:
- legacy/studymate/に現行版を保存
- 段階的移行を許容

---

## 8. まとめ

### 推奨アプローチ
**シンプルなプレースホルダー方式**

- project.json、CLI、テンプレートエンジンは不要
- エージェントファイルを直接編集
- 明確なプレースホルダーと記入例で誘導
- 複雑さゼロで保守性と汎用性を両立

### 実装コスト
- 全10エージェントの編集: 約4-6時間
- ドキュメント更新: 約2時間
- 検証: 約1時間
- **合計: 約8時間**（1営業日）

### ROI
- 従来の複雑なアプローチ（116時間）に対し、**93%削減**
- シンプルで保守しやすい
- ユーザーの学習コストも最小

---

**Document Version**: 1.0.0
**Created**: 2026-01-27
**Author**: Claude Code
**Status**: Ready for Implementation
