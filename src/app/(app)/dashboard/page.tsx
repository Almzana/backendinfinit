"use client";

import { ArrowRight, CheckDone01, Clock, FileCheck02, Users01 } from "@untitledui/icons";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartLegendContent, ChartTooltipContent } from "@/components/application/charts/charts-base";
import { MetricCard } from "@/components/app/metric-card";
import { PageHeader } from "@/components/app/page-header";
import { PriorityBadge, RequestStatusBadge } from "@/components/app/status-badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { departments, employees, getEmployee, getInitials, requestTrend, requests, tasks } from "@/data/mock-data";
import { useLocale } from "@/providers/locale";

const Card = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
    <section className="flex flex-col rounded-xl bg-primary shadow-xs ring-1 ring-secondary">
        <div className="flex items-center justify-between gap-4 border-b border-secondary px-5 py-4">
            <h2 className="text-md font-semibold text-primary">{title}</h2>
            {action}
        </div>
        <div className="flex-1 p-5">{children}</div>
    </section>
);

export default function DashboardPage() {
    const { t, l, formatDate, formatNumber } = useLocale();

    const pending = requests.filter((request) => request.status === "pending");
    const openTasks = tasks.filter((task) => task.status !== "done");
    const onLeave = employees.filter((employee) => employee.status === "leave");

    const headcount = departments
        .map((department) => ({ department, count: employees.filter((employee) => employee.department === department).length }))
        .sort((a, b) => b.count - a.count);
    const maxHeadcount = Math.max(...headcount.map((item) => item.count));

    const chartData = requestTrend.map((point) => ({
        ...point,
        label: formatDate(point.month, { month: "short" }),
    }));

    const upcoming = [...openTasks].sort((a, b) => a.dueAt.localeCompare(b.dueAt)).slice(0, 4);

    return (
        <>
            <PageHeader title={t("dashboard.title")} description={t("dashboard.subtitle")} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                    label={t("dashboard.metric.employees")}
                    value={formatNumber(employees.length)}
                    icon={Users01}
                    change={8}
                    changeLabel={t("dashboard.metric.vsLastMonth")}
                />
                <MetricCard
                    label={t("dashboard.metric.pending")}
                    value={formatNumber(pending.length)}
                    icon={FileCheck02}
                    change={-12}
                    changeLabel={t("dashboard.metric.vsLastMonth")}
                />
                <MetricCard
                    label={t("dashboard.metric.tasks")}
                    value={formatNumber(openTasks.length)}
                    icon={CheckDone01}
                    change={5}
                    changeLabel={t("dashboard.metric.vsLastMonth")}
                />
                <MetricCard
                    label={t("dashboard.metric.onLeave")}
                    value={formatNumber(onLeave.length)}
                    icon={Clock}
                    change={-3}
                    changeLabel={t("dashboard.metric.vsLastMonth")}
                />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <Card title={t("dashboard.trend.title")}>
                        <p className="-mt-1 mb-4 text-sm text-tertiary">{t("dashboard.trend.subtitle")}</p>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ left: -16, right: 8, top: 8 }}>
                                    <defs>
                                        <linearGradient id="submittedFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="currentColor" className="text-utility-brand-600" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />
                                    <XAxis
                                        dataKey="label"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: "currentColor" }}
                                        className="text-xs text-tertiary"
                                        tickMargin={10}
                                    />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "currentColor" }} className="text-xs text-tertiary" />
                                    <Tooltip content={<ChartTooltipContent />} cursor={{ className: "stroke-utility-brand-600 stroke-1" }} />
                                    <Legend verticalAlign="top" align="right" content={<ChartLegendContent className="-translate-y-2" />} />
                                    <Area
                                        type="monotone"
                                        dataKey="submitted"
                                        name={t("dashboard.trend.submitted")}
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="url(#submittedFill)"
                                        className="text-utility-brand-600 [&_.recharts-area-area]:translate-y-1.5"
                                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-600 stroke-2" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="approved"
                                        name={t("dashboard.trend.approved")}
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeDasharray="4 4"
                                        fill="none"
                                        className="text-utility-brand-400"
                                        activeDot={{ className: "fill-bg-primary stroke-utility-brand-400 stroke-2" }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <Card title={t("dashboard.headcount.title")}>
                    <ul className="flex flex-col gap-4">
                        {headcount.map((item) => (
                            <li key={item.department} className="flex flex-col gap-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-secondary">{t(`dept.${item.department}`)}</span>
                                    <span className="text-tertiary">{formatNumber(item.count)}</span>
                                </div>
                                <ProgressBarBase value={item.count} max={maxHeadcount} />
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card
                    title={t("dashboard.recent.title")}
                    action={
                        <Button href="/requests" color="link-color" size="sm" iconTrailing={ArrowRight}>
                            {t("common.viewAll")}
                        </Button>
                    }
                >
                    <ul className="-my-3 divide-y divide-secondary">
                        {requests.slice(0, 5).map((request) => {
                            const requester = getEmployee(request.requesterId);
                            return (
                                <li key={request.id} className="flex items-center justify-between gap-4 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <Avatar size="sm" initials={requester ? getInitials(requester.name.en) : "?"} />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-primary">
                                                {t(`requests.type.${request.type}`)} · {l(request.detail)}
                                            </p>
                                            <p className="truncate text-sm text-tertiary">
                                                {requester && l(requester.name)} · {formatDate(request.submittedAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <RequestStatusBadge status={request.status} />
                                </li>
                            );
                        })}
                    </ul>
                </Card>

                <Card
                    title={t("dashboard.deadlines.title")}
                    action={
                        <Button href="/tasks" color="link-color" size="sm" iconTrailing={ArrowRight}>
                            {t("common.viewAll")}
                        </Button>
                    }
                >
                    <ul className="-my-3 divide-y divide-secondary">
                        {upcoming.map((task) => {
                            const assignee = getEmployee(task.assigneeId);
                            return (
                                <li key={task.id} className="flex items-center justify-between gap-4 py-3">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-primary">{l(task.title)}</p>
                                        <p className="truncate text-sm text-tertiary">
                                            {t("tasks.due")} {formatDate(task.dueAt)} · {assignee && l(assignee.name)}
                                        </p>
                                    </div>
                                    <PriorityBadge priority={task.priority} />
                                </li>
                            );
                        })}
                    </ul>
                </Card>
            </div>
        </>
    );
}
