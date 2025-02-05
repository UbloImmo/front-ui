# Changelog

All notable changes to the library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- `v0.0.23` Form component
  - Add `onEditStateChanged` optional callback property to allow for custom behavior when the form's edit state changes

## 1.4.4 - 2025-02-05
### Fixed
- `v0.0.7` InputLabel component
  - Decrease text size from `m` to `s`
- `v0.0.4` InputAssistiveText component
  - Decrease text size from `s` to `xs`
  - Add `assistiveTextIcon` property to render an icon next to the assistive text
- `v0.0.3` Icon component
  - Add missing keys to stabilize
  - Fix bug where lazy loading specific icons would make them flash upon parent's state update
  - Update generation script to generate `index.lazy.ts` file
- `v0.0.7` Tooltip component
  - Change RenderedChildren rendering from `useCallback` to `useMemo` for better stability and less re-renders
- `v0.0.8` Badge component
  - Hide overflowing badge label with ellipsis
- `v0.0.7` Chip component
  - Set max-width to 100% to prevent overflow
- `v0.0.13` EntityInfoCard component
  - Remove error log when rendering both `state` and `accountBalance` props, since default props contain state
- `v0.0.3` ListFilter component
  - Fix overflow when rendering a single selected option's chip whith a long label
  - Set scrollbar width to `thin`
- `v0.0.9` Field component
  - Update `useFieldValidity` hook to use `useUikitTranslation` for error messages

## 1.4.3 - 2025-02-03
### Fixed
- `v0.0.12` EntityInfoCard component
  - Fix bug where no matter the prop combination, an error would be thrown

## 1.4.2 - 2025-01-31
### Changed
- `v0.0.8` Action component
  - Add `color` property to allow for custom colors
  - Update `size` property to add `card` & `centered` variants
  - Rewrite component and its styles to remove excessive conditional checks
  - Update docs

## 1.4.1 - 2025-01-30
### Changed
- `v0.0.3` ContextInfoCard component
  - Add `content` property to render additional content in the card

## 1.4.1 - 2025-01-30
### Changed
- `v0.0.11` EntityInfoCard component
  - Add a way to change render order within a section

### Fixed
- `v0.0.5` StateIndicator component
  - Hide vertical overflow (scrollbar) when text size grows to mobile size

## 1.4.0 - 2025-01-29

## 1.3.0 - 2025-01-29
### Added
- Changelog update script
- Auto-generation CI workflow

### Changed
- Updated or added 1 new icon(s)
- Updated dependencies
  - Updated `@ubloimmo/front-tokens` to `0.1.35`
- `v0.0.2` ContextLine component
  - Add new `icon`, `description`, `badge` content properties
  - Add new `borderBottom`, `paddingHorizontal`, `compact` styling properties
  - Edit `children` property type definition to allow for arbitrary content
  - Rewrite markup to use FlexLayout
  - Update docs
- `v0.0.2` ContextInfoCard component
  - Add `href` property to allow for navigation
  - Update styles & markup to reflect whether the card is a link or not
  - Update docs
- `v0.0.10` EntityInfoCard component
  - Major rewrite of the component and its typings to allow for more flexibility and customization
  - Add `sections` property to allow for multiple sections of already supported content
  - Add `contextInfoCards` property to allow for context info cards to be displayed in a section
  - Remove internal `EntityStatusRow` rendering in favor of `ContextLine`
  - Update docs
- `StyleOverrideProps`
  - Add `as` property to allow components to make use of `styled-components`' `as` property on a per-component basis
  - Add support for `as` property in `FlexLayout` & `Text` for now
  - Update other component typings to omit it.
- **DOCS**
  - Update `Canvas` block styles to make components with a `gray-50` background more readable

### Fixed
- Storybook build docker timeout

## 1.2.0 - 2025-01-24
### Added
- `v0.0.1` ContextInfoCard component
  - A component that displays contextual information with an icon, title, and optional label, description, and details
  - Supports customizable icons through StaticIcon component
- New icons (`@ubloimmo/front-tokens@0.1.33`)

## 1.1.4 - 2025-01-20
### Fixed
- `v0.0.3` List component
  - Trigger dataprovider first fetch upon mount

## 1.1.3 - 2025-01-20
### Added
- `useMounted` hook
  - Runs a callback _once_ when the component is mounted, even in strict mode

