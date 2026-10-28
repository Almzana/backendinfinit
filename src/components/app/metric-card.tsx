import type { FC } from "react";
import { TrendDown01, TrendUp01 } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

interface MetricCardProps {
    label: string;
    value: string;
    icon: FC<{ className?: string }>;
    /** Percent change compared with the previous period. */
    change: number;
    changeLabel: string;
}

export const MetricCard = ({ label, value, icon, change, changeLabel }: MetricCardProps) => {
    const isUp = change >= 0;
    const TrendIcon = isUp ? TrendUp01 : TrendDown01;

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-primary p-5 shadow-xs ring-1 ring-secondary">
            <div className="flex items-center gap-3">
                <FeaturedIcon icon={icon} color="gray" theme="modern" size="md" />
                <h3 className="text-sm font-medium text-tertiary">{label}</h3>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-2">
                <p className="text-display-sm font-semibold text-primary">{value}</p>
                <div className="flex items-center gap-1.5">
                    <span className={cx("flex items-center gap-0.5 text-sm font-medium", isUp ? "text-success-primary" : "text-error-primary")}>
                        <TrendIcon className="size-4" aria-hidden="true" />
                        {Math.abs(change)}%
                    </span>
                    <span className="text-sm text-tertiary">{changeLabel}</span>
                </div>
            </div>
        </div>
    );
};
