#!/usr/bin/env bash

npm install

mkdir "cheatsheets" || exit 1

mkdir "cheatsheets/frontend" "cheatsheets/backend" || echo "couldn't create cheatsheets"

touch ".env"
