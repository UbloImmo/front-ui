# Changelog

All notable changes to the library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Fixed
- `v0.0.3` Action
  - Tweaked hover styling (remove double border)
- `v0.0.2` ActionIcon
  - Tweaked hover styling (remove double border)

## 0.10.4 - 2024-06-11
### Added
- `onBlur` & `inputRef` to all input & field components
- `useInputRef` custom hook
  - used to assign an element to both parent and inner `inputRef`s
  - returns inner `inputRef` & `forwardRef` callback setter
- `useHtmlAttribute` custom hook
  - normalizes an nullable value and returns `undefined` if `null`

## 0.10.3 - 2024-06-06
### Changed
- `v.0.0.5` Badge component
  - Require at least one of `label` or `icon`

## 0.10.2 - 2024-06-06
### Fixed
- `v.0.0.4` Chip component
  - assign onDelete to delete button onMouseDown as well to stop event propagation

## 0.10.1 - 2024-06-06
### Fixed
- `v.0.0.3` Chip component
  - stop onDelete event propagation

## 0.10.0 - 2024-06-06
### Added
- `v0.0.1` CurrencyInput component
- New `name` & `onChangeNative` props for all Inputs & Field components
- `useTestId` & `TestIdProps`
  - Ability to override / replace default test id

### Changed
- Propagate native input event from custom inputs regardless of onChange condition
- `v0.0.2` Field component
  - Display generic error messages based on underlying input validity
  - Propagate child input's native `onChange` event
- `v0.0.4` InputLabel component
  - Add ability to render tooltip by passing its props under the optional `tooltip` key
- `v0.0.3` InputAssistiveText component
  - Add support for custom test id

### Fixed
- `v.0.0.2` Chip component
  - make icon property optional

## 0.9.0 - 2024-06-04
### Added
- `v0.0.1` Chip component

## 0.8.1 - 2024-06-03
### Fixed
- `v0.0.3` State Indicator
  - Use correct text size (from S to M)

## 0.8.0 - 2024-06-03
### Added
- `v0.0.1` Field component
- New `className` prop for compatibility with `styled([Component])` usage:
  - `Text`, `Heading` typo components
  - `Flex`, `Grid` & `GridItem` layouts

### Changed
- Component init script
  - Added Boilerplace file contents
- Generic Input component typings
- Component init script
  - Added boilerplate content

### Fixed
- Various minor fixes in multiple components
  - Unit tests
  - Styles
  - Test ids

## 0.7.0 - 2024-05-30
### Added
- `v0.0.1` Tooltip component

## 0.6.4 - 2024-05-29
### Fixed
- Wait for overrides to have been fetched before applying favicon

## 0.6.3 - 2024-05-28
### Fixed
- Compare favicon retry count to retry limit, allowing favicon to actually be applied

## 0.6.2 - 2024-05-28
### Fixed
- Actually check if favicon has been applied

## 0.6.1 - 2024-05-28
### Added
- Set favicon from theme provider according to overrides

### Changed
- Theme provider optimizations
- Bumped `@ubloimmo/front-tokens` to `0.0.17`
- Rewrite `GlobalStyle` in order to decrease excessive renders and increase perf

### Fixed
- Effect color mapping thanks to updated design tokens

## 0.6.0 - 2024-05-28
### Added
- `v0.0.1` GridItem layout
- Docs
  - `Typography` page
  - `Components/Overview` index mdx page
  - `ComponentInfo` block
    - Link to related `Properties` page

### Changed
- Story sorting in storybook
- Docs
  - Index pages
  - Moved `Color Palette` page to `Foundations` category
  - Page Header Styles

### Fixed
- Shadow / effect parsing following `@ubloimmo/front-tokens` regen
- Various minor fixes

## 0.5.1 - 2024-05-23
### Fixed
- `v0.0.3` PhoneInput component
  - width
  - z-clashing
  - responsive height

## 0.5.0 - 2024-05-22
### Added
- `v.0.0.1` Hypertext component

## 0.4.4 - 2024-05-21
### Added
- Phone input default placeholder

### Fixed
- Phone input foreign styles

## 0.4.3 - 2024-05-21

## 0.4.2 - 2024-05-21

## 0.4.1 - 2024-05-21

## 0.4.0 - 2024-05-20
### Added
- `v.0.0.1` PhoneInput component
- Full coverage test for NumberInput component

## 0.3.2 - 2024-05-14
### Fixed
- Theme override validation condition

## 0.3.1 - 2024-05-14
### Fixed
- Theme override URL template

## 0.3.0 - 2024-05-14
### Added
- `v0.0.1` Action Icon component
  - Logic
  - Styles
  - Stories
  - Tests