### Changed
- **DOCS**
  - Set storybook react strict mode to `true` in order to replicate production behavior
- `v0.0.3` FeatureSwitch component
  - `description` property type changed to `ReactNode` to allow custom elements or just plain text
- `v0.0.2` ListFilterCollection component
  - Hide clear button when no active filters
- `v0.0.2` ListFilterOptionDivider component
  - Fix styling, make dividers sticky and fix their height to match the design
- `useAsyncData` hook
  - Add `initialFetch` that dictates whether to fetch data on mount (default: true)

### Fixed
- `v0.0.2` List component
  - Fix double fetch on mount and pagination refetch when using `DynamicDataProvider` & `PaginatedDataProvider` in strict mode
  - Paginated & Dynamic data providers now do not fetch data on mount
- `v0.0.2` ListFilter component
  - Fix missing key in `filteredOptions` render map

## 1.1.2 - 2025-01-17
### Fixed
- `v0.0.1` List component
  - export it from components index

## 1.1.1 - 2025-01-17
### Changed
- Git push behavior
  - Add `pre-push` script to check if there are source files to push
  - Only run `test:all` if there are source files to push, otherwise push without running tests

### Fixed
- use latest version of `@ubloimmo/front-util` in peedDependencies
- **DOCS**
  - Fix mdx documentation generation
  - Properly escape `<`, `>` and `=` characters

## 1.1.0 - 2025-01-16
### Added
- `v0.0.6` Text component & `v0.0.5` Heading component
  - Add `noWrap` property to make the text not wrap
  - Add `id` property to make the text / heading component accessible
- `v0.0.4` Collapsible component
  - Add `content` property to render custom content inside the collapsible
- `v0.0.1` List component
  - A flexible and extensible component for fetching, filtering and displaying a list of items
  - A bunch of sub-components to handle and display the list's filtering state

### Changed
- `v0.0.3` TableBody layout
  - Add `style` property to allow for bespoke styles when used in a list or a form
- `v0.0.3` TableHeader layout
  - Add optional `sticky` and `top` properties to make the header sticky and offset it from the top of the viewport / container
- `v0.0.4` TableHeaderCell layout
  - Convert component to forwardRef to allow parents to access the element
- `v0.0.3` TableRow layout
  - Add `style` property to allow for bespoke styles when used in a list or a form
- **`DOCS`**
  - Improve story code snippet generation
    - Recursively generate code snippets for children
  - Improve changelog display
    - Add horizontal rules between sections
    - Normalize heading & content styles
  - Match blockquote styles with Callout component
  - Automatically generate `id` for heading blocks based on text content

### Fixed
- `v0.0.5` Callout component
  - Fix left padding, accounting for 4px wide left border
- `v0.0.9` EntityInfoCard component
  - Fixed conditional rendering

## 1.0.3 - 2025-01-16
### Added
- **DOCS**
  - `typedoc` & `typedoc-plugin-markdown` to generate documentation from code comments & ts static analysis
  - Custom MDX `typedoc` plugin used to generate valid mdx files
  - `docs:generate` script to generate documentation from code comments & ts static analysis

### Changed
- `v0.0.8` EntityInfoCard component
  
  - Allow rendering AccountBalance
- **BUILD**
  
  - Run `docs:generate` script in the dockerfile before building the storybook
- Rearrange components & layouts display in storybook by parent groups: `Actions`, `Feedbacks`, `Dialogs`, `Groups`, ...
- `v0.0.10` SelectInput component
  - Replace hardcoded assistive text strins with uikitTranslations

## 1.0.2 - 2025-01-08

## 1.0.2 - 2025-01-08
### Fixed
- `v0.0.7` EntityInfoCard component
  - Force collision boundary to null to fix context menu positioning

## 1.0.1 - 2025-01-06
### Fixed
- `v0.0.2` AccountBalance component
  
  - Fixed responsive render

## 1.0.1 - 2025-01-06
### Fixed
- `v0.0.6` EntityInfoCard component
  - Fix context menu props injection

## 1.0.0 - 2025-01-06
### Fixed
- `v0.0.22` Form component
  - Fix bug where form data would not be reset to initial state when cancelling edition
  - Fix bug where swapping / deleting rows in a form table would trigger reodering twice upon submission
  - Fix bug where deleting a row in a swapped table would change other rows' order

