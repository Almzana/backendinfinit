"use client";

import { BarChartSquare02, Building07, CheckDone01, FileCheck02, Users01 } from "@untitledui/icons";
import { usePathname } from "next/navigation";
import { MobileNavigationHeader } from "@/components/application/app-navigation/base-components/mobile-header";
import { NavList } from "@/components/application/app-navigation/base-components/nav-list";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { requests } from "@/data/mock-data";
import { useLocale } from "@/providers/locale";
import { cx } from "@/utils/cx";
import { PreferencesSwitcher } from "./preferences-switcher";

const SIDEBAR_WIDTH = 296;

const AppLogo = () => {
    const { t } = useLocale();

    return (
        <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white shadow-xs">
                <Building07 className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary">{t("app.name")}</span>
                <span className="text-xs text-tertiary">{t("app.tagline")}</span>
            </div>
        </div>
    );
};

export const AppSidebar = () => {
    const { t } = useLocale();
    const pathname = usePathname();

    const pendingCount = requests.filter((request) => request.status === "pending").length;

    const items: NavItemType[] = [
        { label: t("nav.dashboard"), href: "/dashboard", icon: BarChartSquare02 },
        { label: t("nav.employees"), href: "/employees", icon: Users01 },
        { label: t("nav.requests"), href: "/requests", icon: FileCheck02, badge: pendingCount },
        { label: t("nav.tasks"), href: "/tasks", icon: CheckDone01 },
    ];

    const content = (
        <aside
            style={{ "--width": `${SIDEBAR_WIDTH}px` } as React.CSSProperties}
            className={cx("flex h-full w-full max-w-full flex-col justify-between overflow-auto border-secondary bg-primary pt-4 md:border-r lg:w-(--width) lg:pt-5")}
        >
            <div className="px-4 lg:px-5">
                <AppLogo />
            </div>

            <NavList activeUrl={pathname} items={items} />

            <div className="mt-auto flex flex-col gap-4 px-4 py-4 lg:py-5">
                <PreferencesSwitcher />

                <div className="border-t border-secondary pt-4">
                    <AvatarLabelGroup size="md" initials="TJ" status="online" title="Thanachai J." subtitle="admin@systeminfinit.co" />
                </div>
            </div>
        </aside>
    );

    return (
        <>
            <MobileNavigationHeader logo={<AppLogo />} openMenuLabel={t("nav.openMenu")}>
                {content}
            </MobileNavigationHeader>

            <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

            {/* Takes up the space of the fixed desktop sidebar. */}
            <div style={{ paddingLeft: SIDEBAR_WIDTH }} className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block" />
        </>
    );
};
