#!/usr/bin/env bash

rm -r "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets" || echo 'cheatsheets doesnt exist!'

mkdir "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets"
mkdir "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets/frontend" "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets/backend"
touch "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets/frontend/react.json" "$HOME/.cheat-cli/cheat-cli/__tests__/cheatsheets/backend/express.json"
