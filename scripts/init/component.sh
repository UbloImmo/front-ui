#!/usr/bin/env bash

# Creates a component's file structure
# Usage: bun init:component <component_name>

mkdir_if_missing() {
  if [ ! -d "$1" ];
  then
    mkdir "$1"
    echo "created directory $1"
  fi
}

touch_if_missing() {
  if [ ! -f "$1" ];
  then
    touch "$1"
    echo "created file $1"
  fi
}

component_name=$1
working_dir=$(pwd)

source_components_path="$working_dir/src/components"

if [ ! -d "$source_components_path" ];
then
  echo "unable to find source component directory $source_components_path"
  exit 1
fi

component_path="$source_components_path/$component_name"

echo "creating new component $component_name"

mkdir_if_missing "$component_path"
mkdir_if_missing "$component_path/docs"

touch_if_missing "$component_path/$component_name.component.tsx"
touch_if_missing "$component_path/$component_name.styles.ts"
touch_if_missing "$component_path/$component_name.stories.tsx"
touch_if_missing "$component_path/$component_name.test.ts"
touch_if_missing "$component_path/$component_name.types.ts"
touch_if_missing "$component_path/$component_name.utils.ts"
touch_if_missing "$component_path/index.ts"

touch_if_missing "$component_path/docs/$component_name.mdx"