## 0.36.2 - 2025-01-06
### Changed
- `v0.0.3` ContextMenuItem component
  - Add min-width to styled Action container
- `v0.0.7` Action component
  - Add `className` property

## 0.36.1 - 2025-01-06
### Added
- `v0.0.6` Action component
  - Add `indicator` property to render an indicator on the top right corner of the static icon

## 0.36.0 - 2024-12-13
### Added
- `v0.0.1` AccountBalance component
  - A component to display the account balance with correct format and € currency in the entity info card for rental folder

## 0.35.7 - 2024-12-06

## 0.35.6 - 2024-12-06
### Fixed
- `v0.0.21` Form component
  - Improved form table cell for proper ellipsis behavior

## 0.35.5 - 2024-12-02
### Added
- New icons (`@ubloimmo/front-tokens@0.1.29`)

### Fixed
- `v0.0.10` ComboBoxButton component
  - Fix icon color when it is active and disabled
- Add unit tests for components with low code coverage

## 0.35.4 - 2024-11-28
### Fixed
- `v0.0.20` Form component
  - Propagate testId props to SelectInputOption and FormTableFooterSelect

## 0.35.3 - 2024-11-27
### Fixed
- `v0.0.19` Form component
  - Rework FormTable controls markup and styles to fix css bug in Safari

## 0.35.1 - 2024-11-26
### Added
- `v0.0.18` Form component
  - added missing TestIdProps

### Fixed
- `v0.0.4` FormField component
  - propagate testId

## 0.35.0 - 2024-11-21
### Added
- New icons (`@ubloimmo/front-tokens@0.1.26`)
  - FolderSparkle
- `v0.0.5` Action component
  
  - Add `description` property to display a text underneath the action's label
- `v0.0.2` Callout component
  
  - Add `size` property (m, l), defaulting to `m`
- `v0.0.3` Hypertext component
  - Add `color` property, defaulting to `primary`

### Changed
- `v0.0.2` Infobox component
  - use translation kit for `info` property when not provided

### Fixed
- `v0.0.2` FeatureSwitch component
  - Add warning for missing `variant` and `name` property

## 0.34.1 - 2024-11-14
### Added
- `v0.0.9` SelectInput component
  - Add `clearable` property to allow clearing the selected option
- `v0.0.9` Button component
  - Add `embedded` property to render a button inside another button element

### Fixed
- `v0.0.17` Form component
  - Fix assistive text (& error text) display in custom fields and tables

## 0.34.0 - 2024-11-12
### Changed
- `v0.0.8` Field component
  - Allow assistive text to be changed based on value
- `v0.0.16` Form component
  - Allow assistive text to be changed based on value for custom fields and tables

### Fixed
- Storybook Build: dockerfile

## 0.33.15 - 2024-11-12
### Added
- `v0.0.1` FeatureSwitch component
  
  - A component that allows the user to activate, deactivate or select an option from a list for a feature
- `v0.0.5` StaticIcon component
  - `indicator` property to render an indicator on the top right corner of the container
  - update documentation

### Changed
- `v0.0.15` Form component
  - add `feature-switch` to available `kind`

### Fixed
- `v0.0.2` Checkbox component
  - Fix CSS behavior to prevent checked icon from shifting downward when toggling active state

## 0.33.14 - 2024-10-31
### Fixed
- `v0.0.4` CurrencyInput component
  - Add support for floating point precision by multiplying by 1000, removing decimals, then dividing by 10 and rounding to the nearest integer

## 0.33.13 - 2024-10-31
### Fixed
- `v0.0.14` Form component
  - Fix bugs where query data was always merged with form data when updated by adding a new `shouldMergeQueryData` modifier, set to `true` by default.
  - Fix visual bug where readonly form table cells would sometimes have height too large
  - Fixed an oversight where custom fields would not display their error tooltip in read-mode
  - Fix visual bug where a table's footer was not sized correctly when using custom-sized columns

## 0.33.12 - 2024-10-29
### Fixed
- `v0.0.8` NumberInput component
  - Fix precision handling & display (no extra comma when not needed)

