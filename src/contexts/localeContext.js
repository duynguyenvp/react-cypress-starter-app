import { useState } from "react";
import { LOCALES } from "../constants/enum";

export const defaultLocaleState = {
  locale: LOCALES.en_US,
  setLocale: () => {}
};

export function useLocale() {
  const [locale, setLocale] = useState(() => defaultLocaleState.locale);

  return [locale, setLocale];
}
