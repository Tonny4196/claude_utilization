#!/bin/bash

# Claude Utilization Framework セットアップスクリプト
# claude_utilization/ の内容を .claude/ にコピーします

set -e

# 色付き出力用の定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Claude Utilization Framework セットアップを開始します${NC}"
echo ""

# 現在のディレクトリを確認
CURRENT_DIR=$(pwd)
echo "現在のディレクトリ: $CURRENT_DIR"

# .claude ディレクトリが存在するか確認
if [ ! -d ".claude" ]; then
    echo -e "${YELLOW}警告: .claude ディレクトリが見つかりません。作成しますか? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        mkdir -p .claude
        echo -e "${GREEN}.claude ディレクトリを作成しました${NC}"
    else
        echo "セットアップを中止しました"
        exit 1
    fi
fi

# claude_utilization のパス
SOURCE_DIR="$HOME/workspace/claude_utilization"

if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${YELLOW}エラー: $SOURCE_DIR が見つかりません${NC}"
    exit 1
fi

# 各ディレクトリをコピー
echo ""
echo "=== ファイルをコピーしています ==="

# agents/
if [ -d "$SOURCE_DIR/agents" ] && [ "$(ls -A $SOURCE_DIR/agents)" ]; then
    mkdir -p .claude/agents
    cp -r "$SOURCE_DIR/agents/"* .claude/agents/
    echo -e "${GREEN}✓ agents/ をコピーしました${NC}"
fi

# skills/
if [ -d "$SOURCE_DIR/skills" ] && [ "$(ls -A $SOURCE_DIR/skills)" ]; then
    mkdir -p .claude/skills
    cp -r "$SOURCE_DIR/skills/"* .claude/skills/
    echo -e "${GREEN}✓ skills/ をコピーしました${NC}"
fi

# commands/
if [ -d "$SOURCE_DIR/commands" ] && [ "$(ls -A $SOURCE_DIR/commands)" ]; then
    mkdir -p .claude/commands
    cp -r "$SOURCE_DIR/commands/"* .claude/commands/
    echo -e "${GREEN}✓ commands/ をコピーしました${NC}"
fi

# rules/
if [ -d "$SOURCE_DIR/rules" ] && [ "$(ls -A $SOURCE_DIR/rules)" ]; then
    mkdir -p .claude/rules
    cp -r "$SOURCE_DIR/rules/"* .claude/rules/
    echo -e "${GREEN}✓ rules/ をコピーしました${NC}"
fi

# hooks/
if [ -d "$SOURCE_DIR/hooks" ] && [ "$(ls -A $SOURCE_DIR/hooks)" ]; then
    mkdir -p .claude/hooks
    cp -r "$SOURCE_DIR/hooks/"* .claude/hooks/
    echo -e "${GREEN}✓ hooks/ をコピーしました${NC}"
fi

# mcp-configs/
if [ -d "$SOURCE_DIR/mcp-configs" ] && [ "$(ls -A $SOURCE_DIR/mcp-configs)" ]; then
    mkdir -p .claude/mcp-configs
    cp -r "$SOURCE_DIR/mcp-configs/"* .claude/mcp-configs/
    echo -e "${GREEN}✓ mcp-configs/ をコピーしました${NC}"
fi

# plugins/
if [ -d "$SOURCE_DIR/plugins" ] && [ "$(ls -A $SOURCE_DIR/plugins)" ]; then
    mkdir -p .claude/plugins
    cp -r "$SOURCE_DIR/plugins/"* .claude/plugins/
    echo -e "${GREEN}✓ plugins/ をコピーしました${NC}"
fi

echo ""
echo -e "${GREEN}=== セットアップが完了しました ===${NC}"
echo ""
echo "利用可能な機能:"
echo "  - エージェント: Task tool で呼び出し可能な専門エージェント"
echo "  - スラッシュコマンド: /コマンド名 で実行"
echo "  - スキル: 特定ワークフローの実行"
echo ""
echo "詳細は以下を参照:"
echo "  $SOURCE_DIR/README.md"
echo ""