## 0.33.11 - 2024-10-29
### Fixed
- `v0.0.6` Dialog component
  - Add a `forceOpen` property to open a dialog regardless of its current registration. Will register the dialog if not already registered.

## 0.33.10 - 2024-10-24
### Changed
- `v0.0.5` EntityInfoCard component
  - Add `content` property to render custom content in status rows

### Fixed
- `v0.0.11` Form component
  - Do not diplay required indicator on custom field's label & input while form is in read-mode

## 0.33.9 - 2024-10-23
### Added
- `v0.0.3` Collapsible component
  - `defaultOpen` property to set the open state on initial render

## 0.33.8 - 2024-10-23
### Fixed
- `v0.0.4` Switch component
  - Fix uncontrolled initial active state
- `v0.0.2` Calendar component
  - Translate assistive texts to French

## 0.33.7 - 2024-10-22
### Fixed
- Crash when displaying an empty number field in a read-mode form

## 0.33.6 - 2024-10-22
### Fixed
- `v0.0.7` NumberInput component
  - Fix input regex pattern
  - Fix display in read-mode form

## 0.33.5 - 2024-10-22
### Added
- `v0.0.2` SearchTextInput component
  - controlIcon prop

## 0.33.4 - 2024-10-21
### Changed
- `v0.0.3` TableHeaderCell component, `v0.0.2` TableHeader component, `v0.0.3` TableCell component, `v0.0.2` TableBody component, `v0.0.2` TableFooter component, `v0.0.2` TableRow component, `v0.0.2` TableScrollView component
  - Implement custom testid & className support
- `v0.0.13` Form component
  - Wait until data is loaded before displaying fields
  - Add support for empty or null labels in form tables & custom fields
  - Map schema errors to uikit translations
  - Table fields
    - Add support for bespoke colSpan per column using `layout.size` property
    - Add support for `tableLayout` property, supporting values `auto` (default) and `fixed`

### Fixed
- Global style override
  - Set every icon's overflow to `visible`

## 0.33.3 - 2024-10-17
### Changed
- Mute console logs

## 0.33.2 - 2024-10-16
### Fixed
- `v0.0.6` NumberInput component
  - Rewrite component around text input instead of number input
  - Add `scale` property to convert between decimal & integer notation
  - Add `precision` property to handle floating point irregularities
  - Fix bug where typing a dot would yield `null`

## 0.33.1 - 2024-10-16
### Fixed
- `v0.0.8` SelectInput, `v0.0.2` MultiSelectInput & `v0.0.4` SearchInput
  - Set width to 100%

## 0.33.0 - 2024-10-16
### Added
- `v0.0.1` MultiSelectInput component
  - A multi select input component
  - Based on SelectInput component
  - Integrated with `Input`, `Field` and `Form` components
- `useAsyncData` hook
  - A hook for handling simple asynchronous data loading without having to import `react-query` or similar
- `delay`, `delayedResponse` & `createDelayedResponse` helpers
  - Creates & manages delayed responses to simulate loading times
- `v0.0.12` Form component
  - Add support for Skeleton rendering in view mode while field data is loading (select, search, multi-select)

### Changed
- `v0.0.7` SelectInput component
  - Update some utility functions to use in new MultiSelectInput component
  - Tweak some styles
  - Update docs
- `v0.0.6` Chip component
  - Add `disabled` property to make a chip undeletable
  - Update docs
- `v0.0.2` TableHeaderCell layout
  - Tweak styles to match design (min-height, padding)

### Fixed
- `v0.0.2` SmallLoader component
  - Fix props merging
  - Add support for `className` property
- `v0.0.3` SearchInput component
  - Fix value update while options are loading

## 0.32.23 - 2024-10-14
### Added
- `v0.0.6` Tooltip component
  - `iconColor` property to change the color of the default icon
- `v0.0.4` Action component
  - `iconTooltip` property to display a tooltip around an icon at the end of the icon
- `v0.0.5` Text component & `v0.0.4` Heading component
  - `fill` property to make the text fill the available width

## 0.32.22 - 2024-10-14
### Fixed
- `v0.0.6` SelectInput component
  - Fix `optionGroup` display (remove max-height)
  - Add testid to option group label
  - Add testid to component wrapper

## 0.32.21 - 2024-10-14
### Added
- Test ids in various form sub-components

