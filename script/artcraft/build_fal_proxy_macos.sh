#!/usr/bin/env bash
set -euo pipefail
root=$(git rev-parse --show-toplevel)
VITE_FAL_PROXY=true npm run build --prefix "$root/frontend/apps/artcraft"
cd "$root/crates/desktop/artcraft"
SQLX_OFFLINE=true VITE_FAL_PROXY=true npm exec --yes --package=@tauri-apps/cli@2.12.1 -- tauri build --debug --bundles app --config "$root/extensions/fal-proxy/tauri.local.json"
echo "Built: $root/target/debug/bundle/macos/ArtCraft fal Local.app"
