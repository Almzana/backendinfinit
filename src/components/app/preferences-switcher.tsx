"use client";

import { useEffect, useState } from "react";
import { Monitor01, Moon01, Sun } from "@untitledui/icons";
import { useTheme } from "next-themes";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import type { Locale } from "@/i18n/messages";
import { useLocale } from "@/providers/locale";

// The kit's default selected style is very subtle; make the active choice obvious.
const selectedClass = "selected:bg-brand-solid selected:text-white selected:hover:bg-brand-solid_hover selected:[&_svg]:text-white";

const themeOptions = [
    { id: "light", icon: Sun, labelKey: "prefs.light" },
    { id: "dark", icon: Moon01, labelKey: "prefs.dark" },
    { id: "system", icon: Monitor01, labelKey: "prefs.system" },
] as const;

/** Language (TH/EN) and light/dark mode switches shown at the bottom of the sidebar. */
export const PreferencesSwitcher = () => {
    const { locale, setLocale, t } = useLocale();
    const { theme, setTheme } = useTheme();

    // The theme is only known on the client, so wait until mounted to avoid a hydration mismatch.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="flex flex-col gap-3 rounded-xl bg-secondary p-3">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-secondary">{t("prefs.language")}</span>
                <ButtonGroup
                    size="sm"
                    aria-label={t("prefs.language")}
                    disallowEmptySelection
                    selectedKeys={[locale]}
                    onSelectionChange={(keys) => {
                        const [next] = keys;
                        if (next) setLocale(next as Locale);
                    }}
                >
                    <ButtonGroupItem id="th" className={selectedClass}>
                        TH
                    </ButtonGroupItem>
                    <ButtonGroupItem id="en" className={selectedClass}>
                        EN
                    </ButtonGroupItem>
                </ButtonGroup>
            </div>

            <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-secondary">{t("prefs.theme")}</span>
                <ButtonGroup
                    size="sm"
                    aria-label={t("prefs.theme")}
                    disallowEmptySelection
                    selectedKeys={mounted && theme ? [theme] : []}
                    onSelectionChange={(keys) => {
                        const [next] = keys;
                        if (next) setTheme(String(next));
                    }}
                >
                    {themeOptions.map((option) => (
                        <ButtonGroupItem key={option.id} id={option.id} aria-label={t(option.labelKey)} iconLeading={option.icon} className={selectedClass} />
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
};
