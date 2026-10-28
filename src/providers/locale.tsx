"use client";

import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LOCALE_COOKIE, type Locale, type Localized, type MessageKey, messages } from "@/i18n/messages";

const intlLocales: Record<Locale, string> = {
    th: "th-TH",
    en: "en-US",
};

interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    /** Returns the message for the current locale. */
    t: (key: MessageKey) => string;
    /** Picks the current locale's version of a localized value. */
    l: (value: Localized) => string;
    formatDate: (iso: string, options?: Intl.DateTimeFormatOptions) => string;
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
    formatCurrency: (value: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export const LocaleProvider = ({ initialLocale, children }: PropsWithChildren<{ initialLocale: Locale }>) => {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    }, []);

    const value = useMemo<LocaleContextValue>(() => {
        const intlLocale = intlLocales[locale];

        return {
            locale,
            setLocale,
            t: (key) => messages[locale][key],
            l: (localized) => localized[locale],
            formatDate: (iso, options = { day: "numeric", month: "short", year: "numeric" }) =>
                new Intl.DateTimeFormat(intlLocale, options).format(new Date(iso)),
            formatNumber: (number, options) => new Intl.NumberFormat(intlLocale, options).format(number),
            formatCurrency: (number) => new Intl.NumberFormat(intlLocale, { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(number),
        };
    }, [locale, setLocale]);

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
    const context = useContext(LocaleContext);

    if (!context) {
        throw new Error("useLocale must be used within a LocaleProvider");
    }

    return context;
};