- `Extract` type: a safeguard when dealing with union subsets

### Fixed
- `v0.0.2` State Indicator component
  - Set minimum height to 40px
  - Reduce markup complexity (remove nested div)

## 0.2.0 - 2024-05-13
### Added
- `v.0.0.1` State indicator component
- `EnumExtension` generic type

### Changed
- Typings
  - Replace `StaticIconColor` with `ColorKeyOrWhite`

### Fixed
- Text & Heading stories text content

## 0.1.2 - 2024-04-25

## 0.1.1 - 2024-04-17
### Fixed
- `v0.0.3` Static Icon component
  - Sizing
- `v0.0.2` Action component
  - Responsive behaviour

## 0.1.0 - 2024-04-16
### Added
- License & copyright
- `v0.0.1` Action component
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-action-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-action-properties--docs)
- Component bootstrap script
- Component lazy loading util
- Icons:
  - CircleDotted (custom icon)
- Card elevation shadow

### Changed
- `v0.0.2` Button component
  - Secondary styles (white, primary, error)
- `v0.0.3` Badge component
  - Test id support
- `v0.0.2` StaticIcon component
  - White variant

### Removed
- Icons:
  - Delete (custom icon)

### Fixed
- `v0.0.2` InputLabel
  - Text size after font style overhaul
- `v0.0.2` InputAssistiveText
  - Text size after font style overhaul

## 0.1.0-beta.0 - 2024-04-11

## 0.0.2-beta.0 - 2024-04-11
### Added
- Global Theme
- Theme context, provider & consumer hook.
- Global style injector (based on `styled-components`'s `GlobalStyle` component).
  - Conversion of theme into CSS variables.
- Color palette
- Static colors (`error`, `success`, `warning`, `pending`).
- Client brand colors (auto generated from `@ublo-immo/front-tokens`).
- Dynamic color (`primary`).
- Typography styles based on figma-generated text tokens.
- Color shade opacity transformers.
- [Documentation](https://ublo.ublo.org/design-system?path=/docs/color-palette--docs)
- Typography
- Static assets (`Gilroy` font).
- Font face css imports & declarations.
- Responsive font sizes:
  - Headings (`h1`, `h2`, `h3`, `h4`).
  - Texts (`m`, `s`, `xs`).
- Organisation data fetching
- Palette overrides (`getThemeOverrides` function).
- Organization assets (`logo`, `palette`, `name`, `favicon`).
- Available through `theme.organization`.
- Sizes
- Spacing scale generation (base unit: `4px`).
- Responsive breakpoints.
- UI Components
- Typography components
- `v0.0.2` Text
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-text-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-text-properties--docs)
- `v0.0.2` Heading
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-heading-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-heading-properties--docs)
- Interaction components
- `v0.0.1` Button
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-button-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-button-properties--docs)
- Feedback components
- `v0.0.2` Badge
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-badge-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-badge-properties--docs)
- `v0.0.1` Loading
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-loading-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-loading-properties--docs)
  - [Contributing](https://ublo.ublo.org/design-system?path=/docs/components-loading-contributing--docs)
- `v0.0.1` Dialog
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-dialog-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-dialog-properties--docs)
  - [API Reference](https://ublo.ublo.org/design-system?path=/docs/components-dialog-api-reference--docs)
- Iconography components
- `v0.0.2` Icon
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-icon-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-icon-properties--docs)
  - [Repository](https://ublo.ublo.org/design-system?path=/docs/components-icon-repository--docs)
- `v0.0.1` StaticIcon
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-staticicon-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-staticicon-properties--docs)
- Form components
- Inputs
- `v0.0.1` Input
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-input-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-input-common-properties--docs)
- `v0.0.1` TextInput
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-input-textinput-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-input-textinput-properties--docs)
- `v0.0.1` NumberInput
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-input-numberinput-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-input-numberinput-properties--docs)
- `v0.0.1` EmailInput
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-input-emailinput-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-input-emailinput-properties--docs)
- `v0.0.1` PasswordInput
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-input-passwordinput-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-input-passwordinput-properties--docs)
- Input decorators
- `v0.0.1` InputLabel
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-inputlabel-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-inputlabel-properties--docs)
- `v0.0.1` InputAssistiveText
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/components-inputassistivetext-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/components-inputassistivetext-properties--docs)
- UI layouts
- `v0.0.1` Flex
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/layouts-flex-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/layouts-flex-properties--docs)
- `v0.0.1` Grid
  - [Usage](https://ublo.ublo.org/design-system?path=/docs/layouts-grid-usage--docs)
  - [Props](https://ublo.ublo.org/design-system?path=/docs/layouts-grid-properties--docs)
