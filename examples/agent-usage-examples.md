# Agent Usage Examples

このドキュメントでは、StudyMate開発用の各エージェントの使用例を示します。

## エージェント一覧

| エージェント | 説明 | 主な用途 |
|------------|------|---------|
| tech-lead | 技術選定とシステム設計 | 技術スタック決定、アーキテクチャ設計、API仕様 |
| ui-ux-designer | UI/UX設計 | ワイヤーフレーム、画面仕様、デザインシステム |
| data-modeler | データモデリング | DB設計、ER図、マイグレーション計画 |
| project-manager | プロジェクト管理 | タスク分解、マイルストーン設定、リスク管理 |
| backend-dev | バックエンド開発 | API実装、認証、クラウド同期 |
| frontend-dev | フロントエンド開発 | モバイルアプリ実装、UI実装、タイマー機能 |
| qa-tester | テスト・QA | テスト戦略、テストコード、品質保証 |
| doc-writer | ドキュメント作成 | README、API仕様書、ユーザーガイド |

## Task Tool での基本的な使い方

### 1. tech-lead エージェントを使う

```plaintext
Use the tech-lead agent to decide on the technology stack for StudyMate MVP
```

または

```plaintext
Have the tech-lead agent design the offline sync architecture
```

### 2. ui-ux-designer エージェントを使う

```plaintext
Use the ui-ux-designer agent to create wireframes for all MVP screens
```

または

```plaintext
Have the ui-ux-designer agent design the design system with colors and typography
```

### 3. data-modeler エージェントを使う

```plaintext
Use the data-modeler agent to create detailed database schema for User, Subject, and StudySession entities
```

または

```plaintext
Have the data-modeler agent design the migration plan for the database
```

### 4. project-manager エージェントを使う

```plaintext
Use the project-manager agent to create a detailed MVP development plan
```

または

```plaintext
Have the project-manager agent break down the timer feature into implementable tasks
```

### 5. backend-dev エージェントを使う

```plaintext
Use the backend-dev agent to implement authentication endpoints
```

または

```plaintext
Have the backend-dev agent implement the sync API endpoints
```

### 6. frontend-dev エージェントを使う

```plaintext
Use the frontend-dev agent to implement the home screen with weekly progress
```

または

```plaintext
Have the frontend-dev agent implement the timer functionality with background support
```

### 7. qa-tester エージェントを使う

```plaintext
Use the qa-tester agent to create test cases for the 15-second recording constraint
```

または

```plaintext
Have the qa-tester agent write E2E tests for the timer and recording flow
```

### 8. doc-writer エージェントを使う

```plaintext
Use the doc-writer agent to create the project README
```

または

```plaintext
Have the doc-writer agent write the API documentation based on the implemented endpoints
```

## フェーズ別の使用例

### Phase 0: 設計・アーキテクチャ

#### ステップ1: 技術スタック決定

```plaintext
Use the tech-lead agent to:
1. Read all reference documents
2. Evaluate React Native vs Flutter for mobile development
3. Evaluate Supabase vs Firebase for backend
4. Create tech-stack-decision.md with full analysis
```

#### ステップ2: UI/UX設計

```plaintext
Use the ui-ux-designer agent to:
1. Create wireframes for all 5 MVP screens
2. Design the screen transition flow
3. Define the design system (colors, fonts, components)
4. Validate that recording can be completed in 15 seconds
```

#### ステップ3: データモデリング

```plaintext
Use the data-modeler agent to:
1. Review the tech-lead's database overview
2. Create detailed entity definitions for User, Subject, and StudySession
3. Design the ER diagram
4. Create migration scripts
```

#### ステップ4: 開発計画

```plaintext
Use the project-manager agent to:
1. Review all design documents
2. Break down MVP features into tasks
3. Create a detailed development plan with milestones
4. Identify risks and dependencies
```

### Phase 1: MVP開発

#### バックエンド実装

```plaintext
Use the backend-dev agent to:
1. Set up the project structure
2. Implement authentication endpoints (register, login, OAuth)
3. Implement Subject CRUD endpoints
4. Implement StudySession CRUD endpoints
5. Implement sync endpoints
```

