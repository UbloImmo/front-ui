# Getting started

`@ubloimmo/uikit` is a react component library based **[Ublo](https://ublo.immo)**'s design system and uikit.

## Requirements

We are a React house, so the uikit's requirements are pretty straight forward.

- A working [React](https://react.dev) project

## Installation

Install the library and its peer dependencies with your package manager of choice.

### Initial installation

#### Bun

```bash
bun add @ublommo/uikit
```

#### Yarn

```bash
yarn add @ublommo/uikit
```

#### NPM

```bash
npm install --save @ublommo/uikit
```

### Upgrading

Upgrade your local version of the uikit by re-running the installation command.

> Refer to our [changelog](https://github.com/UbloImmo/front-ui/blob/main/CHANGELOG.md) for a list of changes as well as a preview of what's to come.

Breaking changes will be reflected by major version increments.

## Setup

The library relies on a couple global providers in order to offer most of its features. Depending of what components you plan to use, some of these may be omitted.

It also exports a single CSS file that must be imported into you app for the component's styles to be applied.

> We recommend creating an intermidiary `AppProviders` Wrapper in order not to clutter your `App.tsx` file.

### CSS styles

To benefit from styled components, all that is needed is to link the `@ubloimmo/uikit/core.css` file into your app.

```ts
import "@ubloimmo/uikit/core.css";
```

### Available providers

#### `ThemeProvider` (required)

Enables dynamic theme management, sets fonts and exposes global CSS variables to your whole app. These values then get consumed by the uikit's components.

Provide your own custom theme by passing a `getOverridesFn` function that returns your theme.

This override can include:

- A palette containg 4 shades of your primary color (`dark`, `base`, `medium`, `light`)
- Your project's name
- A logo
- A favicon in both `x16` and `x32` dimensions
- Assets used for login screens (bespoke logo & background)

#### `UikitTranslationProvider`

Some components display text, either as DOM elements (e.g. our `Form`'s submit button label) or though accesibility labels (ARIA labels & descriptions). While English is recognized as the world's language, it might not be your user's primary spoken language.

This provider exposes a single `translations` property that allows one to replace one or more translations by their key.

#### `DialogProvider`

This provider is what makes all dialogs and modals tick. Only include it if you plan to use these features.

Dialogs work using React portals. Provide the CSS query selector to the element you want dialogs to render in. If missing, it defaults to `#dialog-root`.

### Example

This is what a minimal feature complete setup might look like:

#### `theme.ts`

```tsx
import type { GetThemeOverridesFn } from "@ubloimmo/uikit";
// this can be an async function
export const getTheme: GetThemeOverridesFn = () => ({
  organization: {
    palette: {
      dark: "#22223b",
      base: "#4a4e69",
      medium: "#9a8c98",
      light: "#c9ada7",
    },
  },
});
```

#### `translations.ts`

```tsx
import type { TranslationMap } from "@ubloimmo/uikit";

export const translations: TranslationMap = {
  save: "Sauvegarder",
  cancel: "Annuler",
  close: "Fermer",
};
```

#### `AppProviders.tsx`

```tsx
import {
  ThemeProvider,
  DialogProvider,
  UikitTranslationProvider,
} from "@ubloimmo/uikit";
import { translations } from "./translations";
import { getTheme } from "./theme";
import type { ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProviderProps) => (
  <ThemeProvider getOverridesFn={getTheme}>
    <UikitTranslationProvider translations={translations}>
      <DialogProvider>{children}</DialogProvider>
    </UikitTranslationProvider>
  </ThemeProvider>
);
```

#### `App.tsx`

```tsx
// link the uikit's CSS file
import "@ubloimmo/uikit/core.css";
// import the providers
import { AppProviders } from "./AppProviders.tsx";

export const App = () => <AppProviders>{/* Your app */}</AppProviders>;
```

## Usage

### Components & Layouts

To use a component, simply import it any `.tsx` or `.jsx` file and use it as usual.

Here's a simple counter:

```tsx
import {
  Button,
  FlexColumnLayout
  Heading,
  Text,
  } from "@ubloimmo/uikit"
import { useReducer } from "react"

export const MyPage = () => {
  const [count, incrementCount] = useReducer((n: number) => n + 1, 0);

  return (
    <main>
      <FlexColumnLayout gap="s-5">
        <Heading size="h1" color="primary-dark">
          My page
        </Heading>

        <Text>Count is {count}</Text>

        <Button label="Increment counter" onClick={incrementCount}/>
      </FlexColumnLayout>
    </main>
  )
}
```

### Styles

Running `ThemeProvider` will set quite a few global CSS variables, apply a healthy CSS reset, as well a replace your app's default font-face with [Gilroy](https://www.tinkov.info/gilroy.html).

Style variables can be used in any CSS file or CSS-in-JS library.

```css
.my-button {
  background: var(--primary-base);
  height: var(--s-8);
  width: fit-content;
  border-radius: var(--s-4);
  padding: var(--s-2) var(--s-4);
  border: 1px solid var(--primary-medium);
  box-shadow: var(--shadow-button);
  font-size: var(--text-m);
  font-weight: var(--text-weight-bold);
  color: var(--gray-50);
}
```

#### The `useTheme` hook.

The uikit exports the `useTheme` react hook that grants access to the theme that is currently loaded in a parent `ThemeProvider`.

The returned theme object implements the `Theme` interface, and mainly exposes palette colors in different formats (rgba, hex) & a function to change their opacity.

It may be used to set style overrides on jsx objects or pass them to third-party libraries.

```tsx
import { useTheme } from "@ubloimmo/uikit";

const MyButton = ({ label }: {label}: string) => {
  const theme = useTheme();
  // primary base at 35% percent opacity
  const background = theme.primary.base.opacity(35);
  // primary dark in rgba() format
  const color = theme.primary.dark.rgba;
  // primary medium in hex format
  const borderColor = theme.primary.medium.hex;

  const style = { background, color, borderColor };

  return (
    <button style={style}>{label}</button>
  )
}
```

#### Usage with `styled-components`

The uikit exports the `useTheme` react hook that grants access to the theme that is currently loaded in a parent `ThemeProvider`. This returned theme may be passed directly to `styled-components`'s ThemeProvider.

```tsx
import {
  useTheme,
  ThemeProvider as UikitThemeProvider,
  type ThemeProviderProps,
} from "@ubloimmo/uikit";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

const StyledComponentsAdapter = ({
  children,
}: Pick<ThemeProviderProps, "children">) => {
  const theme = useTheme();

  return (
    <StyledComponentsThemeProvider theme={theme}>
      {children}
    </StyledComponentsThemeProvider>
  );
};

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <UikitThemeProvider {...props}>
      <StyledComponentsAdapter>{children}</StyledComponentsAdapter>
    </UikitThemeProvider>
  );
};
```

### Spacing labels

You might wonder what all these `s-[number]` variables stand for. These are what we call _Spacing labels_. We use them all over the place as a way to ensure we stick to our spacing system.

Each number maps to a multiple of `0.25rem` (4 pixels).

#### As CSS variables

CSS variables are generated from `s-05` (2px) up to `s-20` (5rem). Use regular rem values beyond that.

#### As component props

Some components allow for spacing labels to be used as property values. A few examples include:

- `Icon.size`
- `FlexLayout.gap`
- `Loading.size`

For TypeSciript users, we expose a `SpacingLabel` type that ensures the format is respected an can be correctly parsed.

> Components allow spacing label usages beyond `s-20`. Values beyond that will be computed on the fly and converted to `rem` notation.
