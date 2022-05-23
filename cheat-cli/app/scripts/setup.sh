#!/usr/bin/env bash

# --- INSTALL SCRIPT FOR CHEATSHEET TOOL
# Purpose:
# - install necessary dependancies
# - install comman globally
# - create cheatsheets directory and add starter topics

# --- COLOURS/STYLES

BOLD=$(tput bold)
GREEN=$(tput setaf 2)
YELLOW=$(tput setaf 3)
RESET=$(tput sgr0)

# --- SCRIPT

echo -e "\n$BOLD\0Please enter super-user password...$RESET"
sudo npm install &>/dev/null && echo -e "\nPassword accepted - cheatsheet dependancies installed"

sudo npm install -g &>/dev/null && echo -e "\nCommand installed globally 🎉"

mkdir "cheatsheets" &>/dev/null || echo -e "\n$YELLOW\0Cheatsheets directory already exists$RESET"

mkdir "cheatsheets/frontend" "cheatsheets/backend" &>/dev/null || echo -e "\n$YELLOW\0Cheatsheet files already exists$RESET"

echo -e "\n$BOLD$GREEN\0Setup Complete... hopefully 🤔$RESET"
