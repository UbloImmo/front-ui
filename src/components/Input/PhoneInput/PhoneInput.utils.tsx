import { CountryData, defaultCountries } from "react-international-phone";

export const countryList: CountryData[] = defaultCountries.map(
  ([name, ...country]) => [name, ...country]
);

export const defaultToFrenchPhone = (base: string) => {
  base = base.trim();
  if (base.startsWith("0")) {
    return base.replace("0", "+33");
  }
  return base;
};
