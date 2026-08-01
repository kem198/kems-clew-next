#!/usr/bin/env bash

set -euo pipefail

# ========================================
# Git history cleanup script
# Remove image assets from git history
# while keeping current files
# ========================================

TARGET_PATHS=(
  "public/assets/works/"
  "public/assets/notes/"
  "contents/notes/"
)

RESTORE_PATHS=(
  "public/assets/works"
  "public/assets/notes"
  "contents/notes/"
)

REPO_NAME=$(basename "$(pwd)")
BACKUP_DIR="../${REPO_NAME}-backup.git"
TEMP_DIR="../${REPO_NAME}-assets-backup"

REMOTE_URL="git@github.com:kem198/kems-clew-next.git"

echo "Repository:"
echo "  ${REPO_NAME}"
echo

echo "Delete history paths:"
for path in "${TARGET_PATHS[@]}"; do
  echo "  - ${path}"
done

echo

echo "Current files to preserve:"
for path in "${RESTORE_PATHS[@]}"; do
  if [ -d "$path" ]; then
    find "$path" -type f | sed 's/^/  /'
  fi
done

echo

read -r -p "Continue? [y/N]: " answer

case "$answer" in
  y|Y)
    ;;
  *)
    echo "Canceled."
    exit 0
    ;;
esac


# ----------------------------------------
# Backup repository
# ----------------------------------------

if [ -e "$BACKUP_DIR" ]; then
  echo
  echo "Backup already exists:"
  echo "  ${BACKUP_DIR}"

  read -r -p "Overwrite backup? [y/N]: " backup_answer

  case "$backup_answer" in
    y|Y)
      rm -rf "$BACKUP_DIR"
      ;;
    *)
      echo "Canceled."
      exit 0
      ;;
  esac
fi

echo
echo "Creating backup..."

git clone --mirror . "$BACKUP_DIR"

echo "Backup created:"
echo "  ${BACKUP_DIR}"


# ----------------------------------------
# Backup current assets
# ----------------------------------------

if [ -e "$TEMP_DIR" ]; then
  rm -rf "$TEMP_DIR"
fi

mkdir -p "$TEMP_DIR"

echo
echo "Backing up current assets..."

for path in "${RESTORE_PATHS[@]}"; do
  if [ -d "$path" ]; then
    mkdir -p "$TEMP_DIR/$(dirname "$path")"

    cp -a \
      "$path" \
      "$TEMP_DIR/$path"
  fi
done

echo "Assets backup:"
echo "  ${TEMP_DIR}"


# ----------------------------------------
# Remove history
# ----------------------------------------

echo
echo "Removing git history..."

FILTER_ARGS=()

for path in "${TARGET_PATHS[@]}"; do
  FILTER_ARGS+=(--path "$path")
done

git filter-repo \
  "${FILTER_ARGS[@]}" \
  --invert-paths \
  --force


# ----------------------------------------
# Restore current assets
# ----------------------------------------

echo
echo "Restoring current assets..."

for path in "${RESTORE_PATHS[@]}"; do
  if [ -d "$TEMP_DIR/$path" ]; then
    rm -rf "$path"

    mkdir -p "$(dirname "$path")"

    cp -a \
      "$TEMP_DIR/$path" \
      "$path"
  fi
done


# ----------------------------------------
# Cleanup
# ----------------------------------------

rm -rf "$TEMP_DIR"

echo
echo "Completed."
echo

echo "Current assets were restored."
echo "Please review:"
echo
echo "  git status"
echo

echo "Commit restored content:"
echo
printf "  git add"
printf " %s" "${RESTORE_PATHS[@]}"
echo
echo "  git commit -m \"Restore site content after history cleanup\""
echo

echo "Restore remote repository if needed:"
echo
echo "  git remote -v"
echo "  git remote add origin ${REMOTE_URL}"
echo

echo "Finally push rewritten history:"
echo
echo "  git push origin --force --all"
echo "  git push origin --force --tags"
