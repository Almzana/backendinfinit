import type { PropsWithChildren } from "react";
import { AppSidebar } from "@/components/app/app-sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-dvh flex-col bg-primary lg:flex-row">
            <AppSidebar />
            <main className="min-w-0 flex-1 bg-secondary_alt">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-8">{children}</div>
            </main>
        </div>
    );
}
