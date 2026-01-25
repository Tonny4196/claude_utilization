#!/bin/bash

# Claude Utilization Framework 検証スクリプト
# ディレクトリ構造とファイルの存在を確認

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Claude Utilization Framework 検証中..."
echo ""

# ディレクトリ構造の確認
DIRS=(
    "agents"
    "skills"
    "commands"
    "rules"
    "hooks"
    "mcp-configs"
    "plugins"
    "examples"
)

echo "=== ディレクトリ構造チェック ==="
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir/ が存在します"
    else
        echo -e "${RED}✗${NC} $dir/ が見つかりません"
    fi
done

echo ""
echo "=== エージェントファイルチェック ==="

# エージェントファイルの確認
AGENTS=(
    "tech-lead.md"
    "ui-ux-designer.md"
    "data-modeler.md"
    "project-manager.md"
    "backend-dev.md"
    "frontend-dev.md"
    "qa-tester.md"
    "doc-writer.md"
)

for agent in "${AGENTS[@]}"; do
    if [ -f "agents/$agent" ]; then
        echo -e "${GREEN}✓${NC} agents/$agent が存在します"
    else
        echo -e "${RED}✗${NC} agents/$agent が見つかりません"
    fi
done

echo ""
echo "=== ドキュメントファイルチェック ==="

# ドキュメントファイルの確認
DOCS=(
    "README.md"
    "AGENTS.md"
    "setup.sh"
    "examples/agent-usage-examples.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc が存在します"
    else
        echo -e "${RED}✗${NC} $doc が見つかりません"
    fi
done

echo ""
echo "=== セットアップスクリプト実行権限チェック ==="

if [ -x "setup.sh" ]; then
    echo -e "${GREEN}✓${NC} setup.sh に実行権限があります"
else
    echo -e "${YELLOW}⚠${NC} setup.sh に実行権限がありません"
    echo "  実行: chmod +x setup.sh"
fi

echo ""
echo "=== エージェント定義の構文チェック ==="

# YAMLフロントマターの基本的なチェック
for agent in "${AGENTS[@]}"; do
    if [ -f "agents/$agent" ]; then
        if head -n 1 "agents/$agent" | grep -q "^---$"; then
            echo -e "${GREEN}✓${NC} agents/$agent のフロントマターが正しい形式です"
        else
            echo -e "${RED}✗${NC} agents/$agent のフロントマターが見つかりません"
        fi
    fi
done

echo ""
echo "検証完了！"