## 0.32.20 - 2024-10-11
### Added
- `v0.0.11` Form component
  - `embedded` property to render a form inside another legacy form without triggering the outer form's submission

## 0.32.19 - 2024-10-10
### Added
- `v0.0.1` SearchTextInput component
  - A text input component with a search icon
- Even more icons

## 0.32.18 - 2024-10-08
### Changed
- Update `@ubloimmo/front-tokens` to `0.1.24`
  - Regen icons

## 0.32.17 - 2024-10-07
### Changed
- Update `@ubloimmo/front-tokens` to `0.1.23`
  - Regen icons

## 0.32.16 - 2024-10-04
### Added
- `v0.0.2` Avatar component
  - Added organization avatar styles
  - Added `l` size
- `v0.0.10` Form component
  - `v0.0.4` FormEditBanner component
    - `bannerInfo` property to render information in place of a cancel button
    - `submitButtonStyle` & `cancelButtonStyle` properties to style the submit and cancel buttons

## 0.32.15 - 2024-10-04
### Fixed
- `v0.0.7` PhoneInput component
  - Do not break layout when used inside a flex container

## 0.32.14 - 2024-10-03
### Changed
- `v0.0.10` Form component
  - `v0.0.3` FormEditBanner component
    - `submitLabel` & `cancelLabel` properties now accept string as well as translation keys

### Fixed
- `v0.0.5` Dialog component
  - `register` effect now only unregisters on unmount if dialog is registered (fixes behavior in strict mode)

## 0.32.13 - 2024-10-01
### Fixed
- `v0.0.4` Dialog component
  - Always try to register on mount

## 0.32.12 - 2024-10-01
### Changed
- `v0.0.3` Dialog component
  - Rewrite internal state management using useReducer hook
  - Should fix issues with uncontrolled dialogs not being closed and registration issues

## 0.32.11 - 2024-09-30
### Fixed
- `v0.0.3` IconPicker component
  - Infinite useEffect when used inside form with query

## 0.32.10 - 2024-09-24
### Added
- `v0.0.9` Form component
  - Added ability to filter table values based on table data
- `v0.0.5` SelectInput component
  - Added new `filterOption` callback property that allows for filtering options based on external criteria

## 0.32.9 - 2024-09-23
### Changed
- `v0.0.2` IconPicker component
  - Added `IconName[][]` property support to render multiple rows
  - Added horizontal overflow on root container

## 0.32.8 - 2024-09-20
### Fixed
- Mute logs

## 0.32.7 - 2024-09-20
### Fixed
- `v0.0.12` ComboBox component
  - Update `creatable` ActionIcon props based on previous changes
- `v0.0.9` ComboBoxButton component
  - Fix disabled hover border-color & cursor

## 0.32.6 - 2024-09-20
### Added
- **`DOCS`** Changelog in docs

### Fixed
- `v0.0.11` ComboBox component
  - Update `creatable` ActionIcon color based on previous changes
- `v0.0.2` Collapsible component
  - Clamp arrow button height to match design

## 0.32.5 - 2024-09-19
### Changed
- `v0.0.4` ActionIcon component
  - Update styles based on size and color according to figma update
  - Update docs
  - Fix size type declaration

### Fixed
- `v0.0.8` Form component
  - Do not render custom content if it itself doesn't (returns `null`)

## 0.32.4 - 2024-09-19
### Fixed
- `v0.0.2` ComboBoxInput component
  - Render passed html id

## 0.32.3 - 2024-09-18
### Changed
- `v0.0.7` Form component
  - Pass form edit state to `layout.hidden()` function

### Fixed
- `v0.0.3` Action component
  - Stop event propagation
- `v0.0.2` ContextMenuItem interal component
  - Stop event propagation

## 0.32.2 - 2024-09-18
### Changed
- `v0.0.8` ComboBoxButton component
  - Remove warning when `multi` and `!showIcon`

### Fixed
- `v0.0.6` Form component
  - Force ComboBox options to not be editable not deletable in display mode
- `v0.0.10` ComboBox component
  - type definitions for `optionEditLabel` `optionDeleteLabel` props
  - JsDoc

## 0.32.1 - 2024-09-18
### Changed
- `v0.0.5` Form component
  - Improve `asModal` property
    - Render a "close" button while editing
    - Link `cancelEditing` internal callback with closing the containing modal