#### フロントエンド実装

```plaintext
Use the frontend-dev agent to:
1. Set up the mobile project
2. Implement the navigation structure
3. Implement the home screen
4. Implement the recording screen with timer
5. Implement offline support and local storage
6. Implement cloud sync logic
```

#### テスト実装

```plaintext
Use the qa-tester agent to:
1. Create a comprehensive test strategy
2. Write unit tests for business logic
3. Write integration tests for all API endpoints
4. Write E2E tests for the recording flow
5. Validate the 15-second recording constraint
```

#### ドキュメント作成

```plaintext
Use the doc-writer agent to:
1. Create the project README
2. Write the development environment setup guide
3. Document all API endpoints
4. Create the user guide
5. Draft privacy policy and terms of service
```

## 複数エージェントの連携例

### 例1: API設計から実装まで

```plaintext
1. Use the tech-lead agent to design the API specification
2. Use the data-modeler agent to create database schema
3. Use the backend-dev agent to implement the API endpoints
4. Use the qa-tester agent to write integration tests for the API
5. Use the doc-writer agent to document the API
```

### 例2: 画面実装フロー

```plaintext
1. Use the ui-ux-designer agent to create screen wireframes and specifications
2. Use the frontend-dev agent to implement the screen components
3. Use the qa-tester agent to write component tests and E2E tests
4. Use the doc-writer agent to create user guide for the features
```

### 例3: 機能追加フロー

```plaintext
1. Use the project-manager agent to break down the feature into tasks
2. Use the ui-ux-designer agent to design the UI for new feature
3. Use the data-modeler agent to design any new database entities
4. Use the backend-dev agent to implement backend logic
5. Use the frontend-dev agent to implement frontend logic
6. Use the qa-tester agent to write comprehensive tests
7. Use the doc-writer agent to update documentation
```

## エージェント呼び出しのベストプラクティス

### 1. 明確な指示を与える

❌ 悪い例:
```plaintext
Use the tech-lead agent to do something about the database
```

✅ 良い例:
```plaintext
Use the tech-lead agent to:
1. Review the current database schema
2. Identify performance bottlenecks in the sync logic
3. Propose optimization strategies
4. Update the system architecture document
```

### 2. 参照すべきドキュメントを明示

❌ 悪い例:
```plaintext
Use the backend-dev agent to implement the API
```

✅ 良い例:
```plaintext
Use the backend-dev agent to:
1. Read the API specification at docs/architecture/api-specification.md
2. Read the database schema at docs/architecture/data-model-detailed.md
3. Implement all authentication endpoints
4. Add proper error handling and validation
```

### 3. 成果物を明確にする

❌ 悪い例:
```plaintext
Use the ui-ux-designer agent to design some screens
```

✅ 良い例:
```plaintext
Use the ui-ux-designer agent to create:
1. Wireframes for home, recording, and list screens
2. Detailed screen specifications with component states
3. Screen transition flow diagram
4. Validation that recording completes in 15 seconds
```

### 4. 制約や要件を明示

```plaintext
Use the frontend-dev agent to implement the timer feature with these requirements:
- Must be accurate to ±1 second per hour
- Must continue running in the background
- Must survive app switches and phone calls
- Must auto-save when stopped
- Must update every second
```

## トラブルシューティング

### エージェントが見つからない場合

1. `.claude/agents/`ディレクトリにエージェントファイルが存在するか確認
2. セットアップスクリプトを実行: `bash ~/workspace/claude_utilization/setup.sh`
3. Claude Codeを再起動

### エージェントが期待通りに動作しない場合

1. エージェントファイルの`description`を確認
2. より具体的な指示を与える
3. 参照すべきドキュメントパスを明示
4. 期待する成果物を明確にする

## さらに詳しく

- Claude Code公式ドキュメント: https://docs.anthropic.com/claude-code
- カスタムエージェントの詳細: https://docs.anthropic.com/claude-code/agents
