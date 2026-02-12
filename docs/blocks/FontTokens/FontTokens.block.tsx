import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";
import { useMemo } from "react";

import { formatCssLength, isHeadingSize } from "./FontTokens.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../Table";

import { FlexRowLayout, GridItem, GridLayout } from "@layouts";
import { capitalize, cssVarName } from "@utils";

import { Text, Heading, Badge } from "@components";

import type { FontTokenRowProps } from "./FontTokens.types";
import type { HeadingSize, TextSize, TypographyWeight } from "@types";

const HEADING_SIZES: HeadingSize[] = ["h1", "h2", "h3", "h4"];
const TEXT_SIZES: TextSize[] = ["m", "s", "xs"];
const FONT_WEIGHTS: TypographyWeight[] = ["bold", "medium", "regular"] as const;
const LOREM = "The quick brown fox jumps over the lazy dog.";

/**
 * Renders a table of font tokens, including headings and texts, with their respective sizes and weights.
 *
 * @return {JSX.Element} The table of font tokens.
 */
export const FontTokens = (): JSX.Element => {
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>
          <Text size="s" weight="medium" color="gray-800" important>
            Size / Weight
          </Text>
        </TableHeaderCell>
        <TableHeaderCell>
          <Text size="s" weight="medium" color="gray-800" important>
            Preview
          </Text>
        </TableHeaderCell>
        <TableHeaderCell>
          <Text size="s" weight="medium" color="gray-800" important>
            Specs
          </Text>
        </TableHeaderCell>
      </TableHeader>
      <TableHeader>
        <TableHeaderCell colSpan={4}>
          <Text size="s" weight="medium" color="gray-800" important>
            Headings
          </Text>
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {HEADING_SIZES.flatMap((size) =>
          FONT_WEIGHTS.map((weight) => (
            <FontTokenRow
              key={`${size}-${weight}`}
              size={size}
              weight={weight}
            />
          ))
        )}
      </TableBody>
      <TableHeader>
        <TableHeaderCell colSpan={4}>
          <Text weight="medium" color="gray-800" important>
            Texts
          </Text>
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        {TEXT_SIZES.flatMap((size) =>
          FONT_WEIGHTS.map((weight) => (
            <FontTokenRow
              key={`${size}-${weight}`}
              size={size}
              weight={weight}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

/**
 * Renders a row in the {@link FontTokens} table.
 *
 * @param {FontTokenRowProps} props - The props for the FontTokenRow component.
 * @param {string} props.size - The size of the font token.
 * @param {string} props.weight - The weight of the font token.
 * @return {JSX.Element} The rendered FontTokenRow component.
 */
const FontTokenRow = ({ size, weight }: FontTokenRowProps): JSX.Element => {
  const specs = useMemo(
    () => texts.desktop[size][weight].css.style,
    [size, weight]
  );

  const { fontSize, lineHeight, letterSpacing, fontWeight } = useMemo(() => {
    return {
      fontSize: formatCssLength(specs.fontSize),
      lineHeight: formatCssLength(specs.lineHeight),
      letterSpacing: formatCssLength(specs.letterSpacing),
      fontWeight: specs.fontWeight,
    };
  }, [specs]);

  const cssVars = useMemo(
    () => ({
      size: cssVarName(`text-${size}`),
      weight: cssVarName(`text-weight-${weight}`),
    }),
    [size, weight]
  );

  return (
    <TableRow $required>
      <TableCell $center $raw>
        <FlexRowLayout gap="s-1">
          <Badge
            label={size.toUpperCase()}
            shade={weight === FONT_WEIGHTS[0] ? "dark" : "light"}
          />
          <Badge label={capitalize(weight)} color="gray" />
        </FlexRowLayout>
      </TableCell>
      <TableCell $center $raw>
        {isHeadingSize(size) ? (
          <Heading size={size} weight={weight} important>
            {LOREM}
          </Heading>
        ) : (
          <Text size={size} weight={weight} important>
            {LOREM}
          </Text>
        )}
      </TableCell>
      <TableCell $center $raw>
        <GridLayout
          columns={["auto", "auto", "auto"]}
          gap={{
            column: "s-2",
            row: 0,
          }}
          align="baseline"
          justify="start"
        >
          <Text size="xs" color="gray-600" important>
            Size:
          </Text>
          <Text size="xs" color="gray-700" weight="medium" important>
            {fontSize}
          </Text>
          <Text size="xs" color="gray-700" weight="medium" important>
            {cssVars.size}
          </Text>

          <Text size="xs" color="gray-600" important>
            Weight:
          </Text>
          <Text size="xs" color="gray-700" weight="medium" important>
            {fontWeight}
          </Text>
          <Text size="xs" color="gray-700" weight="medium" important>
            {cssVars.weight}
          </Text>

          <Text size="xs" color="gray-600" important>
            Line height:
          </Text>

          <Text size="xs" color="gray-700" weight="medium" important>
            {lineHeight}
          </Text>

          <GridItem columnStart="1">
            <Text size="xs" color="gray-600" important>
              Letter spacing:
            </Text>
          </GridItem>
          <GridItem>
            <Text size="xs" color="gray-700" weight="medium" important>
              {letterSpacing}
            </Text>
          </GridItem>
        </GridLayout>
      </TableCell>
    </TableRow>
  );
};
