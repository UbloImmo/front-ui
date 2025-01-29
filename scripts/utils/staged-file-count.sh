#! /bin/bash

staged_files_count=$(
git status -s | wc -l
)

echo $staged_files_count