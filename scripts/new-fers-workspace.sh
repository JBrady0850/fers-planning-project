#!/usr/bin/env bash
#
# Builds the FERS Planning Project workspace folder tree and places the living registers.
#
# Usage:
#   ./scripts/new-fers-workspace.sh ~/Documents/"FERS Planning"
#   ./scripts/new-fers-workspace.sh ~/Documents/"FERS Planning" --force
#
# Existing folders are left alone. The two register files are never overwritten
# unless --force is supplied, because they hold your data.
#
# Part of https://github.com/JBrady0850/fers-planning-project
# MIT licensed. Not financial advice. See DISCLAIMER.md.

set -euo pipefail

GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
CYAN=$'\033[0;36m'
RESET=$'\033[0m'

usage() {
    echo "Usage: $0 <workspace-path> [--force]"
    echo
    echo "  <workspace-path>   Where to build the workspace. Created if missing."
    echo "  --force            Overwrite the two register files if they exist."
    exit 1
}

[ $# -ge 1 ] || usage

TARGET="$1"
FORCE=0
if [ "${2:-}" = "--force" ]; then
    FORCE=1
elif [ -n "${2:-}" ]; then
    usage
fi

# Locate the repository root relative to this script, so templates are found
# no matter which directory the user runs it from.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

FOLDERS=(
    "01 Source Documents"
    "01 Source Documents/New Raw Data"
    "01 Source Documents/Old Raw Data"
    "02 Baseline"
    "03 Monthly Reports"
    "04 Analysis"
    "05 Boldin"
    "06 Open Items"
    "07 Archive"
)

echo
echo "${CYAN}FERS Planning Project, workspace setup${RESET}"
echo

if [ -d "$TARGET" ]; then
    echo "  exists   $TARGET"
else
    mkdir -p "$TARGET"
    echo "  ${GREEN}created  $TARGET${RESET}"
fi

ROOT="$(cd "$TARGET" && pwd)"

for folder in "${FOLDERS[@]}"; do
    if [ -d "$ROOT/$folder" ]; then
        echo "  exists   $folder"
    else
        mkdir -p "$ROOT/$folder"
        echo "  ${GREEN}created  $folder${RESET}"
    fi
done

echo

place_template() {
    local src="$1"
    local dest="$2"

    if [ ! -f "$src" ]; then
        echo "  ${YELLOW}warning  template not found: $src${RESET}"
        echo "           copy it manually from the repository."
        return
    fi

    if [ -f "$ROOT/$dest" ] && [ "$FORCE" -eq 0 ]; then
        echo "  ${YELLOW}skipped  $dest already exists, not overwritten${RESET}"
        return
    fi

    cp "$src" "$ROOT/$dest"
    echo "  ${GREEN}placed   $dest${RESET}"
}

place_template "$REPO_ROOT/templates/facts-register.md" "02 Baseline/Facts Register.md"
place_template "$REPO_ROOT/templates/open-items.md"     "06 Open Items/Open Items.md"

echo
echo "${CYAN}Workspace ready.${RESET}"
echo
echo "Next steps:"
echo "  1. Open Claude Desktop and create a Project named \"FERS Planning\"."
echo "  2. Copy everything between the two ===== markers in MASTER-PROMPT.md"
echo "     into the project Instructions field. Not into a chat message."
echo "  3. Use Add folder and select: $ROOT"
echo "  4. Gather the six documents in docs/03-document-intake-checklist.md."
echo "  5. Start a conversation and type:"
echo "        Begin Phase A, then start the interview at Block 1."
echo
echo "${YELLOW}Before you load documents, decide where the raw ones live.${RESET}"
echo "This folder will hold pay statements, benefit estimates and tax returns."
echo "If it is shared or synced, those documents go wherever it goes."
echo "Do not place any of this on a government system."
echo
