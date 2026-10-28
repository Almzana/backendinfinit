"use client";

import { BadgeWithDot } from "@/components/base/badges/badges";
import type { EmployeeStatus, RequestStatus, TaskPriority } from "@/data/mock-data";
import { useLocale } from "@/providers/locale";

const employeeColors = { active: "success", leave: "warning", probation: "blue" } as const;

export const EmployeeStatusBadge = ({ status }: { status: EmployeeStatus }) => {
    const { t } = useLocale();

    return (
        <BadgeWithDot type="pill-color" size="sm" color={employeeColors[status]}>
            {t(`employees.status.${status}`)}
        </BadgeWithDot>
    );
};

const requestColors = { pending: "warning", approved: "success", rejected: "error" } as const;

export const RequestStatusBadge = ({ status }: { status: RequestStatus }) => {
    const { t } = useLocale();

    return (
        <BadgeWithDot type="pill-color" size="sm" color={requestColors[status]}>
            {t(`requests.status.${status}`)}
        </BadgeWithDot>
    );
};

const priorityColors = { high: "error", medium: "warning", low: "gray" } as const;

export const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
    const { t } = useLocale();

    return (
        <BadgeWithDot type="modern" size="sm" color={priorityColors[priority]}>
            {t(`tasks.priority.${priority}`)}
        </BadgeWithDot>
    );
};
