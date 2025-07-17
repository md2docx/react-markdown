#!/bin/bash

set -euo pipefail

DEFAULT_ISSUE_KEY="#mayank1513"
DEFAULT_BASE_BRANCH="origin/main"

if [[ $# -eq 0 ]]; then
  echo "🔧 No arguments passed. You can override the defaults below:"
  read -rp "Enter issue key [$DEFAULT_ISSUE_KEY]: " INPUT_ISSUE_KEY
  read -rp "Enter base branch [$DEFAULT_BASE_BRANCH]: " INPUT_BASE_BRANCH
  ISSUE_KEY="${INPUT_ISSUE_KEY:-$DEFAULT_ISSUE_KEY}"
  BASE_BRANCH="${INPUT_BASE_BRANCH:-$DEFAULT_BASE_BRANCH}"
else
  ISSUE_KEY="${1:-$DEFAULT_ISSUE_KEY}"
  BASE_BRANCH="${2:-$DEFAULT_BASE_BRANCH}"
fi

git fetch --prune

DRY_RUN=false
if [[ "${3:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "🧪 Running in dry-run mode (no commits will be changed)"
fi

echo "🔍 Using issue key: $ISSUE_KEY"
echo "🔁 Using base branch: $BASE_BRANCH"

MERGE_BASE=$(git merge-base HEAD "$BASE_BRANCH")
echo "🔗 Merge-base with $BASE_BRANCH: $MERGE_BASE"

if $DRY_RUN; then
  echo "🔎 Commits that would be amended:"
  git rev-list --reverse "$MERGE_BASE"..HEAD | while read -r COMMIT; do
    MSG=$(git log -1 --pretty=%B "$COMMIT")
    if [[ "$MSG" != *$ISSUE_KEY* ]]; then
      SHORT_ID=$(git rev-parse --short "$COMMIT")
      echo "✏️  $SHORT_ID: would amend with '$ISSUE_KEY: ' prefix"
    fi
  done
else
  git rebase --exec "bash -c 'MSG=\$(git log -1 --pretty=%B); if [[ \"\$MSG\" != *$ISSUE_KEY* ]]; then echo \"Amending commit: \$(git rev-parse --short HEAD)\"; git commit --amend -m \"$ISSUE_KEY: \$MSG\" --no-edit --date=\"\$(git show -s --format=%ci)\" --no-gpg-sign; else echo \"Skipping commit: \$(git rev-parse --short HEAD) (already contains key)\"; fi'" --onto "$MERGE_BASE" "$MERGE_BASE"

  echo "✅ All matching commits have been updated with issue key prefix if needed."
fi
