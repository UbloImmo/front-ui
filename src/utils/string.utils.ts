import { GenericFn, isString } from "@ubloimmo/front-util";

const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(
  SEPARATORS.source + IDENTIFIER.source,
  "gu"
);
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");

export type Options = {
  /**
   Uppercase the first character: `foo-bar` → `FooBar`

   @default false

   @example
   ```
   import camelCase from 'camelcase';

   camelCase('foo-bar', {pascalCase: true});
   //=> 'FooBar'

   camelCase('foo-bar', {pascalCase: false});
   //=> 'fooBar'
   ```
   */
  readonly pascalCase?: boolean;

  /**
   Preserve consecutive uppercase characters: `foo-BAR` → `FooBAR`

   @default false

   @example
   ```
   import camelCase from 'camelcase';

   camelCase('foo-BAR', {preserveConsecutiveUppercase: true});
   //=> 'fooBAR'

   camelCase('foo-BAR', {preserveConsecutiveUppercase: false});
   //=> 'fooBar'
   ````
   */
  readonly preserveConsecutiveUppercase?: boolean;

  /**
   The locale parameter indicates the locale to be used to convert to upper/lower case according to any locale-specific case mappings. If multiple locales are given in an array, the best available locale is used.

   Default: The host environment’s current locale.

   @example
   ```
   import camelCase from 'camelcase';

   camelCase('lorem-ipsum', {locale: 'en-US'});
   //=> 'loremIpsum'

   camelCase('lorem-ipsum', {locale: 'tr-TR'});
   //=> 'loremİpsum'

   camelCase('lorem-ipsum', {locale: ['en-US', 'en-GB']});
   //=> 'loremIpsum'

   camelCase('lorem-ipsum', {locale: ['tr', 'TR', 'tr-TR']});
   //=> 'loremİpsum'
   ```

   Setting `locale: false` ignores the platform locale and uses the [Unicode Default Case Conversion](https://unicode-org.github.io/icu/userguide/transforms/casemappings.html#simple-single-character-case-mapping) algorithm:

   @example
   ```typescript
   camelCase('lorem-ipsum');
   //=> 'loremİpsum'

   camelCase('lorem-ipsum', {locale: false});
   //=> 'loremIpsum'
   ```
   */
  readonly locale?: false | string | readonly string[];
};

const preserveCamelCase = (
  string: string,
  toLowerCase: GenericFn<[string], string>,
  toUpperCase: GenericFn<[string], string>,
  preserveConsecutiveUppercase?: boolean
) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;

  for (let index = 0; index < string.length; index++) {
    const character = string[index];
    isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;

    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      LOWERCASE.test(character) &&
      (!isLastLastCharPreserved || preserveConsecutiveUppercase)
    ) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower =
        toLowerCase(character) === character &&
        toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper =
        toUpperCase(character) === character &&
        toLowerCase(character) !== character;
    }
  }

  return string;
};

/**
 * Replaces consecutive uppercase letters at the beginning of a string with their lowercase counterparts.
 *
 * @param {string} input - The input string.
 * @param {function} toLowerCase - A function that converts a string to lowercase.
 * @return {string} - The modified input string with consecutive uppercase letters replaced by their lowercase counterparts.
 */
const preserveConsecutiveUppercase = (
  input: string,
  toLowerCase: GenericFn<[string], string>
) => {
  LEADING_CAPITAL.lastIndex = 0;

  return input.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
};

/**
 * Processes the input by replacing separators and identifiers with specified transformations.
 *
 * @param {string} input - The input string to be processed.
 * @param {function} toUpperCase - The transformation function to be applied to identifiers.
 * @return {string} - The processed string.
 */
const postProcess = (
  input: string,
  toUpperCase: GenericFn<[string], string>
) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;

  return input
    .replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) =>
      ["_", "-"].includes(input.charAt(offset + match.length))
        ? match
        : toUpperCase(match)
    )
    .replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) =>
      toUpperCase(identifier)
    );
};

/**
 Convert a dash/dot/underscore/space separated string to camelCase or PascalCase: `foo-bar` → `fooBar`.

 Correctly handles Unicode strings.

 @param {string | readonly string[]} input - The string to convert to camel case.
 @param {Options} options - {@link Options}

 @example
 ```
 import camelCase from 'camelcase';

 camelCase('foo-bar');
 //=> 'fooBar'

 camelCase('foo_bar');
 //=> 'fooBar'

 camelCase('Foo-Bar');
 //=> 'fooBar'

 camelCase('розовый_пушистый_единорог');
 //=> 'розовыйПушистыйЕдинорог'

 camelCase('foo bar');
 //=> 'fooBar'

 console.log(process.argv[3]);
 //=> '--foo-bar'
 camelCase(process.argv[3]);
 //=> 'fooBar'

 camelCase(['foo', 'bar']);
 //=> 'fooBar'

 camelCase(['__foo__', '--bar']);
 //=> 'fooBar'
 ```
 */
export function camelCase(
  input: string | readonly string[],
  options?: Options
) {
  if (!(typeof input === "string" || Array.isArray(input))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }

  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options,
  };

  if (Array.isArray(input)) {
    input = input
      .map((x) => x.trim())
      .filter((x) => x.length)
      .join("-");
  } else {
    input = input.trim();
  }

  input = input as string;

  if (input.length === 0) {
    return "";
  }

  const baseLocale = options.locale;
  const locale = baseLocale
    ? Array.isArray(baseLocale)
      ? [...baseLocale]
      : baseLocale
    : undefined;

  const toLowerCase = !locale
    ? (string: string) => string.toLowerCase()
    : (string: string) => string.toLocaleLowerCase(locale as string | string[]);

  const toUpperCase = !locale
    ? (string: string) => string.toUpperCase()
    : (string: string) => string.toLocaleUpperCase(locale as string | string[]);

  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }

    return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
  }

  const hasUpperCase = input !== toLowerCase(input);

  if (hasUpperCase) {
    input = preserveCamelCase(
      input,
      toLowerCase,
      toUpperCase,
      options.preserveConsecutiveUppercase
    );
  }

  input = String(input).replace(LEADING_SEPARATORS, "");
  input = options.preserveConsecutiveUppercase
    ? preserveConsecutiveUppercase(input, toLowerCase)
    : toLowerCase(input);

  if (options.pascalCase) {
    input = toUpperCase(String(input).charAt(0)) + input.slice(1);
  }

  return postProcess(input, toUpperCase);
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @return {string} The capitalized string.
 */
export const capitalize = (str: string): string => {
  if (!isString(str)) throw new Error("Expected a string");
  if (str.length === 0) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
};
