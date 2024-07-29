# Changelog

All notable changes to the library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- `v0.0.1` Callout component
  - a card to display permanent feedback information

### Fixed

- `v0.0.3` EntityInfoCard component
  - remove warn for missing name

- `v0.0.6` PhoneInput component
  - Do not convert nullish values to `+33` on initialization

## 0.21.0 - 2024-07-24

### Added

- `v0.0.1` SelectInput
  - A customizable, searchable select input

### Changed

- `mergeDefaultProps`, `useMergedProps`
  - Allow foreign props not contained in defaultProps in final object.
  - Useful for polymorphic props
- `FormFieldDisplay`
  - display selected option's label based on field value

## 0.20.1 - 2024-07-23

### Fixed

- `v0.0.4` CopyClipboardInfoCard
  - Display href info underline while in ellipsis

## 0.20.0 - 2024-07-23

### Added

- `v0.0.1` Checkbox component
- `v0.0.3` ComboBox & `v0.0.2` ComboBoxButton
  - add optional `showIcon` property (set default to `true`)
  - add button shadow on enabled options

### Changed

- `v0.0.2` EntityInfoCard
  - `onInfoCopied` callback property that gets called
    if any nested CopyClipboardInfoCard's info gets copied to the users's clipboard
- `v0.0.3` CopyClipboardInfoCard
  - `onCopied` callback property

### Fixed

- `v0.0.3` CopyClipboardInfoCard
  - Information span overflow & ellipsis

## 0.19.2 - 2024-07-22

### Added

- New icons following `front-tokens@0.1.19` update

## 0.19.1 - 2024-07-18

### Fixed

- `v0.0.2` CopyClipboardInfoCard
  - Display underline in href label even through ellipsis
  - Change href label color on hover
- `v0.0.2` InfoBox
  - Display missing info text in regular weight
- Storybook stability
  - Use `@storybook/builder-vite` in config

## 0.19.0 - 2024-07-17

### Added

- `v0.0.1` CopyClipboardInfoCard
  - Displays an info and / or a link in an easily readable card
  - Allows easy copying to clipboard
- `v0.0.1` EntityInfoCard
  - Polymorphic component that displays various relevant data about an entity
  - Renders several levels of data and info in a easily digestible manner

### Changed

- `v0.0.2` Switch component
  - styles: disabled colors to match Figma updates on the component
  - add `withHelper`, `activeHelperText` and `inactiveHelperText` to handle the displaying of the text
- `v0.0.2` Tooltip
  - Allow cursor customization, defaults to `help`

## 0.18.0 - 2024-07-16

### Added

- `v0.0.1` Switch component
- `v0.0.4` Text component
  - an optional uppercase property to capitalize its text contents

## 0.17.1 - 2024-07-09

### Fixed

- Input / Field controlled / uncontrolled states and value propagation

## 0.17.0 - 2024-07-08

### Added

- `v0.0.1` TextAreaInput component

### Fixed

- (Un)controlled input detection & warnings

## 0.16.1 - 2024-07-08

### Changed

- `v0.0.3` ComboBox
  - Support for setting & updating selection through `value` prop

### Fixed

- `v0.0.4` Input components
  - replace placholder `placeholder` default prop with empty string
- TYPES: Do not export inner flex layout to avoid ts error when used as a dependency

## 0.16.0 - 2024-07-02

### Added

- `v0.0.1` Divider component
  - A horizontal line with an optional label
- `v0.0.1` Form component
  - Renders a form and its fields in edit and / or read mode
  - Supports all currently implemented fields
  - Data validation using zod schemas, error propagation

### Changed

- Input styles
  - Added support for displaying inside a table cell
- `v0.0.2` GridItem layout
  - Add optional `fill` prop to fill grid area
- `v0.0.5` InputLabel component
  - Add optional `compact` prop to display tooltip next to label
- Docs source code generation
  - Added support for object / array props with proper formatting

### Fixed

- `v0.0.4` Field component
  - Do not render assistive / error text if no content available
  - This prevents rendering an additional gap at the bottom of the field between its input and an effectively empty div.

## 0.15.0 - 2024-07-02

### Added

- `v0.0.1` Avatar component

### Changed

- `v0.0.4` EmailInput component
  - added "autocomplete" attribute

## 0.14.1 - 2024-06-27

### Fixed

- `v0.0.2` ComboBox component
  - include "combobox" ARIA role
- `v0.0.2` ComboBoxButton component
  - set type to "button"

## 0.14.0 - 2024-06-27

### Added

- `v0.0.1` ComboBox component
- `v0.0.1` ComboBoxButton component

## 0.13.0 - 2024-06-26

### Added

- `v0.0.1` Modal component

## 0.12.0 - 2024-06-24

### Added

- `v0.0.1` InfoBox component

## 0.11.2 - 2024-06-20

### Changed

- Upgraded storybook to latest version

### Fixed

- `v0.0.3` EmailInput component
  - Use standard validation regex
- `v0.0.4` PasswordInput component
  - Include `autoComplete="new-password"` attribute

## 0.11.1 - 2024-06-19

### Fixed

- `v0.0.4` TextInput component
  - TestIdProps

## 0.11.0 - 2024-06-19

### Added

- `v0.0.2` Loading component

  - animation type `ProgressBar`
  - `className` & `TestId` props

- `v0.0.1` SmallLoader component

### Fixed

- `v0.0.4` NumberInput component

  - prevent controls from changing value when input is `disabled`

- `v0.0.4` StateIndicator component
  - styles: set overflow to hidden to disable scrollbar inside the component in Firefox

## 0.10.8 - 2024-06-17

### Added

- `v0.0.6` Button components
  - `fullWidth` prop: fills the parent container if true

## 0.10.7 - 2024-06-13

### Fixed

- `v0.0.5` Button component
  - Avoid text break by setting inner span width to `max-content`

## 0.10.6 - 2024-06-13

### Changed

- `v0.0.4` Button component
  - Add testid prop support
  - Add style override usage (`styled(Button)`) support

### Fixed

- reduced all input components `min-width` to 6rem

## 0.10.5 - 2024-06-12

### Changed

- `v0.0.6` Badge component
  - increased `border-radius` for rounded corners

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
