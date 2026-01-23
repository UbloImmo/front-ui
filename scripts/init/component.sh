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
    echo "$2" >> "$1"
  fi
}

kebab_case() {
  echo "$1" | sed -r "s/([a-z0-9])([A-Z])/\1-\L\2/g"
}

component_name=$1
working_dir=$(pwd)
casbab="${working_dir}/scripts/utils/casbab.sh"
component_test_id="$(echo "$component_name" | "$casbab" kebab)"

source_components_path="$working_dir/src/components"

if [ ! -d "$source_components_path" ];
then
  echo "unable to find source component directory $source_components_path"
  exit 1
fi

component_path="$source_components_path/$component_name"

echo "creating new component $component_name"

# Component directories
mkdir_if_missing "$component_path"
mkdir_if_missing "$component_path/docs"

# Component types
component_types_content="
export type ${component_name}Props = {
  // TODO
}

export type ${component_name}DefaultProps = Required<${component_name}Props>;
"
touch_if_missing "$component_path/$component_name.types.ts" "$component_types_content"

# Component file
component_content="
import { useLogger, useTestId, useMergedProps } from \"@utils\";


import type { TestIdProps } from \"@types\";
import type { ${component_name}Props, ${component_name}DefaultProps } from \"./${component_name}.types\";

const default${component_name}Props: ${component_name}DefaultProps = {
  // TODO
};

/**
 * ${component_name} component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {${component_name}Props & TestIdProps} props - ${component_name} component props
 * @returns {JSX.Element}
 */
const ${component_name} = (props: ${component_name}Props & TestIdProps): JSX.Element => {
  const { log } = useLogger(\"${component_name}\");
  const mergedProps = useMergedProps(default${component_name}Props, props);
  const testId = useTestId(\"${component_test_id}\", props);
  // TODO

  log(mergedProps);

  return (
    <div data-testid={testId}>${component_name} TODO</div>
  )
}
${component_name}.defaultProps = default${component_name}Props;

export { ${component_name} };
"
touch_if_missing "$component_path/$component_name.component.tsx" "$component_content"

# Component stories
component_stories_content="
import { componentSourceFactory } from \"@docs/docs.utils\";

import { ${component_name} } from \"./${component_name}.component\";

import type { Meta, StoryObj } from \"@storybook/react\";
import type { ${component_name}Props } from \"./${component_name}.types\";


const componentSource = componentSourceFactory<${component_name}Props>(
  \"${component_name}\",
  {
    // TODO
  },
  ${component_name}.defaultProps
);

const meta = {
  component: ${component_name},
  title: \"Components/${component_name}/Stories\",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ${component_name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
"
touch_if_missing "$component_path/$component_name.stories.tsx" "$component_stories_content"

# Component tests - empty for now
touch_if_missing "$component_path/$component_name.test.ts"
# Component utils - empty for now
touch_if_missing "$component_path/$component_name.utils.ts"
# Component styles - empty for now
touch_if_missing "$component_path/$component_name.styles.ts"

# Component index
component_index_content="
export * from \"./${component_name}.component\";
export type * from \"./${component_name}.types\";
"
touch_if_missing "$component_path/index.ts" "$component_index_content"


component_docs_content="
import { Meta } from \"@storybook/addon-docs/blocks\";
import { ComponentInfo, Canvas } from \"@docs/blocks\";
import { Content } from \"@docs/containers\";
import * as ${component_name}Stories from \"../${component_name}.stories.tsx\";

<Meta title=\"Components/${component_name}/Usage\" />

<ComponentInfo of={${component_name}Stories} />

<Content>

## Usage

TODO

</Content>
"

touch_if_missing "$component_path/docs/$component_name.mdx" "$component_docs_content"

component_docs_props_content="
import { Meta } from \"@storybook/addon-docs/blocks\";
import { ComponentInfo, ComponentProps } from \"@docs/blocks\";
import { Content } from \"@docs/containers\";
import * as ${component_name}Stories from \"../${component_name}.stories.tsx\";

<Meta title=\"Components/${component_name}/Properties\" />

<ComponentInfo of={${component_name}Stories} />

<Content>

## Properties

<ComponentProps of={${component_name}Stories} />

</Content>
"

touch_if_missing "$component_path/docs/$component_name.props.mdx" "$component_docs_props_content"

# Cleanup
echo "Cleaning up with eslint:fix"
bun test:lint:fix
