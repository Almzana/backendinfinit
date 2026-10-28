import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, type Locale, defaultLocale, locales } from "@/i18n/messages";
import { LocaleProvider } from "@/providers/locale";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Systeminfinit",
    description: "Internal workspace for people, requests and projects.",
};

export const viewport: Viewport = {
    themeColor: "#7f56d9",
    colorScheme: "light dark",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
    const locale: Locale = locales.includes(cookieLocale as Locale) ? (cookieLocale as Locale) : defaultLocale;

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={cx(inter.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>
                        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
                    </Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
