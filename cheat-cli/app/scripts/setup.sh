#!/usr/bin/env bash

npm install

mkdir "cheatsheets" &>/dev/null || echo "Cheatsheets directory already exists"

mkdir "cheatsheets/frontend" "cheatsheets/backend" &>/dev/null || echo "Cheatsheet files already exist"

cp "cheat-cli/app/scripts/setup-files/sample-config.js" "config.js" || echo "Couldn't copy sample config"

echo "Setup Complete... hopefully 🤔"
