#! /bin/bash

# Count source files to push
source_files_count = `
git --no-pager diff --cached --name-only --cached
| grep -E "^(src|docs)\/.*\.(ts|tsx|js|jsx|json)$"
| wc -l
`i

if [ $source_files_count == 0 ]
then
  echo "No source files to commit"
  exit 0
fi

exit 1
