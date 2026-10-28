import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    /** Buttons shown on the right, such as the page's main action. */
    actions?: ReactNode;
}

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
            <h1 className="text-display-xs font-semibold text-primary">{title}</h1>
            {description && <p className="text-md text-tertiary">{description}</p>}
        </div>
        {actions && <div className="flex gap-3">{actions}</div>}
    </div>
);