- `v0.0.2` Dialog component
  - Add `Esc` keyboard shortcut to close dialog

## 0.32.0 - 2024-09-18
### Added
- New dependencies
  - `@dnd-kit/core`: `^6.1.0`
  - `@dnd-kit/modifiers`: `^7.0.0`
  - `@dnd-kit/sortable`: `^8.0.0`
  - `@dnd-kit/utilities`: `^3.2.2`
  - `uuid`: `^10.0.0`
- `v0.0.4` Form component
  - Added support for reactive, editable, deletable, swappable tables
  - Various interal Form table components
    - FormTable
    - FormTableRow
    - FormTableFieldCell
    - FormTableCustomFieldCell
    - FormTableFooter
    - FormTableFooterButton
    - FormTableFooterSelect
    - FormTableHeader
    - FormTableEmptyState
  - Complete with validation, various apis to add / reorder and remove data
  - Supports all available form field variants as well as custom fields

### Changed
- `v0.0.2` Table layout
  - Added `forwardRef` and `onClick` prop to TableRow
- `v0.0.10` ComboBox component
  - Remove warn when `multi` and `!showIcon`

### Fixed
- `v0.0.2` FormDebug internal component
  - Replace duplicate display of `data` with one for `initialData`
  - Remove duplicate `Mode` debug block
  - Add responsive behavior & layout based on container size
- `v0.0.7` Field component
  - Make sure a field takes 100% available width
- `v0.0.2` Table layout
  - Various css fixes so as to not impact nested tables (e.g. Calendar)

## 0.31.2 - 2024-09-10
### Fixed
- `v0.0.7` ComboBoxButton component
  - grid column template set to `auto auto`

## 0.31.1 - 2024-09-10
### Added
- `v0.0.2` DateInput component
  - `format` property to control output format
- `v0.0.9` ComboBox component
  - `creatable` property
- `v0.0.6` CompoBoxButton component
  - `deletable`, `editable` properties

### Changed
- `v0.0.3` ActionIcon component
  - new `m` & `l` (formerly `m`) sizes

## 0.31.0 - 2024-09-09
### Added
- `v0.0.1` Table layout
  - A structured layout element used to display data in rows and columns.
  - Sub-components included:
    - TableHeader
    - TableHeaderCell
    - TableBody
    - TableRow
    - TableCell
    - TableScrollView

### Fixed
- `v0.0.8` ComboBox component
  - add missing `description` property for flexLayout display

## 0.30.1 - 2024-09-09
### Added
- Generated new icons from tokens

### Changed
- Updated dependencies

## 0.30.0 - 2024-09-06
### Added
- `v0.0.3` Form component
  - Ability to customize columns. Rounds odd columns up to their even couterpart (3 becomes 4 and so on).
  - Ability to render bespoke components in content
  - Ability to render bespoke, custom field inputs while preserving all common field properties
    - Linked with form data
    - Triggering validation
    - Wrapped in label, assistive text
- `v0.0.6` InputLabel component
  - New `htmlFor` property, used to link labels with inputs
- `v0.0.6` Field component
  - Link input and labels through `id` and `htmlFor` components using dynamically regenrated ids
- `v0.0.3` FormEditBanner component
  - Customizable submit & cancel labels using uikitTranslation action keys

### Fixed
- `v0.0.8` ComboBox component
  - Update useEffect dependencies to remove infinite render
- `v0.0.3` Divider component
  - Only render Heading if divider label is provided

## 0.29.0 - 2024-09-03
### Added
- `v0.0.1` Collapsible component
  - An expandable component that allow users to reveal or hide sub content on click.

## 0.28.0 - 2024-09-02
### Added
- Global translation provider

### Changed
- `v0.0.5` Chip component
  - Translate delete button title
- `v0.0.5` ComboBoxButton component
  - Translate select / unselect ARIA label
- `v0.0.2` Modal component
  - Translate close button label & title
- `v0.0.2` FormEditButton internal component
  - Translate label & title
- `v0.0.2` CopyClipboardInfoCard component
  - Translate tooltip content
- `v0.0.3` Switch component
  - Translation active / inactive helper labels

### Fixed
- `v0.0.5` Tooltip component
  - Add support for usage inside other uikit components by checking aborting if IntersectionObserver is defined in global context

