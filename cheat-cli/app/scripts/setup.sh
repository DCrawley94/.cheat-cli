#!/usr/bin/env bash

npm install

mkdir "cheatsheets" &>/dev/null || echo "Cheatsheets directory already exists"

mkdir "cheatsheets/frontend" "cheatsheets/backend" &>/dev/null || echo "Cheatsheet files already exist"

echo "Setup Complete... hopefully 🤔"
