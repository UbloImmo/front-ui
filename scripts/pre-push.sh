#! /bin/bash

branch=`git rev-parse --abbrev-ref HEAD`

echo "Branch: $branch"

# Count source files to push
source_files_count=$(echo $(./scripts/utils/source-file-count.sh))

if [ $source_files_count == 0 ]
then
  echo "No source files to commit"
  exit 0
fi

echo "$source_files_count source files to commit - Running tests..."

exit 1
sc