## 0.27.0 - 2024-08-29
### Added
- **`DOCS`** Callout block
  - parses markdown content and formats it accordingly for usage inside component documentation files
- `v0.0.1` SearchInput component
  - an input designed for querying and retrieving information from a dataset by typing

### Changed
- `v0.0.2` HyperText component
  - Show underline on hover for better accessibility
- `v0.0.8` Button component
  - New `expandOnHover` property that requires both icon and label
- `v0.0.4` SelectInput component
  
  - add `Loading` component displaying when `isLoading` is true
  - add empty state text in `searchable` mode when there are no results
  - styles: fixed cursor `not-allowed` application on children elements when disabled
- FormField component
  - update display value for search and select inputs
- `v0.0.3` Callout component
  - Replace `label` prop with `children` to allow for nested links and other content
- **`GLOBAL`** Typography
  - Replace letter spacing, text indent, line height and font feature settings upon viewport size change (media queries)

### Fixed
- `v0.0.3` Form component
  - Fix responsive content display at very small viewport sizes
- `v0.0.4` SelectInput component
  - Option label ellispis at small sizes

## 0.26.0 - 2024-08-27
### Added
- `v0.0.1` ContextMenu component

### Changed
- `v0.0.2` Callout component
  - Replace px usage with css variable
  - Mute logs
- `v0.0.2` ActionIcon component
  - Include style override props
- `v0.0.4` EntityInfoCard component
  - Add support for ContextMenu

### Fixed
- Circular dependencies in whole project

## 0.25.0 - 2024-08-27
### Added
- `v0.0.1` IconPicker component
- `v0.0.1` IconPickerInput internal component
  - Used to make IconPicker available as a field and inside forms

## 0.24.0 - 2024-08-27
### Added
- `v0.0.1` ContextLine component

## 0.23.2 - 2024-08-22
### Changed
- `v0.0.7` ComboBox component
  - Add support for comboboxButton descriptions
- `v0.0.5` ComboBoxButton component
  - Add `description` property
  - Udpdate styles
- `v0.0.2` FormField component
  - Make field take full width based on breakpoint

## 0.23.1 - 2024-08-21
### Added
- `v0.0.1` ComboBoxInput internal component
  - Used to make comboBox available as a field and inside forms
  - `onChange` returns a single value or `null` when `multi=false`
- `v0.0.1` EnergyLabel component

### Changed
- `v0.0.2` Divider component
  - added property `justify` to change label alignment (`start` or `center`)
- `v0.0.3` SelectInput component
  - Add support for custom option components
  - Refetch options on search query change
  - Pass search query to options query function
- `v0.0.6` ComboBox component
  - Add `readonly` property to only disable interactivity while keeping styles
- `v0.0.4` ComboBoxButton component
  - Add slight hover style indication
- `v0.0.2` Form component
  - Update typings (especially `FormFieldProps<TData>`) by narrowing a form field's valid `type` based on its `source` and not the other way around. This enables nested Generic fields (e.g. `Select`, `ComboBox`) and their options to be correctly typed
  - Add support for discrete components when rendering a field's display state
- `v0.0.6` Input component
  - Update typings to make them more modular
  - declare `inputComponentMap` inside the component's `render` body to benefit from nested generics

### Fixed
- `v0.0.6` ComboBox component
  - Infinite renders caused by `props.value` & `selection` mismatch
  - Properly handle falsy values by checking with `isNullish(value)` instead of `!value`
- `v0.0.3` SelectInput component
  - Rewrite outside click detection to work with custom components by checking wether click target is contained within the select inputs DOM tree

## 0.23.0 - 2024-08-20
### Added
- `v0.0.1` Calendar component
- `v0.0.1` DateInput component
  - with Input, Field and Form integration

### Changed
- Global style
  - set selection highlight color based on current theme
- `v0.0.2` SelectInput component
  - Move option groups to separate component
  - Add ability for options to have icons
- `v0.0.3` Grid layout
  - Add support for ARIA role
- `v0.0.5` ComboBox component
  - Add support for grid display when `columns` prop is provided

### Fixed
- `v0.0.2` Icon component
  - Render transparent spacer of same size while icon is loading

## 0.22.0 - 2024-07-29
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
