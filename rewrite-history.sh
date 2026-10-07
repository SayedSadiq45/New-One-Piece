#!/usr/bin/env bash
set -euo pipefail

EXPECTED_REMOTE="https://github.com/SayedSadiq45/New-One-Piece-Page.git"
GITHUB_EMAIL="sayedmohdsadiq.786@gmail.com"
CURRENT_BRANCH="$(git branch --show-current)"

if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Run this from the main branch; current branch is '$CURRENT_BRANCH'." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit or stash all changes before rewriting history." >&2
  exit 1
fi

FILTER_BRANCH="$(git --exec-path)/git-filter-branch"
if [[ ! -f "$FILTER_BRANCH" ]]; then
  echo "This script requires git filter-branch (included with Git for Windows)." >&2
  exit 1
fi

REMOTE_HEADS="$(git ls-remote --heads "$EXPECTED_REMOTE")" || {
  echo "Could not access $EXPECTED_REMOTE. Create the empty repository first and verify your GitHub access." >&2
  exit 1
}

if [[ -n "$REMOTE_HEADS" ]]; then
  echo "$EXPECTED_REMOTE is not empty. Refusing to overwrite or merge its history." >&2
  exit 1
fi

if git remote get-url personal >/dev/null 2>&1; then
  if [[ "$(git remote get-url personal)" != "$EXPECTED_REMOTE" ]]; then
    echo "The 'personal' remote points somewhere unexpected; refusing to push." >&2
    exit 1
  fi
else
  git remote add personal "$EXPECTED_REMOTE"
fi

BACKUP_BUNDLE="$(git rev-parse --git-path history-before-rewrite.bundle)"
if [[ -e "$BACKUP_BUNDLE" ]]; then
  echo "A history backup already exists at $BACKUP_BUNDLE; move it before rerunning." >&2
  exit 1
fi
git bundle create "$BACKUP_BUNDLE" refs/heads/main
echo "Original history backed up to $BACKUP_BUNDLE"

IDENTITY_FILTER='
map_identity() {
  case "$1" in
    "109924237+adrielzimbril@users.noreply.github.com" | \
    "198110074+figma[bot]@users.noreply.github.com" | \
    "noreply@github.com")
      printf "%s" "sayedmohdsadiq.786@gmail.com"
      ;;
    *)
      printf "%s" "$1"
      ;;
  esac
}

case "$GIT_AUTHOR_EMAIL" in
  "109924237+adrielzimbril@users.noreply.github.com" | \
  "198110074+figma[bot]@users.noreply.github.com" | \
  "noreply@github.com")
  GIT_AUTHOR_NAME="SayedSadiq45"
  GIT_AUTHOR_EMAIL="$(map_identity "$GIT_AUTHOR_EMAIL")"
  export GIT_AUTHOR_NAME GIT_AUTHOR_EMAIL
  ;;
esac

case "$GIT_COMMITTER_EMAIL" in
  "109924237+adrielzimbril@users.noreply.github.com" | \
  "198110074+figma[bot]@users.noreply.github.com" | \
  "noreply@github.com")
  GIT_COMMITTER_NAME="SayedSadiq45"
  GIT_COMMITTER_EMAIL="$(map_identity "$GIT_COMMITTER_EMAIL")"
  export GIT_COMMITTER_NAME GIT_COMMITTER_EMAIL
  ;;
esac
'

MESSAGE_FILTER='sed -E "/^[Cc]o-authored-by: /d"'

echo "Rewriting main history to use SayedSadiq45 <$GITHUB_EMAIL> for the mapped author and committer identities..."
git filter-branch -f \
  --env-filter "$IDENTITY_FILTER" \
  --msg-filter "$MESSAGE_FILTER" \
  -- refs/heads/main

if git log main --format='%an <%ae> %cn <%ce>%n%B' |
  grep -Eiq 'Adriel Zimbril|109924237\+adrielzimbril@users\.noreply\.github\.com|figma\[bot\]|198110074\+figma\[bot\]@users\.noreply\.github\.com|noreply@github\.com|Co-authored-by:'; then
  echo "Unexpected old author or co-author attribution remains. Not pushing." >&2
  exit 1
fi

echo "All commits reachable from main now use the requested account identity."
git push personal main:main
echo "Rewritten main history pushed to $EXPECTED_REMOTE"
