import { Canvas as SBCanvas } from "@storybook/blocks";
import styled, { css } from "styled-components";

import { useStyleProps } from "@utils";

import type { StyleProps } from "@types";
import { typographyFontFace } from "@/typography";

type SBCanvasProps = Parameters<typeof SBCanvas>[0];

type CanvasLayoutProps = {
  horizontal?: boolean;
  inHeader?: boolean;
};

type CanvasProps = SBCanvasProps & CanvasLayoutProps;

export const Canvas = (props: CanvasProps) => {
  const styleProps = useStyleProps(props);
  return (
    <CanvasStyle {...styleProps}>
      <SBCanvas {...props} />
    </CanvasStyle>
  );
};

const CanvasStyle = styled.div<StyleProps<CanvasLayoutProps>>`
  --padding: var(--s-8);

  & > div {
    margin-top: var(--s-6);
    margin-bottom: var(--s-8);
  }

  ${({ $inHeader }) =>
    $inHeader &&
    css`
      & > div {
        margin-top: 0;
        margin-bottom: 0;
      }
    `}

  & > .sbdocs-preview {
    box-shadow: none;
    background: ${({ $inHeader }) => ($inHeader ? "#fff" : "var(--gray-50)")};
    border: none;
    border-radius: var(--s-2);
    overflow: hidden;
  }

  // story show/hide code button container
  .docs-story > div:has(.docblock-code-toggle),
  // code block button container
  .sbdocs-preview:has(.docblock-code-toggle--expanded) > div:not(.docs-story) *:has(> button) {
    right: var(--s-1);
    bottom: var(--s-1);
    background: none;
  }

  & .docblock-code-toggle {
    ${typographyFontFace()}
    font-weight: var(--text-weight-semibold) !important;
    padding: var(--s-05) var(--s-3);
    color: var(--primary-dark);
    background: var(--color);
    background: var(--primary-light);
    border-radius: var(--s-6);
    font-size: var(--text-xs);
    font-weight: bold;
    box-shadow: var(--shadow-button) !important;
    width: auto;
    border: 1px solid transparent;
    transition: color 200ms ease-out 0s, background 200ms ease-out 0s,
      border-color 200ms ease-out 0s;

    &.docblock-code-toggle--expanded {
      background: var(--primary-medium);
      color: var(--primary-light);
      width: max-content;
    }

    &:hover {
      border-color: var(--primary-medium);
    }
  }

  .docs-story {
    border-radius: 0;

    // story container has generated classname
    & > div:first-child {
      padding: var(--padding);
    }

    & .innerZoomElementWrapper > div {
      border-width: 0 !important;
    }
  }

  // code preview has generated classname
  .sbdocs-preview:has(.docblock-code-toggle--expanded) > div:not(.docs-story) {
    background: var(--gray-700);
    border-radius: 0;

    .prismjs {
      padding: var(--padding);
    }
  }

  // same story for copy button
  .sbdocs-preview:has(.docblock-code-toggle--expanded)
    > div:not(.docs-story)
    button {
    ${typographyFontFace()}
    font-weight: var(--text-weight-semibold) !important;
    padding: var(--s-05) var(--s-3);
    color: var(--primary-light);
    background: var(--color);
    background: var(--gray-900);
    border-radius: var(--s-6);
    font-size: var(--text-xs);
    font-weight: bold;
    box-shadow: var(--shadow-button) !important;
    width: auto;
    border: 1px solid transparent;
    transition: color 200ms ease-out 0s, border-color 200ms ease-out 0s;
  }

  ${({ $horizontal }) =>
    $horizontal &&
    css`
      @media screen and (min-width: 600px) {
        .sbdocs-preview {
          display: flex;
          flex-direction: row-reverse;
        }

        .docs-story {
          flex: 1;
        }

        .sbdocs-preview:has(.docblock-code-toggle--expanded)
          > div:not(.docs-story) {
          flex: 1;
        }
      }
    `}
`;
