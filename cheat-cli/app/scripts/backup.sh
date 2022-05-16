#!/usr/bin/env bash

# PURPOSE: RSYNC COMMAND TO BACKUP CHEATSHEET DIRECTORIES

# --- COLOURS ---

GREEN_BOLD='\033[1;32m'
NORMAL='\033[0m'

# --- VARIABLES ---

pathToCheatSheets="$HOME/.cheat-cli/cheatsheets/"
backupDir="$HOME/.cheat-cli/cheatsheet-backup"

# --- SCRIPT ---

rsync -av "$pathToCheatSheets" "$backupDir" &>/dev/null && echo -e "Successfully backed up notes to $GREEN_BOLD$backupDir$NORMAL 🤟"
