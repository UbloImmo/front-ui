#! /bin/bash

branch=`git rev-parse --abbrev-ref HEAD`

# Count source files to push
source_files_count=$(
git --no-pager diff --staged --name-only "origin" -- "$branch" |
grep -E "^(src|docs)\/.*\.(ts|tsx|js|jsx|json)$" |
wc -l
)

echo $source_files_count
