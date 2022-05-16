#!/usr/bin/env bash

# PURPOSE: RSYNC COMMAND TO BACKUP CHEATSHEET DIRECTORIES

# ARG (OPTIONAL) = PATH TO BACKUP DIRECTORY (DEFAULT TO $HOME/.cheat-cli/cheatsheet-backup

# --- COLOURS ---

GREEN_BOLD='\033[1;32m'
NORMAL='\033[0m'

# --- VARIABLES ---

pathToCheatSheets="$HOME/.cheat-cli/cheatsheets/"
backupDir="$HOME/.cheat-cli/cheatsheet-backup"

# TO DO: Error handle if given argument doesn't match file path regex

# --- SCRIPT ---
if [ "$#" = 1 ]; then
  backupDir="$1"
fi

rsync -av "$pathToCheatSheets" "$backupDir" &>/dev/null && echo -e "Successfully backed up notes to $GREEN_BOLD$backupDir$NORMAL 🤟"
