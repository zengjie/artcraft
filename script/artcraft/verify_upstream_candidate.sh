#!/usr/bin/env bash
# Replay in an isolated worktree; never rewrite or force-push the current branch.
set -euo pipefail
root=$(git rev-parse --show-toplevel)
base=$(cat "$root/extensions/fal-proxy/upstream-base")
target=${1:-upstream/main}
git rev-parse --verify "$target^{commit}" >/dev/null
candidate=$(mktemp -d "${TMPDIR:-/tmp}/artcraft-upstream.XXXXXX")
git worktree add --detach "$candidate" HEAD
if ! git -C "$candidate" rebase --onto "$target" "$base"; then
  echo "Resolve and inspect conflicts in retained candidate: $candidate"
  exit 1
fi
git range-diff "$base..HEAD" "$target..$(git -C "$candidate" rev-parse HEAD)" > "$candidate/rebase-range-diff.txt"
echo "Candidate ready: $candidate"
echo "Review rebase-range-diff.txt; build and run regression checks before publishing."
echo "The current branch and working files were not changed."
