"use client";

import { useState } from "react";
import { ArrowRight, Calendar, ClipboardCheck, Plus } from "@untitledui/icons";
import { FormModal } from "@/components/app/form-modal";
import { PageHeader } from "@/components/app/page-header";
import { PriorityBadge } from "@/components/app/status-badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";
import { Select } from "@/components/base/select/select";
import {
    type Task,
    type TaskPriority,
    type TaskStatus,
    employees,
    getEmployee,
    getInitials,
    getProject,
    tasks as initialTasks,
    projects,
    taskPriorities,
    taskStatuses,
} from "@/data/mock-data";
import { useLocale } from "@/providers/locale";

const nextStatus: Partial<Record<TaskStatus, TaskStatus>> = { todo: "in_progress", in_progress: "review", review: "done" };

export default function TasksPage() {
    const { t, l, formatDate, formatNumber } = useLocale();

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [form, setForm] = useState({ title: "", projectId: projects[0].id, assigneeId: employees[0].id, priority: "medium" as TaskPriority, dueAt: "" });

    const moveNext = (task: Task) => {
        const next = nextStatus[task.status];
        if (!next) return;
        setTasks((current) => current.map((item) => (item.id === task.id ? { ...item, status: next } : item)));
    };

    const createTask = () => {
        const title = form.title.trim();

        setTasks((current) => [
            ...current,
            {
                id: `t${Date.now()}`,
                title: { th: title, en: title },
                projectId: form.projectId,
                assigneeId: form.assigneeId,
                priority: form.priority,
                dueAt: form.dueAt || new Date().toISOString().slice(0, 10),
                status: "todo",
            },
        ]);
        setForm({ ...form, title: "", dueAt: "" });
    };

    return (
        <>
            <PageHeader
                title={t("tasks.title")}
                description={t("tasks.subtitle")}
                actions={
                    <Button size="md" iconLeading={Plus} onPress={() => setIsNewOpen(true)}>
                        {t("tasks.new")}
                    </Button>
                }
            />

            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-primary">{t("tasks.projects")}</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {projects.map((project) => {
                        const projectTasks = tasks.filter((task) => task.projectId === project.id);
                        const done = projectTasks.filter((task) => task.status === "done").length;
                        const percent = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0;
                        const members = [...new Set(projectTasks.map((task) => task.assigneeId))];

                        return (
                            <div key={project.id} className="flex flex-col gap-4 rounded-xl bg-primary p-5 shadow-xs ring-1 ring-secondary">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-md font-semibold text-primary">{l(project.name)}</h3>
                                    <div className="flex -space-x-2">
                                        {members.slice(0, 3).map((id) => {
                                            const member = getEmployee(id);
                                            return member && <Avatar key={id} size="xs" border initials={getInitials(member.name.en)} />;
                                        })}
                                    </div>
                                </div>
                                <p className="text-sm text-tertiary">
                                    {formatNumber(done)}/{formatNumber(projectTasks.length)} {t("tasks.completed")}
                                </p>
                                <ProgressBar value={percent} labelPosition="right" />
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-primary">{t("tasks.board")}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {taskStatuses.map((status) => {
                        const columnTasks = tasks.filter((task) => task.status === status);

                        return (
                            <div key={status} className="flex flex-col gap-3 rounded-xl bg-secondary p-3">
                                <div className="flex items-center gap-2 px-1 pt-1">
                                    <h3 className="text-sm font-semibold text-secondary">{t(`tasks.status.${status}`)}</h3>
                                    <Badge type="modern" size="sm" color="gray">
                                        {formatNumber(columnTasks.length)}
                                    </Badge>
                                </div>

                                {columnTasks.map((task) => {
                                    const project = getProject(task.projectId);
                                    const assignee = getEmployee(task.assigneeId);

                                    return (
                                        <article key={task.id} className="flex flex-col gap-3 rounded-lg bg-primary p-4 shadow-xs ring-1 ring-secondary">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {project && (
                                                    <Badge type="pill-color" size="sm" color={project.color}>
                                                        {l(project.name)}
                                                    </Badge>
                                                )}
                                                <PriorityBadge priority={task.priority} />
                                            </div>
                                            <p className="text-sm font-medium text-primary">{l(task.title)}</p>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex min-w-0 items-center gap-2">
                                                    {assignee && <Avatar size="xs" initials={getInitials(assignee.name.en)} />}
                                                    <span className="flex items-center gap-1 text-xs text-tertiary">
                                                        <Calendar className="size-3.5" aria-hidden="true" />
                                                        {formatDate(task.dueAt, { day: "numeric", month: "short" })}
                                                    </span>
                                                </div>
                                                {nextStatus[task.status] && (
                                                    <Button
                                                        size="xs"
                                                        color="tertiary"
                                                        iconLeading={ArrowRight}
                                                        aria-label={t("tasks.moveNext")}
                                                        onPress={() => moveNext(task)}
                                                    />
                                                )}
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </section>

            <FormModal
                isOpen={isNewOpen}
                onOpenChange={setIsNewOpen}
                title={t("tasks.form.title")}
                description={t("tasks.form.subtitle")}
                icon={ClipboardCheck}
                onSubmit={createTask}
            >
                <Input isRequired label={t("tasks.form.name")} value={form.title} onChange={(title) => setForm({ ...form, title })} />
                <Select
                    label={t("tasks.form.project")}
                    items={projects.map((project) => ({ id: project.id, label: l(project.name) }))}
                    selectedKey={form.projectId}
                    onSelectionChange={(key) => key && setForm({ ...form, projectId: String(key) })}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <Select
                    label={t("tasks.form.assignee")}
                    items={employees.map((employee) => ({ id: employee.id, label: l(employee.name) }))}
                    selectedKey={form.assigneeId}
                    onSelectionChange={(key) => key && setForm({ ...form, assigneeId: String(key) })}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                        label={t("tasks.form.priority")}
                        items={taskPriorities.map((id) => ({ id, label: t(`tasks.priority.${id}`) }))}
                        selectedKey={form.priority}
                        onSelectionChange={(key) => key && setForm({ ...form, priority: key as TaskPriority })}
                    >
                        {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                    </Select>
                    <Input type="date" label={t("tasks.due")} value={form.dueAt} onChange={(dueAt) => setForm({ ...form, dueAt })} />
                </div>
            </FormModal>
        </>
    );
}
