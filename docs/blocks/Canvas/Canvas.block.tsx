import { Canvas as SBCanvas, Unstyled } from "@storybook/addon-docs/blocks";

import { useCanvasClassName } from "./Canvas.styles";

import type { CanvasBlockProps } from "./Canvas.types";

type SBCanvasProps = Parameters<typeof SBCanvas>[0];

type CanvasProps = SBCanvasProps & CanvasBlockProps;

export const Canvas = (props: CanvasProps) => {
  const className = useCanvasClassName(props);
  return (
    <Unstyled>
      <div className={className}>
        <SBCanvas {...props} />
      </div>
    </Unstyled>
  );
};
